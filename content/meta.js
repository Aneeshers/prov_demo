window.META = {
  title: "Induction Heads, Compressed",
  subtitle: "A 2-layer attention-only model uses a single layer",
  trajectoryId: "PRV-2026-014",
  researcher: {
    name: "Aneesh Muppidi",
    lab: "Computer Science Department",
    institution: "Stanford University",
    role: "CS PhD",
    advisor: "anonymized per embargo",
    grant: "Provenance Tier 1 · $10,000 awarded 2026-01-08",
    subscriptions: "Claude Max · Codex Pro · Cursor Pro · wandb Team · Overleaf Pro",
    embargo: "Tier 1 · sellable post-publication · non-exclusive",
  },
  dates: "2026-02-14 → 2026-05-08",
  status: "embargoed · publication pending",
  navBlurb: {
    headline: "What this is, and how to read it",
    body: `
      <p>This page captures <strong>one</strong> mech-interp research project, end to end, as
      Provenance recorded it over <strong>11 weeks</strong>. Aneesh Muppidi (Stanford CS) investigated
      whether a 2-layer attention-only language model implements the canonical Olsson 2022 induction
      circuit. The textbook says yes; the data say: only at $d \\ge 512$. At narrow widths, the
      induction circuit is realized in layer 1 alone &mdash; a static head-allocation finding,
      captured here as 386 agent turns, 87 experiments, 88 commits, 52 paper edits, and
      <strong>four dead-ends preserved</strong>.</p>

      <p style="margin-top: 10px;"><strong>It can feel overwhelming.</strong> Here are three reading paths:</p>

      <table class="nav-paths">
        <tr><td class="t">30 sec</td>
            <td>Read the <a href="#abstract-id">abstract</a>, look at the hero plot, scan the
            <a href="#stats-id">stat strip</a>. You'll have the headline finding.</td></tr>
        <tr><td class="t">5 min</td>
            <td>Read the abstract, then walk the seven acts via the TOC on the left.
            Each act is one chapter of the investigation. Stop at any act that catches your eye.</td></tr>
        <tr><td class="t">30 min</td>
            <td>Read in this order: <a href="#act-ii">Act II</a> (the surprise),
            <a href="#act-iii">Act III</a> (the disambiguation, with the path-patching dead end),
            <a href="#act-iv">Act IV</a> (the width sweep, with two more dead ends),
            <a href="#act-v">Act V</a> (the abstract self-rejection). These are the moments
            that don't appear in the final paper but were central to the research.</td></tr>
      </table>

      <p style="margin-top: 10px;"><strong>Five moments worth reading regardless of budget:</strong></p>
      <ol class="nav-moments">
        <li><a href="#session-s-007">Act II · session s-007</a> &mdash; Aneesh sees L1 saturation instead of the expected L2 and flags the inversion.</li>
        <li><a href="#session-s-013">Act III · session s-013</a> &mdash; the 3-hour path-patching bug, caught by inspecting two tokens.</li>
        <li><a href="#session-s-022">Act IV · session s-022</a> &mdash; the width crossover emerges; paper claim crystallizes.</li>
        <li><a href="#session-s-029">Act V · session s-029</a> &mdash; the abstract self-rejects &ldquo;collapses&rdquo; &rarr; &ldquo;effectively compresses&rdquo; &rarr; &ldquo;is realized in&rdquo;.</li>
        <li><a href="#session-s-031">Act VI · session s-031</a> &mdash; the replication confirms.</li>
      </ol>

      <p style="margin-top: 10px;">The filter chips in the top bar (<em>turns / code / runs / plots / paper / notes</em>) let you hide everything except one artifact type &mdash; useful for &ldquo;show me every paper diff in order&rdquo; or &ldquo;show me every wandb run&rdquo;. The four wide surfaces at the bottom (commit feed, session index, all-runs table, paper-edit timeline) make the long tail navigable.</p>
    `,
  },
  hero: {
    src: "assets/figures/hero-heatmap-3ckpts.png",
    alt: "Per-(layer, head) prefix-match score heatmap at three checkpoints across training",
    caption: "Per-(layer, head) prefix-match score across training. Layer-1 heads saturate at 0.82 while the canonical “induction” layer-2 heads do not. This is the inversion that anchored the project.",
  },
  abstract: [
    "We replicate the induction-head finding of Olsson et al. (2022) at the smallest scale where it has been reported: a 2-layer attention-only model with $d{=}256$ and 4 heads per layer, trained on a 200M-token slice of OpenWebText. The textbook prediction is a previous-token head in layer 0 feeding an induction head in layer 1. The data say otherwise.",
    "Prefix-match score saturates on layer-1 heads, not layer-2. Activation-patching reveals that some “induction-looking” layer-2 heads are not causally necessary, and a width sweep $\\{128, 256, 384, 512, 1024\\}$ shows that the canonical 2-layer split only emerges at $d \\ge 512$. At narrow widths, the induction circuit <em>effectively compresses</em> into a single layer.",
    "This trajectory captures the full 11-week investigation as it actually happened, including four dead-ends, three paper rewrites, and the moment a draft claim was softened after self-review. Provenance preserves the search, not just the result.",
  ],
  stats: {
    agentTurns: 386,
    wandbRuns: 87,
    commits: 88,
    paperDiffs: 52,
    plots: 46,
    annotations: 110,
    deadEnds: 4,
    weeks: 11,
  },
  readingTrail: [
    { cite: "Olsson et al. 2022", title: "In-context Learning and Induction Heads",
      desc: "Identifies induction heads as the mechanism behind ICL in transformers; introduces prefix-match score." },
    { cite: "Elhage et al. 2021", title: "A Mathematical Framework for Transformer Circuits",
      desc: "The canonical “Q/K composition” two-layer induction circuit derivation." },
    { cite: "Wang et al. 2022", title: "Interpretability in the Wild: A Circuit for IOI in GPT-2 Small",
      desc: "Activation/path patching as a tool for causal-necessity claims; methodology reused here." },
    { cite: "McDougall et al. 2023", title: "Copy Suppression: Comprehensively Understanding an Attention Head",
      desc: "Decorative high-prefix-match heads may be implementing copy suppression rather than induction." },
    { cite: "Conmy et al. 2023", title: "Towards Automated Circuit Discovery",
      desc: "ACDC; used in Act III's path-patching comparison." },
  ],
  provenanceGraphSvg: `
    <svg viewBox="0 0 960 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Provenance graph for the seven-act trajectory">
      <style>
        .node { fill: #ffffff; stroke: #111111; stroke-width: 1.2; }
        .node-accent { fill: #eef5ff; stroke: #1b6fe0; stroke-width: 1.4; }
        .node-warn { fill: #fef3c7; stroke: #b45309; stroke-width: 1.2; }
        .node-deadend { fill: #fed7aa; stroke: #7c2d12; stroke-width: 1.2; }
        .node-text { font-family: ui-monospace, "Berkeley Mono", monospace; font-size: 11px; fill: #111111; }
        .node-eyebrow { font-family: ui-monospace, monospace; font-size: 8.5px; fill: #5a636d; letter-spacing: 0.06em; }
        .arrow { stroke: #5a636d; stroke-width: 1; fill: none; marker-end: url(#arr); }
        .arrow-strong { stroke: #1b6fe0; stroke-width: 1.4; fill: none; marker-end: url(#arr-blue); }
      </style>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5a636d" />
        </marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1b6fe0" />
        </marker>
      </defs>

      <!-- Act I — setup -->
      <g transform="translate(20, 20)">
        <rect class="node" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT I · WK 0-1</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">Setup &amp;</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">Hypothesis</text>
      </g>

      <!-- Act II — first result -->
      <g transform="translate(160, 20)">
        <rect class="node-accent" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT II · WK 2</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">L1 saturation</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">(unexpected)</text>
      </g>

      <!-- Act III — disambiguation -->
      <g transform="translate(300, 20)">
        <rect class="node-accent" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT III · WK 3-5</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">Activation</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">patching</text>
      </g>

      <!-- Act IV — width sweep -->
      <g transform="translate(440, 20)">
        <rect class="node-accent" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT IV · WK 5-8</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">Width sweep</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">+ crossover</text>
      </g>

      <!-- Act V — writing -->
      <g transform="translate(580, 20)">
        <rect class="node-warn" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT V · WK 8-10</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">3 paper</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">rewrites</text>
      </g>

      <!-- Act VI — verification -->
      <g transform="translate(720, 20)">
        <rect class="node" x="0" y="0" width="120" height="56" rx="2"/>
        <text class="node-eyebrow" x="60" y="14" text-anchor="middle">ACT VI · WK 10</text>
        <text class="node-text" x="60" y="32" text-anchor="middle">Replication</text>
        <text class="node-text" x="60" y="46" text-anchor="middle">(seed=42)</text>
      </g>

      <!-- Act VII — next -->
      <g transform="translate(860, 20)">
        <rect class="node" x="0" y="0" width="80" height="56" rx="2"/>
        <text class="node-eyebrow" x="40" y="14" text-anchor="middle">ACT VII</text>
        <text class="node-text" x="40" y="32" text-anchor="middle">6L</text>
        <text class="node-text" x="40" y="46" text-anchor="middle">follow-up</text>
      </g>

      <!-- Inter-act arrows (top row → top row) -->
      <line class="arrow-strong" x1="140" y1="48" x2="160" y2="48"/>
      <line class="arrow-strong" x1="280" y1="48" x2="300" y2="48"/>
      <line class="arrow-strong" x1="420" y1="48" x2="440" y2="48"/>
      <line class="arrow-strong" x1="560" y1="48" x2="580" y2="48"/>
      <line class="arrow-strong" x1="700" y1="48" x2="720" y2="48"/>
      <line class="arrow-strong" x1="840" y1="48" x2="860" y2="48"/>

      <!-- Artifact row -->
      <g transform="translate(20, 110)">
        <rect class="node" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">prefix_match.py</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">+ refs.bib</text>
      </g>
      <g transform="translate(160, 110)">
        <rect class="node" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">L1H1 = 0.82</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">heatmap · 3 seeds</text>
      </g>
      <g transform="translate(300, 110)">
        <rect class="node" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">recover 0.71/0.62</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">causal-effect bars</text>
      </g>
      <g transform="translate(440, 110)">
        <rect class="node" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">crossover @ d=384</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">5-panel + line</text>
      </g>
      <g transform="translate(580, 110)">
        <rect class="node-warn" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">results.tex v3→v6</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">intro abstract softened</text>
      </g>
      <g transform="translate(720, 110)">
        <rect class="node" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">slice 2/8, seed 42</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">scatter + footnote</text>
      </g>
      <g transform="translate(860, 110)">
        <rect class="node" x="0" y="0" width="80" height="40" rx="2"/>
        <text class="node-text" x="40" y="18" text-anchor="middle" style="font-size: 9.5px;">6L queue</text>
        <text class="node-eyebrow" x="40" y="32" text-anchor="middle">prediction</text>
      </g>

      <!-- Act-to-artifact arrows -->
      <line class="arrow" x1="80" y1="76" x2="80" y2="110"/>
      <line class="arrow" x1="220" y1="76" x2="220" y2="110"/>
      <line class="arrow" x1="360" y1="76" x2="360" y2="110"/>
      <line class="arrow" x1="500" y1="76" x2="500" y2="110"/>
      <line class="arrow" x1="640" y1="76" x2="640" y2="110"/>
      <line class="arrow" x1="780" y1="76" x2="780" y2="110"/>
      <line class="arrow" x1="900" y1="76" x2="900" y2="110"/>

      <!-- Dead-ends row (the things this trajectory preserves that a paper would hide) -->
      <g transform="translate(160, 180)">
        <rect class="node-deadend" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">L2 prediction</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">rejected · Act II</text>
      </g>
      <g transform="translate(300, 180)">
        <rect class="node-deadend" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">path-patch bug</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">3h debug · Act III</text>
      </g>
      <g transform="translate(440, 180)">
        <rect class="node-deadend" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">slicing error</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">+ DL race · Act IV</text>
      </g>
      <g transform="translate(580, 180)">
        <rect class="node-deadend" x="0" y="0" width="120" height="40" rx="2"/>
        <text class="node-text" x="60" y="18" text-anchor="middle" style="font-size: 10px;">'collapses' phrasing</text>
        <text class="node-eyebrow" x="60" y="32" text-anchor="middle">rejected · Act V</text>
      </g>

      <!-- Artifact-to-deadend arrows -->
      <line class="arrow" x1="220" y1="150" x2="220" y2="180"/>
      <line class="arrow" x1="360" y1="150" x2="360" y2="180"/>
      <line class="arrow" x1="500" y1="150" x2="500" y2="180"/>
      <line class="arrow" x1="640" y1="150" x2="640" y2="180"/>

      <!-- Legend -->
      <g transform="translate(20, 240)">
        <rect class="node-deadend" x="0" y="0" width="14" height="14"/>
        <text class="node-eyebrow" x="20" y="11">dead end · preserved by Provenance</text>
        <rect class="node-warn" x="220" y="0" width="14" height="14"/>
        <text class="node-eyebrow" x="240" y="11">paper rewrite</text>
        <rect class="node-accent" x="350" y="0" width="14" height="14"/>
        <text class="node-eyebrow" x="370" y="11">pivotal moment</text>
        <rect class="node" x="480" y="0" width="14" height="14"/>
        <text class="node-eyebrow" x="500" y="11">routine</text>
      </g>
    </svg>
  `,
  provenanceGraphCaption: "Each act anchors specific artifacts (middle row). The bottom row preserves the four dead-ends — what the paper would never show.",
  reproducibility: {
    commit: "8f3a1c4e",
    baselineTreeSha: "70fb98d0ef · captured at session start 2026-02-14T09:42-05:00",
    modelHash: "sha256:a2c1...e8d4 · attn-only-2L-d256-h4-s0 @ step 200000",
    datasetHash: "sha256:b9a4...12f0 · openwebtext-slice-1of8",
    envFingerprint: "py3.11.7 · torch 2.5.0+cu124 · transformer_lens 2.8.1 · wandb 0.18.3 · A100 40GB",
  },
  reflections: `
    "I came in expecting the canonical two-layer story and spent the first two weeks confused.
    What I'd warn a future researcher: when the prefix-match score points somewhere unexpected, do
    activation patching <em>before</em> you write the section. I didn't, and I wrote a paragraph
    that I had to delete a month later. Two things I didn't expect Provenance to do: catch the
    data-loader race condition the third time I hit it (a previous trace showed me the same
    failure mode in week 3 — I'd forgotten), and surface the moment I softened the abstract.
    Re-reading my own rejection of an over-stated claim was useful in a way I didn't expect."
    <br><br>
    <span style="color: var(--muted); font-style: normal;">— Aneesh Muppidi · Stanford CS · 2026-05-08</span>
  `,
};
