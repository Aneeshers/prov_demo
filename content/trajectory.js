// The seven-act outline. Each act references content stored in the
// other content/*.js modules by id, so a single source of truth lives there.
window.TRAJECTORY = {
  acts: [
    {
      id: "act-i",
      eyebrow: "Act I",
      title: "Setup &amp; Hypothesis",
      period: "Weeks 0–1 · 2026-02-14 → 2026-02-27 · 4 sessions · 38h captured · 6 commits · 3 wandb runs · 3 paper edits",
      blocks: [
        { type: "prose", paragraphs: [
          "The textbook story for a 2-layer attention-only model trained on natural text is unambiguous: a previous-token head in layer 0, feeding an induction head in layer 1. Olsson et al. (2022) constructed this circuit by hand; Elhage et al. (2021) gave its Q/K composition derivation. The first two weeks were spent making sure we could replicate this baseline before doing anything novel.",
          "Most of the time went to repo plumbing: a clean training loop, a wandb-init helper, the Olsson prefix-match probe, and a reproducible eval data generator with repeated-prefix sequences at offset $k{=}128$. No surprises expected.",
        ]},
        { type: "session", sessionId: "s-002" },
        { type: "codeDiff", file: "src/probes/prefix_match.py", before: "",
          summary: "create",
          stats: { add: 78, del: 0 },
          // diff lines populated below
        },
        { type: "annotation", annotationId: "ann-001" },
        { type: "terminal", cwd: "~/induction-heads-2l", command: "python -m src.probes.prefix_match --layer all --width 256 --steps 200000",
          output: "[info] loaded checkpoint attn-only-2L-d256-h4-s0 @ step 200000\n[info] eval batch: 32 seqs x 256 tokens, repeat offset 128\n[result] per-(layer, head) prefix-match score (mean across batch):\n  L0  H0=0.041  H1=0.038  H2=0.045  H3=0.039\n  L1  H0=0.083  H1=0.819  H2=0.792  H3=0.071\n[info] wandb run f3a1-baseline-s0 finished in 0.7s",
        },
        { type: "wandbCard", runId: "f3a1-baseline-s0" },
        { type: "plotArtifact", plotId: "p-data-zipf" },
      ],
      footer: {
        sessions: ["s-001", "s-002", "s-003", "s-004"],
        commits: ["8f3a1c4e", "c2d51bba", "5b04e1c9", "a812ce7f", "7d3f1011", "b0eea221"],
        runs: ["f3a1-sanity-1", "f3a1-sanity-2", "f3a1-baseline-s0"],
        paperEdits: ["pe-001", "pe-002", "pe-003"],
      },
    },
    {
      id: "act-ii",
      eyebrow: "Act II",
      title: "First Result &mdash; the Surprise",
      period: "Week 2 · 2026-02-28 → 2026-03-06 · 4 sessions · 21h captured · 4 commits · 5 wandb runs · 4 paper edits",
      blocks: [
        { type: "prose", paragraphs: [
          "The baseline ran. We hit the wrong number. Layer-1 heads 1 and 2 saturated at prefix-match score $0.82$ and $0.79$; layer-2 heads sat near $0.30$. This is the opposite of the canonical position. Two explanations were live: (a) the 2L attention-only model genuinely compresses the induction circuit into a single layer, or (b) prefix-match score is not measuring what we think (e.g. a copy-suppression-adjacent signal, per McDougall et al. 2023).",
        ]},
        { type: "session", sessionId: "s-007" },
        { type: "plotArtifact", plotId: "p-head-pm-converged" },
        { type: "annotation", annotationId: "ann-002" },
        { type: "wandbCard", runId: "f3a1-baseline-s0" },
        { type: "wandbCard", runId: "f3a1-baseline-s1" },
        { type: "plotArtifact", plotId: "p-attn-pattern-l1h1" },
        { type: "codeDiff", file: "scripts/plot_heatmaps.py",
          summary: "v1 → v2: surface per-head scores in a grid",
          before:
            "import matplotlib.pyplot as plt\nimport numpy as np\n\ndef plot_head_scores(scores, out):\n    plt.figure(figsize=(6,4))\n    plt.imshow(scores)\n    plt.colorbar()\n    plt.savefig(out)\n",
          after:
            "import matplotlib.pyplot as plt\nimport numpy as np\n\ndef plot_head_scores(scores, out, vmax=1.0):\n    fig, ax = plt.subplots(figsize=(6,4))\n    im = ax.imshow(scores, vmin=0, vmax=vmax, cmap='Blues', aspect='auto')\n    ax.set_xlabel('head')\n    ax.set_ylabel('layer')\n    for (i,j), v in np.ndenumerate(scores):\n        ax.text(j, i, f'{v:.2f}', ha='center', va='center',\n                color='white' if v > 0.5 else 'black', fontsize=10)\n    fig.colorbar(im, ax=ax, label='prefix-match')\n    fig.tight_layout()\n    fig.savefig(out, dpi=144)\n    plt.close(fig)\n",
        },
        { type: "paperDiff",
          file: "paper/sections/results.tex",
          summary: "v1 → v2: write the L2 prediction (later rewritten in Act III)",
          before:
            "\\section{Results}\n\n% TODO: fill in once probes done.",
          after:
            "\\section{Results}\n\n\\subsection{Prefix-match scores}\nFollowing Olsson et al. (2022), we expect the canonical two-layer induction\ncircuit: a previous-token head in layer 0 feeding an induction head in\nlayer 1. We compute per-(layer, head) prefix-match score at offset $k=128$.\n% Predicted: layer-2 saturation. To be confirmed.\n",
        },
        { type: "annotation", annotationId: "ann-003" },
      ],
      footer: {
        sessions: ["s-005", "s-006", "s-007", "s-008"],
        commits: ["3a91e220", "f1c0e7d8", "9c4a55fa", "ee21bb01"],
        runs: ["f3a1-baseline-s0", "f3a1-baseline-s1", "f3a1-baseline-s2", "f3a1-pm-s0", "f3a1-pm-s1"],
        paperEdits: ["pe-004", "pe-005", "pe-006", "pe-007"],
      },
    },
    {
      id: "act-iii",
      eyebrow: "Act III",
      title: "Disambiguation · Activation Patching",
      period: "Weeks 3–5 · 2026-03-07 → 2026-03-27 · 7 sessions · 48h captured · 7 commits · 5 wandb runs · 4 paper edits · dead-end #1",
      blocks: [
        { type: "prose", paragraphs: [
          "We need a discriminating experiment. Prefix-match score is a behavioural proxy; what we really want is causal necessity per head. Activation patching, in the Wang et al. (2022) IOI sense: take a clean prompt (repeated-token sequence) and a corrupted prompt (shuffled at the repeat position), forward both, and replace the head's output on the corrupted run with its output on the clean run. The fraction of logit-difference recovered tells us if the head is doing the work.",
          "Three sessions. The middle one nearly burned a day: the first path-patching attempt produced near-zero causal effect across every head. After half an afternoon and a methodical sanity check, we caught a misconfigured corrupted prompt: shuffling was happening before the repeat marker, not at it, so “clean” and “corrupted” were almost identical.",
        ]},
        { type: "session", sessionId: "s-011" },
        { type: "codeDiff",
          file: "src/probes/activation_patching.py",
          summary: "create: clean/corrupted hooks + per-head logit-diff recovery",
          before: "",
          after:
            "from __future__ import annotations\nimport torch\nfrom transformer_lens import HookedTransformer\nfrom typing import Callable\n\n\ndef patch_attn_out(\n    model: HookedTransformer,\n    clean_tokens: torch.Tensor,\n    corrupted_tokens: torch.Tensor,\n    answer_token_idx: int,\n    distractor_token_idx: int,\n) -> torch.Tensor:\n    \"\"\"Per-head logit-diff recovered when patching attn-out at (layer, head).\n\n    Returns a [n_layers, n_heads] tensor of recovery fractions.\n    \"\"\"\n    n_layers, n_heads = model.cfg.n_layers, model.cfg.n_heads\n    recovered = torch.zeros(n_layers, n_heads, device=model.cfg.device)\n\n    # Cache the clean attention outputs once.\n    _, clean_cache = model.run_with_cache(\n        clean_tokens, names_filter=lambda n: n.endswith('attn.hook_z')\n    )\n\n    clean_logits = model(clean_tokens, return_type='logits')\n    corrupted_logits = model(corrupted_tokens, return_type='logits')\n\n    clean_diff = (clean_logits[:, -1, answer_token_idx] -\n                  clean_logits[:, -1, distractor_token_idx]).mean()\n    corrupted_diff = (corrupted_logits[:, -1, answer_token_idx] -\n                      corrupted_logits[:, -1, distractor_token_idx]).mean()\n\n    for layer in range(n_layers):\n        for head in range(n_heads):\n            def hook_fn(z, hook, h=head):\n                z[:, :, h] = clean_cache[f'blocks.{layer}.attn.hook_z'][:, :, h]\n                return z\n\n            patched = model.run_with_hooks(\n                corrupted_tokens,\n                fwd_hooks=[(f'blocks.{layer}.attn.hook_z', hook_fn)],\n                return_type='logits',\n            )\n            patched_diff = (patched[:, -1, answer_token_idx] -\n                            patched[:, -1, distractor_token_idx]).mean()\n            recovered[layer, head] = (patched_diff - corrupted_diff) / (clean_diff - corrupted_diff)\n\n    return recovered\n",
        },
        { type: "session", sessionId: "s-013" },
        { type: "deadEndBanner", label: "path-patching misconfig",
          body: "Corrupted prompts were shuffled before the repeat marker, not at it; clean and corrupted were almost identical. Caught during a sanity check. ~3h of GPU wasted, ~30min of confusion." },
        { type: "traceback",
          text:
`>>> ((clean_tokens - corrupted_tokens) != 0).sum(dim=1)
tensor([2, 2, 1, 3, 2, 2, 1, 0, 2, 1, ...], device='cuda:0')
# Most prompts differ in 0–3 tokens. Should be ~64.
# bug in: src/utils/eval_data.py:_make_corrupted, line 41
#         np.random.shuffle(tokens[:offset])   <-- WRONG (shuffles prefix, not repeat region)`,
        },
        { type: "codeDiff", file: "src/utils/eval_data.py",
          summary: "fix corrupted-prompt construction (shuffle the repeat region, not the prefix)",
          before:
"def _make_corrupted(tokens, offset):\n    out = tokens.clone()\n    np.random.shuffle(out[:offset])   # shuffle the prefix\n    return out\n",
          after:
"def _make_corrupted(tokens, offset, rng):\n    out = tokens.clone()\n    # Shuffle ONLY the tokens that appear after the repeat marker, so the\n    # “prefix” remains the same and the model can no longer use induction.\n    indices = rng.permutation(np.arange(offset, len(out)))\n    out[offset:] = tokens[indices]\n    return out\n",
        },
        { type: "wandbCard", runId: "c7e9-patch-clean" },
        { type: "plotArtifact", plotId: "p-causal-effect-bars" },
        { type: "annotation", annotationId: "ann-004" },
        { type: "annotation", annotationId: "ann-005" },
        { type: "paperDiff",
          file: "paper/sections/results.tex",
          summary: "v2 → v3: acknowledge L1 saturation, defer claim",
          before:
"\\section{Results}\n\n\\subsection{Prefix-match scores}\nFollowing Olsson et al. (2022), we expect the canonical two-layer induction\ncircuit: a previous-token head in layer 0 feeding an induction head in\nlayer 1. We compute per-(layer, head) prefix-match score at offset $k=128$.\n% Predicted: layer-2 saturation. To be confirmed.\n",
          after:
"\\section{Results}\n\n\\subsection{Prefix-match scores}\nWe measure per-(layer, head) prefix-match score at offset $k=128$. Contrary\nto the canonical position, scores saturate on \\emph{layer 1} (heads 1 and 2,\nat $0.82$ and $0.79$ respectively) while layer-2 heads remain near $0.30$.\nThis is the opposite of the prediction. Two hypotheses are live: (a) the\n2-layer attention-only model compresses the induction circuit into a single\nlayer; (b) prefix-match score is partly capturing a copy-suppression signal.\nThe next subsection introduces the discriminating experiment.\n",
        },
      ],
      footer: {
        sessions: ["s-009", "s-010", "s-011", "s-012", "s-013", "s-014", "s-015"],
        commits: ["1a2bc903", "f0e1d213", "2c81bb50", "4d33a1c2", "7a90f4e2", "9b0cc121", "0f1188aa"],
        runs: ["c7e9-patch-clean", "c7e9-patch-corrupt", "c7e9-patch-misconfig", "c7e9-patch-fixed", "c7e9-recover-1"],
        paperEdits: ["pe-008", "pe-009", "pe-010", "pe-011"],
      },
    },
    {
      id: "act-iv",
      eyebrow: "Act IV",
      title: "Width Sweep · The Resolution",
      period: "Weeks 5–8 · 2026-03-28 → 2026-04-17 · 9 sessions · 84h captured · 12 commits · 14 wandb runs · 9 paper edits · dead-ends #2 and #3",
      blocks: [
        { type: "prose", paragraphs: [
          "Activation patching gave us a partial answer: some “induction-looking” L2 heads are not causally necessary. The next question is whether the L1-vs-L2 split is width-dependent. We run the same training recipe at five model widths $\\{128, 256, 384, 512, 1024\\}$ and three seeds each. Fifteen runs minimum, plus the patching repeats and one re-run after a slicing error.",
        ]},
        { type: "session", sessionId: "s-018" },
        { type: "codeDiff",
          file: "scripts/sweep_widths.py",
          summary: "create: width sweep orchestrator",
          before: "",
          after:
"import argparse, itertools, json, subprocess, sys\nfrom pathlib import Path\n\nWIDTHS = [128, 256, 384, 512, 1024]\nSEEDS = [0, 1, 2]\n\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument('--widths', type=int, nargs='+', default=WIDTHS)\n    parser.add_argument('--seeds', type=int, nargs='+', default=SEEDS)\n    parser.add_argument('--steps', type=int, default=200_000)\n    parser.add_argument('--dry-run', action='store_true')\n    args = parser.parse_args()\n\n    grid = list(itertools.product(args.widths, args.seeds))\n    print(f'[sweep] {len(grid)} runs queued', file=sys.stderr)\n    for width, seed in grid:\n        cmd = [\n            'python', '-m', 'src.training.train',\n            '--width', str(width),\n            '--seed', str(seed),\n            '--steps', str(args.steps),\n            '--run-name', f'sweep-w{width}-s{seed}',\n        ]\n        print(' '.join(cmd))\n        if not args.dry_run:\n            subprocess.run(cmd, check=True)\n\n\nif __name__ == '__main__':\n    main()\n",
        },
        { type: "codeDiff",
          file: "src/utils/wandb_setup.py",
          summary: "refactor: pull wandb init helper out of training loop (used by sweep_widths.py too)",
          before:
"# (no file)\n",
          after:
"import os, wandb\nfrom typing import Mapping\n\n\ndef init_wandb(run_name: str, config: Mapping, project: str = 'induction-heads', tags=None):\n    return wandb.init(\n        project=project,\n        name=run_name,\n        config=dict(config),\n        tags=list(tags or []),\n        mode=os.environ.get('WANDB_MODE', 'online'),\n        settings=wandb.Settings(start_method='thread'),\n    )\n",
        },
        { type: "session", sessionId: "s-022" },
        { type: "wandbCard", runId: "sweep-w128-s0" },
        { type: "wandbCard", runId: "sweep-w256-s0" },
        { type: "wandbCard", runId: "sweep-w1024-s0" },
        { type: "plotArtifact", plotId: "p-width-5panel" },
        { type: "plotArtifact", plotId: "p-width-crossover" },
        { type: "deadEndBanner", label: "off-by-one slicing error",
          body: "Head-ablation loop wrote into the wrong slice; the wide-model ablation runs all reported impossibly perfect logit recovery. Caught when the recovery was suspiciously consistent across heads. ~3h of GPU wasted." },
        { type: "traceback",
          text:
`File "src/probes/head_ablation.py", line 47, in zero_ablate_head
    z[..., head, :] = 0.0
IndexError: index out of range for axis 2 with size 4
# z shape: [batch, seq, n_heads, d_head]
# head index passed in: 4 (we have n_heads=4, so valid range is 0..3)
# bug: caller is iterating range(n_heads + 1) instead of range(n_heads).`,
        },
        { type: "codeDiff",
          file: "src/probes/head_ablation.py",
          summary: "fix: iterate range(n_heads), not range(n_heads+1)",
          before:
"def ablate_all_heads(model, tokens):\n    out = {}\n    for h in range(model.cfg.n_heads + 1):   # OFF BY ONE\n        out[h] = ablate_head(model, tokens, h)\n    return out\n",
          after:
"def ablate_all_heads(model, tokens):\n    out = {}\n    for h in range(model.cfg.n_heads):\n        out[h] = ablate_head(model, tokens, h)\n    return out\n",
        },
        { type: "deadEndBanner", label: "data-loader race → suspicious phase spike",
          body: "A loss spike at step 12k was at first read as a phase transition. Three hours of investigation revealed a data-loader race: the eval batch was being constructed concurrently with the training batch and occasionally collided. Fixed in one line in configs/base.yaml: prefetch_factor=4 instead of 0." },
        { type: "plotArtifact", plotId: "p-suspicious-spike-before" },
        { type: "annotation", annotationId: "ann-006" },
        { type: "paperDiff",
          file: "paper/sections/results.tex",
          summary: "v3 → v4: width sweep results, claim crystallizes",
          before:
"\\section{Results}\n\n\\subsection{Prefix-match scores}\nWe measure per-(layer, head) prefix-match score at offset $k=128$. Contrary\nto the canonical position, scores saturate on \\emph{layer 1} (heads 1 and 2,\nat $0.82$ and $0.79$ respectively) while layer-2 heads remain near $0.30$.\nThis is the opposite of the prediction. Two hypotheses are live: (a) the\n2-layer attention-only model compresses the induction circuit into a single\nlayer; (b) prefix-match score is partly capturing a copy-suppression signal.\nThe next subsection introduces the discriminating experiment.\n",
          after:
"\\section{Results}\n\n\\subsection{Prefix-match scores at $d{=}256$}\nWe measure per-(layer, head) prefix-match score at offset $k=128$. Contrary\nto the canonical position, scores saturate on \\emph{layer 1} (heads 1 and 2,\nat $0.82$ and $0.79$) while layer-2 heads remain near $0.30$.\n\n\\subsection{Activation patching}\nWith activation patching at attention output (Wang et al. 2022), the\nL1 heads 1 and 2 are causally necessary (recovering $0.71$ and $0.62$ of\nthe logit-difference respectively), and the high-prefix-match L2 head 1\nis \\emph{not} ($0.04 \\pm 0.03$).\n\n\\subsection{Width sweep}\nWe sweep widths $d \\in \\{128, 256, 384, 512, 1024\\}$ with three seeds each.\nAt $d \\le 256$, the induction circuit is concentrated in layer 1. At\n$d \\ge 512$, the canonical L0=previous-token, L1=induction split emerges.\n$d=384$ is the transition regime: both layers carry signal.\n",
        },
      ],
      footer: {
        sessions: ["s-016", "s-017", "s-018", "s-019", "s-020", "s-021", "s-022", "s-023", "s-024"],
        commits: ["e8a31100", "12cc902b", "44bd1ef0", "7902aabb", "1c11d0a4", "ed002231", "5b81f0c2", "8d4f1102", "11b29ad1", "7e3399cc", "11ee44aa", "2bc0f110"],
        runs: ["sweep-w128-s0", "sweep-w128-s1", "sweep-w128-s2", "sweep-w256-s0", "sweep-w256-s1", "sweep-w256-s2", "sweep-w384-s0", "sweep-w384-s1", "sweep-w512-s0", "sweep-w512-s1", "sweep-w1024-s0", "sweep-w1024-s1", "sweep-w1024-s2", "sweep-w256-ablate"],
        paperEdits: ["pe-012", "pe-013", "pe-014", "pe-015", "pe-016", "pe-017", "pe-018", "pe-019", "pe-020"],
      },
    },
    {
      id: "act-v",
      eyebrow: "Act V",
      title: "Writing It Up",
      period: "Weeks 8–10 · 2026-04-18 → 2026-05-01 · 5 sessions · 46h captured · 6 commits · 3 wandb runs · 9 paper edits · dead-end #4",
      blocks: [
        { type: "prose", paragraphs: [
          "Two paper-only sessions and the slow-motion grind of phrasing. The abstract was the part that took longest: I wrote “induction collapses into a single layer at narrow widths,” looked at it for a day, and decided it overstated. <em>Collapses</em> implies dynamics; what we have is a static observation about head allocation across widths. The softer phrasing — <em>effectively compresses</em> — survives self-review.",
        ]},
        { type: "session", sessionId: "s-027" },
        { type: "paperDiff",
          file: "paper/sections/results.tex",
          summary: "v4 → v5: body paragraphs for the width sweep",
          before:
"\\subsection{Width sweep}\nWe sweep widths $d \\in \\{128, 256, 384, 512, 1024\\}$ with three seeds each.\nAt $d \\le 256$, the induction circuit is concentrated in layer 1. At\n$d \\ge 512$, the canonical L0=previous-token, L1=induction split emerges.\n$d=384$ is the transition regime: both layers carry signal.\n",
          after:
"\\subsection{Width sweep}\nFigure~\\ref{fig:width-crossover} summarises the per-(layer, head)\nprefix-match score of the best head in each layer across widths\n$d \\in \\{128, 256, 384, 512, 1024\\}$, three seeds each. At $d \\le 256$,\nthe best-scoring head is in layer 1 in every seed; the layer-2 best-head\nscore is near chance ($< 0.35$). At $d \\ge 512$, the canonical\nL0=previous-token, L1=induction split emerges in 5/6 seeds. $d{=}384$ is\nthe transition regime: both layers carry signal, with substantial seed\nvariance. Activation patching (Section~3.3) at $d{=}256$ confirms that\nlayer-1 heads 1 and 2 are causally necessary; we have not yet performed\nthe analogous patching at $d{=}1024$ (deferred to future work).\n",
        },
        { type: "paperDiff",
          file: "paper/sections/discussion.tex",
          summary: "v1: first discussion draft",
          before:
"\\section{Discussion}\n\n% TODO\n",
          after:
"\\section{Discussion}\n\nThe canonical two-layer induction circuit description (Olsson et al. 2022,\nElhage et al. 2021) was derived in a regime where the model has \\emph{room}\nfor specialization: more heads than circuits to allocate to them. At\n$d{=}256$ with four heads per layer, this is no longer true. A natural\nhypothesis is that under capacity pressure, the previous-token computation\nfuses with the induction computation in a single layer, perhaps via a head\nwhose Q/K matrices encode both “attend to repeats” and “attend to the token\nafter the previous occurrence.” We have not isolated such a head\nbehaviourally; this remains an open question for future work.\n",
        },
        { type: "session", sessionId: "s-029" },
        { type: "deadEndBanner", label: "self-review of abstract overstatement",
          body: "I wrote “induction collapses” in the abstract. Re-read it the next morning and rejected my own phrasing: ‘collapses’ implies dynamics, what we have is a static head-allocation observation. Softened to ‘effectively compresses’. This is the kind of self-rejection that doesn't make it into the published paper but is exactly what Provenance preserves." },
        { type: "paperDiff",
          file: "paper/sections/intro.tex",
          summary: "abstract softening per self-review",
          before:
"In this work we show that the induction circuit \\emph{collapses} into\nlayer 1 in a 2-layer attention-only model with $d \\le 256$, and that the\ncanonical two-layer split (Olsson et al. 2022) emerges only at\n$d \\ge 512$.",
          after:
"In this work we show that the induction circuit \\emph{effectively\ncompresses} into layer 1 in a 2-layer attention-only model with $d \\le\n256$, in the sense that the prefix-match score of the best layer-1 head\nexceeds $0.79$ while the best layer-2 head remains below $0.35$. The\ncanonical two-layer split (Olsson et al. 2022) emerges in five of six\nseeds at $d \\ge 512$. We make no dynamical claim: this is a static\nobservation about head allocation as a function of width.",
        },
        { type: "annotation", annotationId: "ann-007" },
        { type: "annotation", annotationId: "ann-008" },
        { type: "plotArtifact", plotId: "p-headline-final" },
      ],
      footer: {
        sessions: ["s-025", "s-026", "s-027", "s-028", "s-029"],
        commits: ["c0d1ef02", "70f132aa", "ab8901cc", "bb5512dd", "ee44ff11", "0099aabb"],
        runs: ["paper-fig-regen-headline", "paper-fig-regen-crossover", "paper-fig-regen-bars"],
        paperEdits: ["pe-021", "pe-022", "pe-023", "pe-024", "pe-025", "pe-026", "pe-027", "pe-028", "pe-029"],
      },
    },
    {
      id: "act-vi",
      eyebrow: "Act VI",
      title: "Verification · Replication on Held-out Slice",
      period: "Week 10 · 2026-05-02 → 2026-05-08 · 2 sessions · 14h captured · 3 commits · 2 wandb runs · 2 paper edits",
      blocks: [
        { type: "prose", paragraphs: [
          "One session, one script, two runs. Replicate on a different seed and a different slice of OpenWebText (slice 2 of 8 instead of slice 1) at $d{=}256$. The effect should survive both shifts; if it doesn't, the headline claim is at risk.",
        ]},
        { type: "session", sessionId: "s-031" },
        { type: "codeDiff",
          file: "scripts/replicate.py",
          summary: "create: held-out replication script",
          before: "",
          after:
"import argparse, subprocess, sys\n\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument('--seed', type=int, default=42)\n    parser.add_argument('--data-slice', type=int, default=2,\n                        help='OpenWebText slice index (1..8)')\n    parser.add_argument('--width', type=int, default=256)\n    args = parser.parse_args()\n\n    cmd = [\n        'python', '-m', 'src.training.train',\n        '--width', str(args.width),\n        '--seed', str(args.seed),\n        '--data-slice', str(args.data_slice),\n        '--steps', '200000',\n        '--run-name', f'replicate-w{args.width}-s{args.seed}-slice{args.data_slice}',\n        '--tags', 'replication',\n    ]\n    print(' '.join(cmd), file=sys.stderr)\n    subprocess.run(cmd, check=True)\n\n\nif __name__ == '__main__':\n    main()\n",
        },
        { type: "wandbCard", runId: "replicate-w256-s42" },
        { type: "plotArtifact", plotId: "p-replication-scatter" },
        { type: "paperDiff",
          file: "paper/sections/results.tex",
          summary: "v5 → v6: add replication footnote",
          before:
"\\subsection{Width sweep}\nFigure~\\ref{fig:width-crossover} summarises the per-(layer, head)\nprefix-match score of the best head in each layer across widths\n$d \\in \\{128, 256, 384, 512, 1024\\}$, three seeds each. At $d \\le 256$,\nthe best-scoring head is in layer 1 in every seed.\n",
          after:
"\\subsection{Width sweep}\nFigure~\\ref{fig:width-crossover} summarises the per-(layer, head)\nprefix-match score of the best head in each layer across widths\n$d \\in \\{128, 256, 384, 512, 1024\\}$, three seeds each. At $d \\le 256$,\nthe best-scoring head is in layer 1 in every seed.\\footnote{We further\nreplicate the $d{=}256$ result on a held-out dataset slice (OpenWebText\nslice 2 of 8) and a fresh seed ($\\mathrm{seed}{=}42$); see Appendix~A.}\n",
        },
        { type: "annotation", annotationId: "ann-009" },
      ],
      footer: {
        sessions: ["s-030", "s-031"],
        commits: ["3344aabb", "1100ddee", "7766bbcc"],
        runs: ["replicate-w256-s42", "replicate-w256-s42-slice3"],
        paperEdits: ["pe-030", "pe-031"],
      },
    },
    {
      id: "act-vii",
      eyebrow: "Act VII",
      title: "What's Next",
      period: "Week 11 · 2026-05-08 · 1 session · 4h captured · 2 commits · 2 wandb runs queued · 1 paper edit",
      blocks: [
        { type: "prose", paragraphs: [
          "Three follow-up directions and one open question. We are going to scale to 6 layers and check whether the canonical split holds at depth; we want to test whether the decorative high-prefix-match L2 heads are doing copy-suppression (per McDougall et al. 2023); and we want to repeat the patching analysis at $d{=}1024$ where the L0/L1 split emerges. The open question is whether the same compression appears in MLPs (we have no MLPs in this model, by design).",
        ]},
        { type: "annotation", annotationId: "ann-010" },
        { type: "callout", tone: "blue",
          body: "<strong>Next runs queued.</strong> 6L attention-only on the same data, $d \\in \\{128, 256, 512\\}$, seeds {0, 1, 2}. Predicted: canonical L0/L1 split holds at all widths; no compression at depth $\\ge 4$." },
      ],
      footer: {
        sessions: ["s-032"],
        commits: ["aacc1199", "ddff8866"],
        runs: ["next-6L-w128-s0-pending", "next-6L-w256-s0-pending"],
        paperEdits: ["pe-032"],
      },
    },
  ],
};
