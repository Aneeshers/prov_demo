/* Provenance trajectory viewer — pure HTML/CSS/JS, no build step.
   Reads content from window.META, window.REPO, window.SESSIONS, window.COMMITS,
   window.RUNS, window.PLOTS, window.PAPER_EDITS, window.ANNOTATIONS, window.TRAJECTORY,
   and hydrates the mount points in index.html. */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ---------- utilities ----------

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  // Python/Bash/TeX-ish syntax highlighter (port of realtime-rl script.js, extended)
  const PY_KW = new Set([
    "from","import","as","def","class","return","for","in","if","else","elif","while",
    "with","try","except","finally","raise","pass","break","continue","True","False",
    "None","and","or","not","is","lambda","yield","global","nonlocal","async","await",
  ]);
  function highlightPython(code) {
    const tokenPattern = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|\s+|.)/g;
    return code.split("\n").map((line) => {
      const ci = line.indexOf("#");
      const body = ci >= 0 ? line.slice(0, ci) : line;
      const comment = ci >= 0 ? line.slice(ci) : "";
      const tokens = body.match(tokenPattern) || [];
      let html = "";
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (/^\s+$/.test(t)) html += t;
        else if (/^['"]/.test(t) && /['"]$/.test(t)) html += `<span class="code-string">${esc(t)}</span>`;
        else if (/^\d+(?:\.\d+)?$/.test(t)) html += `<span class="code-number">${t}</span>`;
        else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t) && PY_KW.has(t)) html += `<span class="code-keyword">${t}</span>`;
        else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t) && tokens[i + 1] === "(") html += `<span class="code-func">${t}</span>`;
        else html += esc(t);
      }
      if (comment) html += `<span class="code-comment">${esc(comment)}</span>`;
      return html || "&nbsp;";
    }).join("\n");
  }

  function highlightTex(code) {
    let html = esc(code);
    html = html.replace(/(\\[A-Za-z]+\*?)/g, '<span class="code-keyword">$1</span>');
    html = html.replace(/(%[^\n]*)/g, '<span class="code-comment">$1</span>');
    html = html.replace(/(\$[^$\n]+\$)/g, '<span class="code-string">$1</span>');
    return html;
  }

  function highlightBash(code) {
    let html = esc(code);
    html = html.replace(/(^|\s)(--?[A-Za-z][A-Za-z0-9_-]*)/g, '$1<span class="code-keyword">$2</span>');
    html = html.replace(/^(\$|>>>)/gm, '<span class="prompt">$1</span>');
    return html;
  }

  function highlight(code, lang) {
    if (lang === "python" || lang === "py") return highlightPython(code);
    if (lang === "tex" || lang === "latex") return highlightTex(code);
    if (lang === "bash" || lang === "sh") return highlightBash(code);
    return esc(code);
  }

  // Render a unified-diff string (after manual computation in content.js) OR
  // render given before/after arrays as a simple LCS-ish diff (we do a
  // line-by-line equality check; the content files contain real before/after
  // so the lines line up well enough for visual purposes).
  function diffLinesView(before, after) {
    const beforeLines = (before || "").split("\n");
    const afterLines = (after || "").split("\n");
    // Use a tiny Myers-ish algorithm to be readable on small diffs.
    const out = [];
    let i = 0, j = 0;
    while (i < beforeLines.length && j < afterLines.length) {
      if (beforeLines[i] === afterLines[j]) {
        out.push({ k: "ctx", text: beforeLines[i] });
        i++; j++;
      } else {
        // Look ahead a few lines to find a sync point
        const lookahead = 6;
        let synced = false;
        for (let d = 1; d <= lookahead; d++) {
          if (beforeLines[i + d] === afterLines[j]) {
            for (let r = 0; r < d; r++) out.push({ k: "del", text: beforeLines[i + r] });
            i += d;
            synced = true; break;
          }
          if (beforeLines[i] === afterLines[j + d]) {
            for (let a = 0; a < d; a++) out.push({ k: "add", text: afterLines[j + a] });
            j += d;
            synced = true; break;
          }
        }
        if (!synced) {
          out.push({ k: "del", text: beforeLines[i++] });
          out.push({ k: "add", text: afterLines[j++] });
        }
      }
    }
    while (i < beforeLines.length) out.push({ k: "del", text: beforeLines[i++] });
    while (j < afterLines.length) out.push({ k: "add", text: afterLines[j++] });
    return out;
  }

  function diffStats(lines) {
    let add = 0, del = 0;
    for (const l of lines) { if (l.k === "add") add++; else if (l.k === "del") del++; }
    return { add, del };
  }

  // ---------- block renderers ----------

  function renderHeader() {
    const m = window.META;
    const el = $("#trajectory-header");
    el.innerHTML = `
      <div class="eyebrow">Trajectory ${esc(m.trajectoryId || "")} · captured by Provenance</div>
      <h1>${esc(m.title)}</h1>
      <div class="byline">
        <strong>${esc(m.researcher.name)}</strong>
        — ${esc(m.researcher.lab)}, ${esc(m.researcher.institution)} (${esc(m.researcher.role)})
        · captured ${esc(m.dates)} <span class="status-pill">${esc(m.status)}</span>
      </div>
    `;
  }

  function renderNavBlurb() {
    const m = window.META;
    if (!m.navBlurb) return;
    $("#nav-blurb").innerHTML = `
      <h2>${esc(m.navBlurb.headline)}</h2>
      ${m.navBlurb.body}
    `;
  }

  function renderResearcherCard() {
    const r = window.META.researcher;
    if (!r) return;
    const rows = [
      ["Researcher", `<strong>${esc(r.name)}</strong> · ${esc(r.lab)}, ${esc(r.institution)} (${esc(r.role)})`],
      ["Advisor", esc(r.advisor || "")],
      ["Grant", esc(r.grant || "")],
      ["Subscriptions", esc(r.subscriptions || "")],
      ["Embargo", esc(r.embargo || "")],
      ["Trajectory", esc(window.META.trajectoryId || "")],
    ].filter(([_, v]) => v && v.length);
    $("#researcher-card").innerHTML = rows.map(([k, v]) => `
      <div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>
    `).join("");
  }

  function renderHero() {
    const m = window.META;
    const el = $("#hero-figure");
    if (!m.hero) return;
    el.innerHTML = `
      <img src="${esc(m.hero.src)}" alt="${esc(m.hero.alt)}" />
      <figcaption>${m.hero.caption}</figcaption>
    `;
    el.classList.add("filter-target", "is-plot");
  }

  function renderAbstract() {
    const m = window.META;
    $("#abstract-id").innerHTML = m.abstract.map((p) => `<p>${p}</p>`).join("");
  }

  function renderStats() {
    const m = window.META;
    const cells = [
      ["agent turns", m.stats.agentTurns],
      ["wandb runs", m.stats.wandbRuns],
      ["commits", m.stats.commits],
      ["paper diffs", m.stats.paperDiffs],
      ["plots", m.stats.plots],
      ["annotations", m.stats.annotations],
      ["dead-ends", m.stats.deadEnds],
      ["weeks captured", m.stats.weeks],
    ];
    $("#stats-id").innerHTML = cells
      .map(([label, n]) => `<div class="stat-cell"><span class="stat-num">${n}</span><span class="stat-label">${label}</span></div>`)
      .join("");
  }

  function renderRepoTree() {
    const r = window.REPO;
    const body = $("#repo-tree-body");
    $("#repo-summary").textContent = `· ${r.files.length} files · ${r.totalLines.toLocaleString()} lines`;
    body.innerHTML = r.files.map((f) => {
      const hasContent = !!r.fileContents[f.path];
      const indent = "  ".repeat(f.depth || 0);
      return `<div class="repo-row${hasContent ? " has-content" : ""}" data-path="${esc(f.path)}">
        <span class="name"><span style="color: var(--muted)">${indent}</span>${esc(f.name)}</span>
        <span class="lines">${f.lines ? f.lines + " lines" : ""}</span>
      </div>`;
    }).join("");
    body.addEventListener("click", (e) => {
      const row = e.target.closest(".repo-row");
      if (!row) return;
      const path = row.dataset.path;
      const content = r.fileContents[path];
      if (!content) return;
      const existing = row.nextElementSibling;
      if (existing && existing.classList.contains("repo-file-content")) {
        existing.remove();
        return;
      }
      const pre = document.createElement("pre");
      pre.className = "repo-file-content";
      const ext = path.split(".").pop();
      const lang = ext === "py" ? "python" : ext === "tex" ? "tex" : ext === "sh" ? "bash" : null;
      pre.innerHTML = lang ? highlight(content, lang) : esc(content);
      row.after(pre);
    });
  }

  function renderProvGraph() {
    const m = window.META;
    if (!m.provenanceGraphSvg) return;
    $("#prov-graph").innerHTML = `
      ${m.provenanceGraphSvg}
      <div class="caption">${esc(m.provenanceGraphCaption || "")}</div>
    `;
  }

  function renderReadingTrail() {
    const m = window.META;
    $("#reading-trail").innerHTML = (m.readingTrail || []).map((c) =>
      `<div class="reading-card">
        <div class="cite">${esc(c.cite)}</div>
        <div class="title">${esc(c.title)}</div>
        <div class="desc">${esc(c.desc)}</div>
      </div>`).join("");
  }

  // Block renderers — `type` selects which one
  const BLOCK = {
    prose: (b) => `<div class="prose">${b.paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>`,

    session: (b) => {
      const s = (window.SESSIONS || []).find((x) => x.id === b.sessionId);
      if (!s) return `<div class="session-wrap"><div class="session-head"><span class="sid">${esc(b.sessionId)}</span><span>session not found</span></div></div>`;
      return renderSession(s);
    },

    codeDiff: (b) => renderCodeDiff(b),

    codeExcerpt: (b) => {
      const lang = b.language || "python";
      return `<div class="code-excerpt filter-target is-code">
        <div class="code-header"><span class="file">${esc(b.file)}</span> <span style="color: var(--muted)">· ${b.lines || ""} lines · final state</span></div>
        <pre>${highlight(b.code, lang)}</pre>
      </div>`;
    },

    terminal: (b) => `<div class="terminal filter-target is-code">
      ${b.cwd ? `<div class="term-header">${esc(b.cwd)}</div>` : ""}
      <pre><span class="prompt">$</span> ${esc(b.command)}\n${b.stderr ? `<span class="stderr">${esc(b.output || "")}</span>` : `<span class="stdout">${esc(b.output || "")}</span>`}</pre>
    </div>`,

    wandbCard: (b) => {
      const r = (window.RUNS || []).find((x) => x.id === b.runId);
      if (!r) return "";
      return renderWandbCard(r);
    },

    plotArtifact: (b) => {
      const p = (window.PLOTS || []).find((x) => x.id === b.plotId);
      const src = p ? p.src : b.src;
      const caption = b.caption || (p && p.caption) || "";
      const alt = (p && p.alt) || caption;
      const provFrom = b.from ? `<span class="captured-marker">captured · ${esc(b.from)}</span>` : `<span class="captured-marker">captured by Provenance</span>`;
      return `<figure class="plot-artifact filter-target is-plot">
        <img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" />
        <figcaption>${caption} <br/>${provFrom}</figcaption>
      </figure>`;
    },

    paperDiff: (b) => renderPaperDiff(b),

    annotation: (b) => renderAnnotationInline(b),

    deadEndBanner: (b) => `<div class="dead-end-banner filter-target is-annotation">
      <div class="label">Dead end · ${esc(b.label || "")}</div>
      <div class="body">${b.body}</div>
    </div>`,

    traceback: (b) => `<div class="traceback-block filter-target is-code">${esc(b.text)}</div>`,

    callout: (b) => `<div class="callout ${b.tone || "blue"}">${b.body}</div>`,
  };

  function renderSession(s) {
    const turnsHtml = (s.turns || []).map((t) => renderTurn(t)).join("");
    return `<div class="session-wrap filter-target is-turn" id="session-${esc(s.id)}">
      <div class="session-head">
        <span><span class="sid">${esc(s.id)}</span> · ${esc(s.title || "")}</span>
        <span>${esc(s.started || "")} · ${s.turns ? s.turns.length : 0} turns · ${esc(s.duration || "")}</span>
      </div>
      <div class="session-body">${turnsHtml}</div>
    </div>`;
  }

  // Deterministic pseudo-cost+tokens for an anchor session turn, based on
  // the turn id. Real session uploads carry actual metrics; for the mock we
  // generate something plausible per turn so the texture matches reality.
  function turnEconomics(t) {
    if (t._cost) return { cost: t._cost, tokens: t._tokens };
    if (t.cost && t.tokens) return { cost: t.cost, tokens: t.tokens };
    const h = (t.id || "").split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
    const inT = 1800 + (h % 2400);
    const outT = 220 + ((h >> 4) % 480);
    const cachedT = Math.floor(inT * 0.35);
    const cost = (inT * 0.000015 + outT * 0.000075).toFixed(4);
    return {
      cost: "$" + cost,
      tokens: `${inT} in · ${outT} out · ${cachedT} cached`,
    };
  }

  function renderTurn(t) {
    const blocks = [];
    if (t.thinking) {
      const len = t.thinking.split(/\.\s+/).filter(Boolean).length;
      blocks.push(`<details class="thinking-block"><summary>thinking · ${len} sentence${len === 1 ? "" : "s"}</summary><div class="thinking-body">${esc(t.thinking)}</div></details>`);
    }
    if (t.text) blocks.push(`<p class="turn-text">${linkify(esc(t.text))}</p>`);
    if (t.toolCalls) {
      for (const tc of t.toolCalls) {
        blocks.push(`<div class="tool-call">
          <span class="fn">${esc(tc.name)}</span>
          <pre class="args">${esc(typeof tc.args === "string" ? tc.args : JSON.stringify(tc.args, null, 2))}</pre>
        </div>`);
      }
    }
    if (t.toolResults) {
      for (const tr of t.toolResults) {
        blocks.push(`<div class="tool-result${tr.short ? " short" : ""}">${esc(tr.text)}</div>`);
      }
    }
    const anchor = t.gutterAnchor ? `<sup class="gutter-anchor" data-anchor="${esc(t.gutterAnchor)}">[${esc(t.gutterAnchor)}]</sup>` : "";
    const econ = t.role === "assistant" ? turnEconomics(t) : null;
    return `<div class="turn-card role-${esc(t.role)} filter-target is-turn" id="turn-${esc(t.id)}">
      <div class="turn-meta">
        <span class="role">${esc(t.role)}</span>
        <span>${esc(t.ts || "")}</span>
        ${econ ? `<span class="cost">${esc(econ.cost)}</span><span class="tokens">${esc(econ.tokens)}</span>` : ""}
      </div>
      ${blocks.join("")}
      ${anchor}
    </div>`;
  }

  function linkify(text) {
    return text.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9; padding:0 4px;">$1</code>');
  }

  function renderCodeDiff(b) {
    const lines = b.lines || diffLinesView(b.before, b.after);
    const { add, del } = b.stats || diffStats(lines);
    const body = lines.map((l) => {
      const prefix = l.k === "add" ? "+" : l.k === "del" ? "-" : " ";
      const cls = l.k === "hunk" ? "hunk" : (l.k === "add" ? "add" : l.k === "del" ? "del" : "");
      return `<div class="diff-line ${cls}">${esc(prefix + " " + l.text)}</div>`;
    }).join("");
    return `<div class="code-diff filter-target is-code">
      <div class="diff-header">
        <span class="file">${esc(b.file)}</span>
        <span class="stats"><span class="add">+${add}</span> <span class="del">-${del}</span></span>
      </div>
      <div class="diff-body">${body}</div>
    </div>`;
  }

  function renderPaperDiff(b) {
    const lines = b.lines || diffLinesView(b.before, b.after);
    const { add, del } = b.stats || diffStats(lines);
    const body = lines.map((l) => {
      const prefix = l.k === "add" ? "+" : l.k === "del" ? "-" : " ";
      const cls = l.k === "hunk" ? "hunk" : (l.k === "add" ? "add" : l.k === "del" ? "del" : "");
      return `<div class="diff-line ${cls}">${esc(prefix + " " + l.text)}</div>`;
    }).join("");
    return `<div class="paper-diff filter-target is-paper">
      <div class="pd-head">
        <span class="file">${esc(b.file)}</span>
        <span class="stats"><span class="add">+${add}</span> <span class="del">-${del}</span> · ${esc(b.summary || "")}</span>
      </div>
      <div class="pd-body">${body}</div>
    </div>`;
  }

  function renderWandbCard(r) {
    const summary = r.summary || {};
    const summaryHtml = Object.entries(summary).map(([k, v]) =>
      `<span class="metric"><span class="k">${esc(k)}=</span><span class="v">${esc(v)}</span></span>`).join("");
    const sparks = (r.sparklines || []).map((sp) => sparklineSvg(sp.name, sp.values)).join("");
    const arts = (r.artifacts || []).map((a) => {
      const p = (window.PLOTS || []).find((x) => x.id === a) || { src: a };
      return `<img src="${esc(p.src)}" alt="${esc(p.caption || "")}" />`;
    }).join("");
    return `<div class="wandb-card filter-target is-run">
      <div class="wandb-head">
        <span class="run-id">${esc(r.id)}</span>
        <span>${esc(r.name)} · ${esc(r.started || "")}</span>
        <span class="status ${esc(r.status)}">${esc(r.status)}</span>
      </div>
      <div class="wandb-body">
        ${r.configDelta ? `<div class="config">config Δ: ${esc(r.configDelta)}</div>` : ""}
        ${summaryHtml ? `<div class="summary">${summaryHtml}</div>` : ""}
        ${sparks ? `<div class="wandb-sparklines">${sparks}</div>` : ""}
        ${arts ? `<div class="wandb-artifacts">${arts}</div>` : ""}
      </div>
    </div>`;
  }

  function sparklineSvg(name, ys) {
    const W = 120, H = 30;
    if (!ys || ys.length < 2) return "";
    const min = Math.min(...ys), max = Math.max(...ys);
    const span = max - min || 1;
    const stepX = W / (ys.length - 1);
    const pts = ys.map((y, i) => `${(i * stepX).toFixed(1)},${(H - ((y - min) / span) * (H - 4) - 2).toFixed(1)}`).join(" ");
    return `<div class="spark">
      <span class="label">${esc(name)} · ${ys[0].toFixed(2)} → ${ys[ys.length - 1].toFixed(2)}</span>
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="#1b6fe0" stroke-width="1.2" points="${pts}" />
      </svg>
    </div>`;
  }

  function renderAnnotationInline(b) {
    const ann = (window.ANNOTATIONS || []).find((a) => a.id === b.annotationId);
    if (!ann) return "";
    const klass = "kind-" + (ann.kind || "decision").replace(/[^a-z\-]/g, "");
    return `<div class="annotation-card filter-target is-annotation">
      <span class="kind ${klass}">${esc(ann.kind)}</span>
      <span class="body">${ann.body}</span>
      <div class="meta">${ann.refSha ? "ref " + esc(ann.refSha.slice(0, 8)) + " · " : ""}${esc(ann.ts || "")}</div>
    </div>`;
  }

  // ---------- act + TOC ----------

  function renderActs() {
    const T = window.TRAJECTORY;
    const toc = $("#toc-list");
    toc.innerHTML = T.acts.map((a) => `<li><a href="#${esc(a.id)}">${esc(a.eyebrow || "")} · ${esc(a.title)}</a></li>`).join("");
    const root = $("#acts");
    root.innerHTML = T.acts.map((a) => renderAct(a)).join("");
  }

  function renderAct(a) {
    const blocks = (a.blocks || []).map((b) => {
      const fn = BLOCK[b.type];
      if (!fn) return `<!-- unknown block type: ${esc(b.type)} -->`;
      return fn(b);
    }).join("");
    const footer = renderActFooter(a);
    return `<section class="act" id="${esc(a.id)}">
      <div class="act-eyebrow">${esc(a.eyebrow || "")}</div>
      <h2>${a.title}</h2>
      <p class="act-period">${esc(a.period || "")}</p>
      ${blocks}
      ${footer}
    </section>`;
  }

  function renderActFooter(a) {
    if (!a.footer) return "";
    const f = a.footer;
    const parts = [];
    if (f.sessions && f.sessions.length) {
      parts.push(`<details><summary><span>All sessions in this period</span><span>${f.sessions.length}</span></summary><div>${
        f.sessions.map((sid) => {
          const s = (window.SESSIONS || []).find((x) => x.id === sid);
          if (!s) return "";
          return `<div class="session-row"><div class="row-head">
            <span class="sid">${esc(s.id)}</span>
            <span class="title">${esc(s.title || "")}</span>
            <span class="meta">${esc(s.started || "")}</span>
            <span class="meta">${s.turns ? s.turns.length : (s.turnCount || 0)} turns</span>
          </div>${s.summary ? `<div class="summary">${s.summary}</div>` : ""}</div>`;
        }).join("")
      }</div></details>`);
    }
    if (f.commits && f.commits.length) {
      parts.push(`<details><summary><span>All commits in this period</span><span>${f.commits.length}</span></summary><div>${
        f.commits.map((sha) => commitRowHtml(sha)).join("")
      }</div></details>`);
    }
    if (f.runs && f.runs.length) {
      parts.push(`<details><summary><span>All runs in this period</span><span>${f.runs.length}</span></summary>${runsTableHtml(f.runs)}</details>`);
    }
    if (f.paperEdits && f.paperEdits.length) {
      parts.push(`<details><summary><span>All paper edits in this period</span><span>${f.paperEdits.length}</span></summary><div>${
        f.paperEdits.map((id) => paperEditRowHtml(id)).join("")
      }</div></details>`);
    }
    return `<div class="act-footer">${parts.join("")}</div>`;
  }

  function commitRowHtml(sha) {
    const c = (window.COMMITS || []).find((x) => x.sha === sha);
    if (!c) return "";
    return `<div class="commit-row filter-target is-code">
      <span class="sha">${esc(c.sha)}</span>
      <span class="msg">${esc(c.message)}</span>
      <span class="files">${esc(c.date)} · <span class="add">+${c.add}</span> <span class="del">-${c.del}</span> · ${c.filesChanged || 1}f</span>
    </div>`;
  }

  function paperEditRowHtml(id) {
    const e = (window.PAPER_EDITS || []).find((x) => x.id === id);
    if (!e) return "";
    return `<div class="pe-row filter-target is-paper">
      <span class="date">${esc(e.date)}</span>
      <span class="file"><span class="section">${esc(e.file)}</span><div class="summary">${esc(e.summary)}</div></span>
      <span class="lines"><span class="add">+${e.linesAdded}</span> <span class="del">-${e.linesRemoved}</span></span>
    </div>`;
  }

  function runsTableHtml(ids) {
    const rows = ids.map((id) => (window.RUNS || []).find((x) => x.id === id)).filter(Boolean);
    return `<table class="runs-table"><thead><tr>
      <th>run id</th><th>name</th><th>config Δ</th><th>final loss</th><th>induction</th><th>status</th><th>started</th>
    </tr></thead><tbody>${
      rows.map((r) => `<tr>
        <td class="run-id">${esc(r.id)}</td>
        <td>${esc(r.name)}</td>
        <td class="config">${esc(r.configDelta || "")}</td>
        <td class="num">${esc(r.finalLoss ?? "")}</td>
        <td class="num">${esc(r.finalInduction ?? "")}</td>
        <td><span class="status-mini ${esc(r.status)}">${esc(r.status)}</span></td>
        <td>${esc(r.started || "")}</td>
      </tr>`).join("")
    }</tbody></table>`;
  }

  // ---------- wide surfaces ----------

  function renderCommitFeed() {
    const commits = window.COMMITS || [];
    $("#commit-feed-count").textContent = `· ${commits.length} commits over ${window.META.stats.weeks} weeks`;
    let currentDay = "";
    const html = [];
    for (const c of commits) {
      const day = c.date.slice(0, 10);
      if (day !== currentDay) {
        html.push(`<div class="commit-day">${esc(day)}</div>`);
        currentDay = day;
      }
      html.push(`<div class="commit-row filter-target is-code">
        <span class="sha">${esc(c.sha)}</span>
        <span class="msg">${esc(c.message)}</span>
        <span class="files"><span class="add">+${c.add}</span> <span class="del">-${c.del}</span> · ${c.filesChanged || 1}f</span>
      </div>`);
    }
    $("#commit-feed").innerHTML = html.join("");
  }

  function renderSessionIndex() {
    const sessions = window.SESSIONS || [];
    $("#session-index-count").textContent = `· ${sessions.length} sessions`;
    $("#session-index").innerHTML = sessions.map((s) => `<div class="session-row filter-target is-turn">
      <div class="row-head">
        <span class="sid">${esc(s.id)}</span>
        <span class="title">${esc(s.title)}</span>
        <span class="meta">${esc(s.started || "")} · ${esc(s.duration || "")}</span>
        <span class="meta">${s.turns ? s.turns.length : (s.turnCount || 0)} turns · ${esc(s.tool || "claude")}</span>
      </div>
      ${s.summary ? `<div class="summary">${s.summary}</div>` : ""}
    </div>`).join("");
  }

  function renderRunsTable() {
    const runs = window.RUNS || [];
    $("#runs-count").textContent = `· ${runs.length} runs`;
    $("#runs-table-wrap").innerHTML = `<table class="runs-table"><thead><tr>
      <th>run id</th><th>name</th><th>config Δ</th><th>final loss</th><th>induction</th><th>status</th><th>started</th>
    </tr></thead><tbody>${
      runs.map((r) => `<tr class="filter-target is-run">
        <td class="run-id">${esc(r.id)}</td>
        <td>${esc(r.name)}</td>
        <td class="config">${esc(r.configDelta || "")}</td>
        <td class="num">${esc(r.finalLoss ?? "")}</td>
        <td class="num">${esc(r.finalInduction ?? "")}</td>
        <td><span class="status-mini ${esc(r.status)}">${esc(r.status)}</span></td>
        <td>${esc(r.started || "")}</td>
      </tr>`).join("")
    }</tbody></table>`;
  }

  function renderPaperEditTimeline() {
    const edits = window.PAPER_EDITS || [];
    $("#paper-edits-count").textContent = `· ${edits.length} edits`;
    let currentDay = "";
    const html = [];
    for (const e of edits) {
      const day = e.date.slice(0, 10);
      if (day !== currentDay) { html.push(`<div class="commit-day">${esc(day)}</div>`); currentDay = day; }
      html.push(`<div class="pe-row filter-target is-paper">
        <span class="date">${esc(e.date.slice(11) || "")}</span>
        <span class="file"><span class="section">${esc(e.file)}</span><div class="summary">${esc(e.summary)}</div></span>
        <span class="lines"><span class="add">+${e.linesAdded}</span> <span class="del">-${e.linesRemoved}</span></span>
      </div>`);
    }
    $("#paper-edit-timeline").innerHTML = html.join("");
  }

  function renderAnnotationLog() {
    const ann = window.ANNOTATIONS || [];
    $("#annotations-count").textContent = `· ${ann.length} annotations`;
    $("#annotation-log").innerHTML = ann.map((a) => {
      const klass = "kind-" + (a.kind || "decision").replace(/[^a-z\-]/g, "");
      return `<div class="annotation-card filter-target is-annotation">
        <span class="kind ${klass}">${esc(a.kind)}</span>
        <span class="body">${a.body}</span>
        <div class="meta">${a.refSha ? "ref " + esc(a.refSha.slice(0, 8)) + " · " : ""}${esc(a.ts || "")}</div>
      </div>`;
    }).join("");
  }

  function renderGutter() {
    const ann = (window.ANNOTATIONS || []).filter((a) => a.gutter);
    const gutter = $("#gutter");
    if (!gutter || !ann.length) return;
    gutter.innerHTML = ann.map((a) => {
      const klass = "kind-" + (a.kind || "decision").replace(/[^a-z\-]/g, "");
      return `<div class="gutter-note" data-anchor="${esc(a.anchorId || "")}">
        <div><span class="kind ${klass}">${esc(a.kind)}</span><span class="anchor">[${esc(a.anchorId || "")}]</span></div>
        <div>${a.body}</div>
      </div>`;
    }).join("");
  }

  function renderRepro() {
    const m = window.META;
    if (!m.reproducibility) return;
    const r = m.reproducibility;
    $("#repro").innerHTML = `
      <p>The trajectory is reproducible from the captured state. Researchers receive a single <code>.provenance</code> bundle including the git bundle, model + dataset hashes, and environment fingerprint.</p>
      <ul style="margin-top:8px; color: var(--muted); font-size: 0.86rem;">
        <li>commit · <code>${esc(r.commit)}</code></li>
        <li>baseline tree · <code>${esc(r.baselineTreeSha)}</code></li>
        <li>model hash · <code>${esc(r.modelHash)}</code></li>
        <li>dataset hash · <code>${esc(r.datasetHash)}</code></li>
        <li>env fingerprint · <code>${esc(r.envFingerprint)}</code></li>
      </ul>
    `;
  }

  function renderReflections() {
    const m = window.META;
    $("#reflections").innerHTML = m.reflections || "";
  }

  function renderFooter() {
    $("#site-footer").innerHTML = `
      <div>Provenance · one of 60 captured mech-interp trajectories (others embargoed)</div>
      <div>contact: <code>partnerships@provenance.research</code></div>
    `;
  }

  // ---------- filters ----------

  function setupFilters() {
    $$("#filter-chips .filter-chip").forEach((b) => {
      b.addEventListener("click", () => {
        $$("#filter-chips .filter-chip").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        const v = b.dataset.filter;
        document.body.className = v === "all" ? "" : "filter-only-" + v;
      });
    });
  }

  // ---------- TOC scrollspy ----------

  function setupScrollspy() {
    const acts = (window.TRAJECTORY?.acts || []).map((a) => $("#" + a.id)).filter(Boolean);
    const links = $$("#toc-list a");
    const setActive = () => {
      const y = window.scrollY + 120;
      let active = 0;
      for (let i = 0; i < acts.length; i++) {
        if (acts[i].offsetTop <= y) active = i;
      }
      links.forEach((l, i) => l.classList.toggle("active", i === active));
    };
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  // ---------- fade-in observer ----------

  function setupFadeIn() {
    const els = $$(".fade-in");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { rootMargin: "0px 0px -10% 0px" });
    els.forEach((e) => io.observe(e));
  }

  // ---------- stat assertion ----------

  function assertStats() {
    const stats = window.META.stats;
    const realTurns = (window.SESSIONS || []).reduce((acc, s) => acc + (s.turns ? s.turns.length : (s.turnCount || 0)), 0);
    const realCommits = (window.COMMITS || []).length;
    const realRuns = (window.RUNS || []).length;
    const realPaperDiffs = (window.PAPER_EDITS || []).length;
    const realPlots = (window.PLOTS || []).length;
    const realAnn = (window.ANNOTATIONS || []).length;

    const check = (name, claimed, real) => {
      if (claimed !== real) console.warn(`[stats] ${name}: claimed ${claimed} vs real ${real}`);
    };
    check("agentTurns", stats.agentTurns, realTurns);
    check("commits", stats.commits, realCommits);
    check("wandbRuns", stats.wandbRuns, realRuns);
    check("paperDiffs", stats.paperDiffs, realPaperDiffs);
    check("plots", stats.plots, realPlots);
    check("annotations", stats.annotations, realAnn);
  }

  // ---------- main ----------

  function main() {
    renderHeader();
    renderNavBlurb();
    renderResearcherCard();
    renderHero();
    renderAbstract();
    renderStats();
    renderRepoTree();
    renderProvGraph();
    renderReadingTrail();
    renderActs();
    renderCommitFeed();
    renderSessionIndex();
    renderRunsTable();
    renderPaperEditTimeline();
    renderAnnotationLog();
    renderGutter();
    renderRepro();
    renderReflections();
    renderFooter();
    setupFilters();
    setupScrollspy();
    setupFadeIn();
    assertStats();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
