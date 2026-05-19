#!/usr/bin/env python3
"""Generate commits.js, runs.js, paper-edits.js, annotations.js with realistic
mech-interp-flavoured content. Anchor entries (the ones referenced from
trajectory.js by id) are hand-coded; the bulk is templated from a small
language bank so every row reads like a plausible specific event.

Run from mock-site/ root: python3 scripts/gen_content.py
"""
from __future__ import annotations

import json
import random
from datetime import datetime, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "content"
OUT.mkdir(parents=True, exist_ok=True)

# --- timeline anchors ---
START = datetime(2026, 2, 14, 9, 30)
END = datetime(2026, 5, 8, 18, 0)
WEEKS = 12

# Helper to format dates
def fmt(d): return d.strftime("%Y-%m-%dT%H:%M")

# --- repo files (used by commit + paper-edit generators) ---
REPO_FILES_CODE = [
    "src/training/attn_only.py",
    "src/training/data_loader.py",
    "src/training/train.py",
    "src/probes/prefix_match.py",
    "src/probes/activation_patching.py",
    "src/probes/path_patching.py",
    "src/probes/head_ablation.py",
    "src/utils/wandb_setup.py",
    "src/utils/eval_data.py",
    "scripts/sweep_widths.py",
    "scripts/replicate.py",
    "scripts/plot_heatmaps.py",
    "scripts/gen_eval_batch.py",
    "scripts/inspect_checkpoint.py",
    "configs/base.yaml",
    "configs/sweep.yaml",
    "configs/replicate.yaml",
    "wandb_config.yaml",
    "Makefile",
    "tests/test_prefix_match.py",
    "tests/test_patching.py",
    "tests/test_data_loader.py",
    "notebooks/01-exploration.ipynb",
    "notebooks/02-checkpoint-analysis.ipynb",
    "notebooks/03-head-attention-viz.ipynb",
    "pyproject.toml",
    "requirements.txt",
    "README.md",
]

PAPER_FILES = [
    "paper/sections/intro.tex",
    "paper/sections/method.tex",
    "paper/sections/results.tex",
    "paper/sections/discussion.tex",
    "paper/sections/limitations.tex",
    "paper/sections/broader_impact.tex",
    "paper/refs.bib",
]

# --- commit message language bank ---
COMMIT_VERBS = {
    "wip": ["wip: prefix-match probe scaffold", "wip: hooks for attn_z cache", "wip: sweep orchestrator",
            "wip: refactor head iteration", "wip: head attention viz", "wip: paper figure regen"],
    "fix": ["fix off-by-one in head-ablation iteration", "fix shuffle bug in _make_corrupted",
            "fix prefetch_factor causing eval/train batch race", "fix wandb run_name collision",
            "fix matplotlib dpi reset on multipanel figs", "fix divide-by-zero in induction_score",
            "fix incorrect mask shape in attn_only forward", "fix typo in Theorem 1 statement",
            "fix logit_diff sign for distractor token", "fix flaky test_data_loader stride boundary"],
    "add": ["add per-head heatmap with text annotations", "add 5-panel width-sweep figure",
            "add replication script for held-out slice", "add Olsson-style prefix-match probe",
            "add activation-patching helpers (transformer_lens hooks)",
            "add path-patching helpers", "add zero-ablation per head",
            "add notebook 01-exploration", "add data-mix bar plot",
            "add Zipf log-log eval-data plot", "add runtime-comparison bar"],
    "refactor": ["refactor wandb init out of training loop into utils.wandb_setup",
                 "refactor probes/ to use shared HookedTransformer fixture",
                 "refactor configs/ to YAML inheritance",
                 "refactor plot_heatmaps to accept vmax",
                 "refactor eval_data: rng injected for reproducibility"],
    "tweak": ["tweak plot palette to match paper style",
              "tweak induction-score sigmoid midpoint to step 60_000",
              "tweak n_heads default in configs/base.yaml to 4",
              "tweak logit_diff to use last-token only (was mean)"],
    "docs": ["docs: README setup section", "docs: probes/README.md", "docs: explain Olsson score",
             "docs: training reproducibility (commit + seed + slice)",
             "docs: how to replay a captured trajectory"],
    "paper": ["paper: section 3 first draft", "paper: section 3 v2 (predict L2 saturation)",
              "paper: section 3 v3 — acknowledge L1 saturation",
              "paper: section 3 v4 — width sweep results",
              "paper: section 3 v5 — replication footnote",
              "paper: discussion v1", "paper: discussion v2 (capacity-pressure hypothesis)",
              "paper: abstract softening per self-review (collapse → effectively compress)",
              "paper: add citation Olsson 2022 in intro",
              "paper: tighten Section 3 first paragraph",
              "paper: limitations v1 (2L attention-only, no MLPs)",
              "paper: refs.bib add McDougall 2023 copy-suppression"],
    "cleanup": ["cleanup: drop unused imports in src/probes",
                "cleanup: dead code in inspect_checkpoint",
                "cleanup: pre-commit ruff sweep",
                "cleanup: rm scratch notebook 04-test"],
}

# Author bio
AUTHOR = "aneesh.muppidi"
EMAIL = "amuppidi@stanford.edu"

# --- helper for random SHA ---
def sha(rng): return "".join(rng.choice(list("0123456789abcdef")) for _ in range(8))


# --------------------------------------------------------------
# COMMITS
# --------------------------------------------------------------
def gen_commits():
    rng = random.Random(0xC0FFEE)

    # Pre-defined "anchor" commits referenced by trajectory.js
    anchors = [
        # Act I
        {"sha": "8f3a1c4e", "message": "wip: prefix-match probe scaffold + Makefile",
         "files": ["src/probes/prefix_match.py", "Makefile", "src/utils/eval_data.py"], "date": fmt(START)},
        {"sha": "c2d51bba", "message": "add Olsson-style prefix-match probe",
         "files": ["src/probes/prefix_match.py"], "date": fmt(START + timedelta(hours=4))},
        {"sha": "5b04e1c9", "message": "refactor: shared HookedTransformer fixture",
         "files": ["src/utils/wandb_setup.py"], "date": fmt(START + timedelta(days=1, hours=2))},
        {"sha": "a812ce7f", "message": "paper: intro skeleton + refs.bib",
         "files": ["paper/sections/intro.tex", "paper/refs.bib"], "date": fmt(START + timedelta(days=2))},
        {"sha": "7d3f1011", "message": "add eval-data generator (repeated-prefix sequences, k=128)",
         "files": ["src/utils/eval_data.py"], "date": fmt(START + timedelta(days=2, hours=6))},
        {"sha": "b0eea221", "message": "add data-mix bar plot for OpenWebText slice",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=4))},

        # Act II
        {"sha": "3a91e220", "message": "add per-head heatmap with text annotations",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=14))},
        {"sha": "f1c0e7d8", "message": "wip: prefix-match per-(layer, head) heatmap at convergence",
         "files": ["src/probes/prefix_match.py", "scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=15))},
        {"sha": "9c4a55fa", "message": "paper: section 3 v2 (predict L2 saturation — to be checked)",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=16))},
        {"sha": "ee21bb01", "message": "tweak induction-score sigmoid midpoint to step 60_000",
         "files": ["src/probes/prefix_match.py"], "date": fmt(START + timedelta(days=18))},

        # Act III
        {"sha": "1a2bc903", "message": "add activation-patching helpers (transformer_lens hooks)",
         "files": ["src/probes/activation_patching.py"], "date": fmt(START + timedelta(days=21))},
        {"sha": "f0e1d213", "message": "wip: path-patching helpers",
         "files": ["src/probes/path_patching.py"], "date": fmt(START + timedelta(days=22))},
        {"sha": "2c81bb50", "message": "fix shuffle bug in _make_corrupted (shuffle repeat region, not prefix)",
         "files": ["src/utils/eval_data.py"], "date": fmt(START + timedelta(days=24, hours=11))},
        {"sha": "4d33a1c2", "message": "add causal-effect bar plot (per-head, with error bars)",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=25))},
        {"sha": "7a90f4e2", "message": "paper: section 3 v3 — acknowledge L1 saturation, defer claim",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=26))},
        {"sha": "9b0cc121", "message": "docs: explain Olsson prefix-match score in probes/README.md",
         "files": ["src/probes/prefix_match.py"], "date": fmt(START + timedelta(days=29))},
        {"sha": "0f1188aa", "message": "refactor probes/ to use shared HookedTransformer fixture",
         "files": ["src/probes/prefix_match.py", "src/probes/activation_patching.py"], "date": fmt(START + timedelta(days=31))},

        # Act IV
        {"sha": "e8a31100", "message": "add scripts/sweep_widths.py (orchestrate 5x3 sweep)",
         "files": ["scripts/sweep_widths.py"], "date": fmt(START + timedelta(days=35))},
        {"sha": "12cc902b", "message": "refactor wandb init out of training loop into utils.wandb_setup",
         "files": ["src/utils/wandb_setup.py", "src/training/train.py"], "date": fmt(START + timedelta(days=36))},
        {"sha": "44bd1ef0", "message": "fix off-by-one in head-ablation iteration",
         "files": ["src/probes/head_ablation.py"], "date": fmt(START + timedelta(days=38, hours=15))},
        {"sha": "7902aabb", "message": "fix prefetch_factor=4 (closes the suspicious phase-spike race)",
         "files": ["configs/base.yaml"], "date": fmt(START + timedelta(days=40))},
        {"sha": "1c11d0a4", "message": "add 5-panel width-sweep figure",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=42))},
        {"sha": "ed002231", "message": "paper: section 3 v4 — width sweep results",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=44))},
        {"sha": "5b81f0c2", "message": "tweak plot palette to match paper style",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=45))},
        {"sha": "8d4f1102", "message": "add path-patching at d=256 (compare to activation-patching scatter)",
         "files": ["src/probes/path_patching.py"], "date": fmt(START + timedelta(days=46))},
        {"sha": "11b29ad1", "message": "paper: section 1 — update headline claim",
         "files": ["paper/sections/intro.tex"], "date": fmt(START + timedelta(days=48))},
        {"sha": "7e3399cc", "message": "add notebook 03-head-attention-viz",
         "files": ["notebooks/03-head-attention-viz.ipynb"], "date": fmt(START + timedelta(days=50))},
        {"sha": "11ee44aa", "message": "paper: section 4 — results body",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=52))},
        {"sha": "2bc0f110", "message": "cleanup: rm scratch notebook 04-test",
         "files": ["notebooks/04-test.ipynb"], "date": fmt(START + timedelta(days=54))},

        # Act V
        {"sha": "c0d1ef02", "message": "paper: discussion v1 (capacity-pressure hypothesis)",
         "files": ["paper/sections/discussion.tex"], "date": fmt(START + timedelta(days=63))},
        {"sha": "70f132aa", "message": "paper: abstract softening (collapse → effectively compress)",
         "files": ["paper/sections/intro.tex"], "date": fmt(START + timedelta(days=64))},
        {"sha": "ab8901cc", "message": "paper: tighten Section 3 first paragraph",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=65))},
        {"sha": "bb5512dd", "message": "paper: limitations v1 (2L attn-only, no MLPs)",
         "files": ["paper/sections/limitations.tex"], "date": fmt(START + timedelta(days=66))},
        {"sha": "ee44ff11", "message": "wip: paper figure regen",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=67))},
        {"sha": "0099aabb", "message": "paper: refs.bib add McDougall 2023 copy-suppression",
         "files": ["paper/refs.bib"], "date": fmt(START + timedelta(days=70))},

        # Act VI
        {"sha": "3344aabb", "message": "add replication script for held-out slice (seed=42, slice 2/8)",
         "files": ["scripts/replicate.py"], "date": fmt(START + timedelta(days=78))},
        {"sha": "1100ddee", "message": "paper: section 3 v5 — add replication footnote",
         "files": ["paper/sections/results.tex"], "date": fmt(START + timedelta(days=80))},
        {"sha": "7766bbcc", "message": "add replication-scatter plot",
         "files": ["scripts/plot_heatmaps.py"], "date": fmt(START + timedelta(days=81))},

        # Act VII
        {"sha": "aacc1199", "message": "wip: 6L attn-only training script (queued)",
         "files": ["src/training/attn_only.py"], "date": fmt(START + timedelta(days=82))},
        {"sha": "ddff8866", "message": "docs: how to replay a captured trajectory",
         "files": ["README.md"], "date": fmt(START + timedelta(days=83))},
    ]

    # Templated filler — fill to 88 total
    target = 88
    needed = target - len(anchors)
    fillers = []
    # Spread across the 11 weeks (1..82 days)
    for i in range(needed):
        day = rng.randint(0, 82)
        hour = rng.randint(9, 18)
        date = START + timedelta(days=day, hours=hour, minutes=rng.randint(0, 59))
        verb = rng.choices(["wip", "fix", "tweak", "docs", "cleanup", "add", "refactor"],
                           weights=[3, 2, 2, 1, 1, 2, 1])[0]
        msg = rng.choice(COMMIT_VERBS[verb])
        files = rng.sample(REPO_FILES_CODE, k=rng.randint(1, 3))
        fillers.append({"sha": sha(rng), "message": msg, "files": files, "date": fmt(date)})

    all_commits = anchors + fillers
    # Sort chronologically (newest first feels right for a feed)
    all_commits.sort(key=lambda c: c["date"], reverse=True)

    # Add +N/-M stats
    for c in all_commits:
        nfiles = len(c["files"])
        c["filesChanged"] = nfiles
        c["add"] = rng.randint(3, 80) * nfiles
        c["del"] = rng.randint(0, 30) * nfiles
        c["author"] = AUTHOR

    return all_commits


# --------------------------------------------------------------
# RUNS
# --------------------------------------------------------------
def gen_runs():
    rng = random.Random(0xBEEFCAFE)

    # Anchor runs referenced by trajectory.js
    anchors = [
        # Act I
        {"id": "f3a1-sanity-1", "name": "sanity-1", "configDelta": "width=128 (smoke test, steps=2000)",
         "finalLoss": 3.42, "finalInduction": 0.04, "status": "finished",
         "started": fmt(START + timedelta(hours=1)), "summary": {"step": 2000, "loss": 3.42}, "sparklines": []},
        {"id": "f3a1-sanity-2", "name": "sanity-2", "configDelta": "+ wandb logging hooks",
         "finalLoss": 3.39, "finalInduction": 0.04, "status": "finished",
         "started": fmt(START + timedelta(hours=2)), "summary": {"step": 2000, "loss": 3.39}, "sparklines": []},
        {"id": "f3a1-baseline-s0", "name": "baseline-s0", "configDelta": "+ steps=200_000",
         "finalLoss": 0.31, "finalInduction": 0.82, "status": "finished",
         "started": fmt(START + timedelta(days=4, hours=10)), "duration": "1h12m",
         "summary": {"step": 200_000, "loss": 0.31, "induction": 0.82, "best_layer": 1, "best_head": 1},
         "sparklines": [
             {"name": "loss", "values": [6.5, 5.1, 3.8, 2.4, 1.6, 1.0, 0.6, 0.42, 0.34, 0.31]},
             {"name": "induction", "values": [0.04, 0.04, 0.05, 0.07, 0.18, 0.45, 0.68, 0.78, 0.81, 0.82]},
         ],
         "artifacts": ["p-head-pm-converged", "p-attn-pattern-l1h1"]},
        {"id": "f3a1-baseline-s1", "name": "baseline-s1", "configDelta": "seed=1",
         "finalLoss": 0.33, "finalInduction": 0.79, "status": "finished",
         "started": fmt(START + timedelta(days=5, hours=8)), "duration": "1h09m",
         "summary": {"step": 200_000, "loss": 0.33, "induction": 0.79},
         "sparklines": [{"name": "loss", "values": [6.5, 5.0, 3.6, 2.2, 1.3, 0.9, 0.6, 0.42, 0.36, 0.33]}]},
        {"id": "f3a1-baseline-s2", "name": "baseline-s2", "configDelta": "seed=2",
         "finalLoss": 0.32, "finalInduction": 0.81, "status": "finished",
         "started": fmt(START + timedelta(days=5, hours=11)), "duration": "1h10m",
         "summary": {"step": 200_000, "loss": 0.32, "induction": 0.81}, "sparklines": []},
        {"id": "f3a1-pm-s0", "name": "pm-eval-s0", "configDelta": "+ probe.k=128",
         "finalLoss": None, "finalInduction": 0.82, "status": "finished",
         "started": fmt(START + timedelta(days=14)), "summary": {"L1H1": 0.82, "L1H2": 0.79, "L2H1": 0.30}},
        {"id": "f3a1-pm-s1", "name": "pm-eval-s1", "configDelta": "seed=1, probe.k=128",
         "finalLoss": None, "finalInduction": 0.79, "status": "finished",
         "started": fmt(START + timedelta(days=14, hours=2)), "summary": {"L1H1": 0.79, "L1H2": 0.76}},

        # Act III
        {"id": "c7e9-patch-clean", "name": "patch-clean", "configDelta": "+ probe.task=activation_patching, mode=clean",
         "finalLoss": None, "finalInduction": 0.71, "status": "finished",
         "started": fmt(START + timedelta(days=22)), "duration": "0h08m",
         "summary": {"recovery_L1H1": 0.71, "recovery_L1H2": 0.62, "recovery_L2H1": 0.04},
         "sparklines": [], "artifacts": ["p-causal-effect-bars"]},
        {"id": "c7e9-patch-corrupt", "name": "patch-corrupt", "configDelta": "mode=corrupted",
         "finalLoss": None, "finalInduction": None, "status": "finished",
         "started": fmt(START + timedelta(days=22, hours=1))},
        {"id": "c7e9-patch-misconfig", "name": "patch-misconfig", "configDelta": "(shuffle bug — all heads ≈ 0)",
         "finalLoss": None, "finalInduction": 0.02, "status": "finished",
         "started": fmt(START + timedelta(days=23))},
        {"id": "c7e9-patch-fixed", "name": "patch-fixed", "configDelta": "+ shuffle fix",
         "finalLoss": None, "finalInduction": 0.71, "status": "finished",
         "started": fmt(START + timedelta(days=24, hours=12))},
        {"id": "c7e9-recover-1", "name": "patch-recovery-grid", "configDelta": "per-(layer, head) recovery grid",
         "finalLoss": None, "finalInduction": 0.71, "status": "finished",
         "started": fmt(START + timedelta(days=25))},

        # Act IV (the sweep)
    ]
    # Sweep runs
    for w in [128, 256, 384, 512, 1024]:
        for s in [0, 1, 2]:
            final_loss = {128: 0.42, 256: 0.31, 384: 0.27, 512: 0.25, 1024: 0.24}[w] + rng.uniform(-0.01, 0.03)
            ind = {128: 0.84, 256: 0.82, 384: 0.61, 512: 0.78, 1024: 0.78}[w] + rng.uniform(-0.04, 0.03)
            run_id = f"sweep-w{w}-s{s}"
            anchors.append({
                "id": run_id, "name": run_id, "configDelta": f"width={w}, seed={s}",
                "finalLoss": round(final_loss, 3), "finalInduction": round(ind, 3),
                "status": "finished",
                "started": fmt(START + timedelta(days=37 + (w // 128) * 0.5, hours=2 + s * 3)),
                "duration": f"{30 + w // 32}m",
                "summary": {"step": 200_000, "loss": round(final_loss, 3), "induction": round(ind, 3),
                            "best_layer": 1 if w <= 256 else (1 if w == 384 else 1)},
                "sparklines": [{"name": "loss", "values": [
                    6.5, 5.0 - w/3000, 3.6, 2.2, 1.4, 0.9, 0.6, 0.42, round(final_loss + 0.04, 2), round(final_loss, 2)
                ]}],
                "artifacts": [f"p-loss-w{w}" if w in (128, 256, 1024) else "p-width-5panel",
                              "p-width-5panel"],
            })

    # Act IV extras
    anchors.append({"id": "sweep-w256-ablate", "name": "sweep-w256-ablate", "configDelta": "+ probe.zero_ablate_all_heads",
                    "finalLoss": None, "finalInduction": 0.04, "status": "crashed",
                    "started": fmt(START + timedelta(days=38, hours=14)),
                    "summary": {"crash": "IndexError in head_ablation.py:47"}})

    # Act V — paper figure regenerations
    for nm in ["paper-fig-regen-headline", "paper-fig-regen-crossover", "paper-fig-regen-bars"]:
        anchors.append({"id": nm, "name": nm, "configDelta": "+ paper-quality dpi=300",
                        "finalLoss": None, "finalInduction": None, "status": "finished",
                        "started": fmt(START + timedelta(days=63 + len(nm) % 4))})

    # Act VI
    anchors.append({"id": "replicate-w256-s42", "name": "replicate-w256-s42",
                    "configDelta": "width=256, seed=42, slice=2/8",
                    "finalLoss": 0.34, "finalInduction": 0.80, "status": "finished",
                    "started": fmt(START + timedelta(days=78, hours=10)), "duration": "1h11m",
                    "summary": {"step": 200_000, "loss": 0.34, "induction": 0.80, "best_layer": 1},
                    "sparklines": [{"name": "loss", "values": [6.5, 5.1, 3.5, 2.1, 1.4, 0.9, 0.6, 0.45, 0.37, 0.34]}],
                    "artifacts": ["p-replication-scatter"]})
    anchors.append({"id": "replicate-w256-s42-slice3", "name": "replicate-w256-s42-slice3",
                    "configDelta": "+ data_slice=3 (sanity)",
                    "finalLoss": 0.33, "finalInduction": 0.81, "status": "finished",
                    "started": fmt(START + timedelta(days=79, hours=8))})

    # Act VII — pending follow-ups
    anchors.append({"id": "next-6L-w128-s0-pending", "name": "6L-attn-only-w128-s0",
                    "configDelta": "n_layers=6, width=128, seed=0",
                    "finalLoss": None, "finalInduction": None, "status": "running",
                    "started": fmt(START + timedelta(days=82, hours=10))})
    anchors.append({"id": "next-6L-w256-s0-pending", "name": "6L-attn-only-w256-s0",
                    "configDelta": "n_layers=6, width=256, seed=0",
                    "finalLoss": None, "finalInduction": None, "status": "running",
                    "started": fmt(START + timedelta(days=82, hours=11))})

    # Templated filler — to reach 87
    target = 87
    needed = target - len(anchors)
    descriptors = ["probe-pm-eval", "head-ablate", "patch-clean", "patch-corrupt",
                   "lr-search", "wd-search", "init-scale", "warmup-len",
                   "data-mix-sanity", "checkpoint-spot", "eval-batch-size",
                   "attn-only-fwd-sanity", "training-resume", "fig-regen",
                   "olsson-replication", "logit-diff-debug", "sweep-w256-ablate-headh"]
    for i in range(needed):
        day = rng.randint(0, 82)
        hour = rng.randint(8, 19)
        date = START + timedelta(days=day, hours=hour, minutes=rng.randint(0, 59))
        d = rng.choice(descriptors)
        config_delta = rng.choice([
            f"width={rng.choice([128, 256, 384, 512, 1024])}, seed={rng.randint(0, 99)}",
            f"+ lr={rng.choice([1e-3, 5e-4, 3e-4, 1e-4])}",
            f"+ batch_size={rng.choice([16, 32, 64, 128])}",
            f"+ probe.k={rng.choice([32, 64, 128, 192])}",
            f"+ warmup_steps={rng.choice([1000, 2000, 4000, 8000])}",
            f"+ data_slice={rng.randint(1, 8)} of 8",
            "+ n_heads=8 (sanity)",
            "+ init_scale=0.02",
        ])
        status = rng.choices(["finished", "crashed", "killed", "running"], weights=[85, 6, 4, 5])[0]
        final_loss = None if status != "finished" else round(rng.uniform(0.24, 1.2), 3)
        induction = None if status != "finished" else round(rng.uniform(0.20, 0.86), 3)
        run = {"id": f"{sha(rng)[:4]}-{d}-{rng.randint(0,99)}",
               "name": f"{d}-{rng.randint(0,99)}",
               "configDelta": config_delta,
               "finalLoss": final_loss, "finalInduction": induction,
               "status": status,
               "started": fmt(date),
               "duration": f"{rng.randint(2, 92)}m"}
        anchors.append(run)

    return anchors


# --------------------------------------------------------------
# PAPER EDITS
# --------------------------------------------------------------
def gen_paper_edits():
    rng = random.Random(0xDEADBEEF)
    anchors = [
        # Act I
        {"id": "pe-001", "date": fmt(START + timedelta(days=1)), "file": "paper/sections/intro.tex",
         "summary": "create empty skeleton + title + author",
         "linesAdded": 18, "linesRemoved": 0},
        {"id": "pe-002", "date": fmt(START + timedelta(days=2)), "file": "paper/sections/method.tex",
         "summary": "method section first draft (Olsson prefix-match definition)",
         "linesAdded": 42, "linesRemoved": 0},
        {"id": "pe-003", "date": fmt(START + timedelta(days=4)), "file": "paper/refs.bib",
         "summary": "add core citations: Olsson 2022, Elhage 2021, Wang 2022",
         "linesAdded": 24, "linesRemoved": 0},

        # Act II
        {"id": "pe-004", "date": fmt(START + timedelta(days=15)), "file": "paper/sections/results.tex",
         "summary": "results scaffold + L2-saturation prediction",
         "linesAdded": 12, "linesRemoved": 2},
        {"id": "pe-005", "date": fmt(START + timedelta(days=16)), "file": "paper/sections/results.tex",
         "summary": "tighten Section 3 first paragraph",
         "linesAdded": 4, "linesRemoved": 6},
        {"id": "pe-006", "date": fmt(START + timedelta(days=17)), "file": "paper/sections/intro.tex",
         "summary": "add motivation paragraph: why 2L attention-only",
         "linesAdded": 8, "linesRemoved": 0},
        {"id": "pe-007", "date": fmt(START + timedelta(days=18)), "file": "paper/sections/method.tex",
         "summary": "fix typo in Definition 1 statement",
         "linesAdded": 1, "linesRemoved": 1},

        # Act III
        {"id": "pe-008", "date": fmt(START + timedelta(days=22)), "file": "paper/sections/method.tex",
         "summary": "method: add activation-patching subsection",
         "linesAdded": 18, "linesRemoved": 0},
        {"id": "pe-009", "date": fmt(START + timedelta(days=24)), "file": "paper/sections/method.tex",
         "summary": "method: clarify clean/corrupted prompt construction",
         "linesAdded": 6, "linesRemoved": 4},
        {"id": "pe-010", "date": fmt(START + timedelta(days=26)), "file": "paper/sections/results.tex",
         "summary": "results v3 — acknowledge L1 saturation, defer claim",
         "linesAdded": 14, "linesRemoved": 4},
        {"id": "pe-011", "date": fmt(START + timedelta(days=28)), "file": "paper/sections/discussion.tex",
         "summary": "discussion: stub (capacity-pressure hypothesis)",
         "linesAdded": 3, "linesRemoved": 0},

        # Act IV
        {"id": "pe-012", "date": fmt(START + timedelta(days=42)), "file": "paper/sections/results.tex",
         "summary": "results v4 — width sweep first numbers",
         "linesAdded": 24, "linesRemoved": 2},
        {"id": "pe-013", "date": fmt(START + timedelta(days=44)), "file": "paper/sections/results.tex",
         "summary": "results: add Figure 1 reference",
         "linesAdded": 2, "linesRemoved": 0},
        {"id": "pe-014", "date": fmt(START + timedelta(days=46)), "file": "paper/sections/intro.tex",
         "summary": "intro: update headline claim with width-sweep wording",
         "linesAdded": 6, "linesRemoved": 4},
        {"id": "pe-015", "date": fmt(START + timedelta(days=48)), "file": "paper/sections/discussion.tex",
         "summary": "discussion: width-dependent specialization paragraph",
         "linesAdded": 16, "linesRemoved": 0},
        {"id": "pe-016", "date": fmt(START + timedelta(days=49)), "file": "paper/sections/method.tex",
         "summary": "method: add width-sweep paragraph (5 widths, 3 seeds)",
         "linesAdded": 7, "linesRemoved": 0},
        {"id": "pe-017", "date": fmt(START + timedelta(days=51)), "file": "paper/sections/results.tex",
         "summary": "results: split into three subsections (pm / patching / sweep)",
         "linesAdded": 9, "linesRemoved": 5},
        {"id": "pe-018", "date": fmt(START + timedelta(days=53)), "file": "paper/refs.bib",
         "summary": "add Conmy 2023 ACDC + bibtex cleanup",
         "linesAdded": 9, "linesRemoved": 1},
        {"id": "pe-019", "date": fmt(START + timedelta(days=54)), "file": "paper/sections/results.tex",
         "summary": "fix off-by-one in head-ablation slice — also affects Table 1 numbers",
         "linesAdded": 2, "linesRemoved": 2},
        {"id": "pe-020", "date": fmt(START + timedelta(days=55)), "file": "paper/sections/limitations.tex",
         "summary": "limitations: stub (2L attn-only, no MLPs)",
         "linesAdded": 5, "linesRemoved": 0},

        # Act V
        {"id": "pe-021", "date": fmt(START + timedelta(days=63)), "file": "paper/sections/results.tex",
         "summary": "results v5 — width sweep body paragraphs",
         "linesAdded": 18, "linesRemoved": 6},
        {"id": "pe-022", "date": fmt(START + timedelta(days=63)), "file": "paper/sections/discussion.tex",
         "summary": "discussion v1 — capacity-pressure hypothesis",
         "linesAdded": 22, "linesRemoved": 1},
        {"id": "pe-023", "date": fmt(START + timedelta(days=64)), "file": "paper/sections/intro.tex",
         "summary": "abstract softening (collapse → effectively compress) per self-review",
         "linesAdded": 8, "linesRemoved": 4},
        {"id": "pe-024", "date": fmt(START + timedelta(days=65)), "file": "paper/sections/intro.tex",
         "summary": "tighten introductory paragraph",
         "linesAdded": 3, "linesRemoved": 6},
        {"id": "pe-025", "date": fmt(START + timedelta(days=66)), "file": "paper/sections/limitations.tex",
         "summary": "limitations v1 — fully written",
         "linesAdded": 14, "linesRemoved": 1},
        {"id": "pe-026", "date": fmt(START + timedelta(days=67)), "file": "paper/sections/broader_impact.tex",
         "summary": "broader impact stub",
         "linesAdded": 8, "linesRemoved": 0},
        {"id": "pe-027", "date": fmt(START + timedelta(days=68)), "file": "paper/sections/discussion.tex",
         "summary": "discussion: add forward-look (6L next)",
         "linesAdded": 6, "linesRemoved": 0},
        {"id": "pe-028", "date": fmt(START + timedelta(days=70)), "file": "paper/refs.bib",
         "summary": "add McDougall 2023 copy-suppression",
         "linesAdded": 6, "linesRemoved": 0},
        {"id": "pe-029", "date": fmt(START + timedelta(days=71)), "file": "paper/sections/results.tex",
         "summary": "results: re-render headline figure at paper-quality dpi=300",
         "linesAdded": 2, "linesRemoved": 2},

        # Act VI
        {"id": "pe-030", "date": fmt(START + timedelta(days=80)), "file": "paper/sections/results.tex",
         "summary": "results: add replication footnote (seed=42, slice 2/8)",
         "linesAdded": 4, "linesRemoved": 0},
        {"id": "pe-031", "date": fmt(START + timedelta(days=81)), "file": "paper/sections/results.tex",
         "summary": "results: Figure 5 (replication scatter)",
         "linesAdded": 6, "linesRemoved": 0},

        # Act VII
        {"id": "pe-032", "date": fmt(START + timedelta(days=83)), "file": "paper/sections/discussion.tex",
         "summary": "discussion: 6L next-steps paragraph",
         "linesAdded": 12, "linesRemoved": 1},
    ]

    # Filler — 52 - 32 = 20 small edits
    target = 52
    needed = target - len(anchors)
    one_liners = [
        "fix typo (occurence → occurrence)",
        "add citation Olsson 2022 in Section 1",
        "rewrap line that broke arXiv compile",
        "add comma in Theorem 1 statement",
        "consistent notation: d_model vs width",
        "remove dangling reference \\ref{fig:foo}",
        "renumber Section 4 subsections",
        "fix \\paragraph capitalization",
        "tighten one sentence",
        "drop redundant '%' comment",
        "split long paragraph",
        "footnote: thanks reviewers",
        "fix bib entry capitalization (Transformer → Transformer)",
        "add \\label{eq:prefix-match}",
        "rephrase awkward 'collapses' (already done in v4)",
    ]
    for i in range(needed):
        day = rng.randint(15, 82)
        date = START + timedelta(days=day, hours=rng.randint(9, 19), minutes=rng.randint(0, 59))
        file = rng.choice(PAPER_FILES)
        anchors.append({
            "id": f"pe-fill-{i+1:03d}",
            "date": fmt(date),
            "file": file,
            "summary": rng.choice(one_liners),
            "linesAdded": rng.randint(1, 6),
            "linesRemoved": rng.randint(0, 5),
        })

    anchors.sort(key=lambda e: e["date"], reverse=True)
    return anchors


# --------------------------------------------------------------
# ANNOTATIONS
# --------------------------------------------------------------
def gen_annotations():
    rng = random.Random(0xFADE0FF)
    # 10 gutter-anchored + 100 log-only ≈ 110
    anchors = [
        {"id": "ann-001", "kind": "hypothesis", "anchorId": "α", "gutter": True,
         "body": "Induction circuit lives in layer 2; layer 1 is just the previous-token feeder. (Olsson et al. 2022 canonical position.)",
         "refSha": "8f3a1c4e7d3f1011", "ts": fmt(START + timedelta(days=1))},

        {"id": "ann-002", "kind": "rejected", "anchorId": "β", "gutter": True,
         "body": "Layer-2 hypothesis is wrong at this scale. Prefix-match saturates on <b>layer 1</b>, not 2. Two competing explanations: (a) compression at $d=256$, (b) prefix-match is a copy-suppression proxy.",
         "refSha": "ee21bb01f1c0e7d8", "ts": fmt(START + timedelta(days=18))},

        {"id": "ann-003", "kind": "decision", "anchorId": "γ", "gutter": True,
         "body": "Will not write Section 3 prose until we have a discriminating experiment (activation patching). Currently only the prediction is in the file, marked TODO.",
         "refSha": "9c4a55fa", "ts": fmt(START + timedelta(days=18))},

        {"id": "ann-004", "kind": "experiment", "anchorId": "δ", "gutter": True,
         "body": "Activation patching confirms: L1 heads 1,2 are causally necessary (recover 0.71 / 0.62 of logit-diff). L2 head 1 is <b>not</b> (0.04). Some 'induction-looking' L2 heads are decorative.",
         "refSha": "1a2bc903", "ts": fmt(START + timedelta(days=23))},

        {"id": "ann-005", "kind": "decision", "anchorId": "ε", "gutter": True,
         "body": "Need a width sweep to disentangle the two explanations. If L1 saturation is width-dependent, hypothesis (a) is right; if it persists at all widths, (b) is more likely.",
         "refSha": "1a2bc903", "ts": fmt(START + timedelta(days=24))},

        {"id": "ann-006", "kind": "paper-claim", "anchorId": "ζ", "gutter": True,
         "body": "Resolution: at $d \\le 256$, induction compresses into L1. At $d \\ge 512$, the canonical L0=prev-token, L1=induction split emerges. $d=384$ is the transition regime. This is the headline.",
         "refSha": "ed002231", "ts": fmt(START + timedelta(days=44))},

        {"id": "ann-007", "kind": "rejected", "anchorId": "η", "gutter": True,
         "body": "Original phrasing 'induction collapses into a single layer' overstates: 'collapses' implies dynamics. We have a static head-allocation observation. Softening to 'effectively compresses'.",
         "refSha": "70f132aa", "ts": fmt(START + timedelta(days=64))},

        {"id": "ann-008", "kind": "paper-claim", "anchorId": "θ", "gutter": True,
         "body": "Final phrasing: 'effectively compresses into layer 1 at $d \\le 256$ in the sense that the best L1 head exceeds 0.79 while the best L2 head remains below 0.35.' Avoids dynamical claim.",
         "refSha": "70f132aa", "ts": fmt(START + timedelta(days=64))},

        {"id": "ann-009", "kind": "experiment", "anchorId": "ι", "gutter": True,
         "body": "Replication on held-out slice (OpenWebText slice 2 of 8, seed=42) lands within noise: L1H1=0.80 vs original 0.82; L1H2=0.78 vs 0.79. Effect is robust.",
         "refSha": "3344aabb", "ts": fmt(START + timedelta(days=78))},

        {"id": "ann-010", "kind": "followup", "anchorId": "κ", "gutter": True,
         "body": "Next: 6L attn-only at $d \\in \\{128, 256, 512\\}$. Prediction: canonical L0/L1 split holds at all widths once depth $\\ge 4$. Open: are decorative high-pm L2 heads doing copy-suppression?",
         "refSha": "aacc1199", "ts": fmt(START + timedelta(days=82))},
    ]

    # Log-only filler — kinds + credible mech-interp content
    kinds_pool = ["hypothesis", "rejected", "experiment", "paper-claim", "decision", "followup"]
    bodies_pool = {
        "hypothesis": [
            "Could the L1 saturation be eval-batch artifact? Test with three eval batches.",
            "If we ablate L1H1 alone, the model should lose ICL at the repeated-prefix eval.",
            "The L2H1 score might be carrying gradient through a residual stream short-cut.",
            "Bigger batch ⇒ smoother induction-score curve? Worth one run.",
            "Maybe the prev-token head is actually a 'shifted-induction' head at d=128.",
            "Compress vs. duplicate: if both L1H1 and L1H2 are doing induction, ablating either alone should be tolerated.",
            "What if the slope of the induction phase change predicts head specialization?",
        ],
        "rejected": [
            "Initial guess that the spike at step 12k was a phase transition — turned out to be data-loader race.",
            "Considered using mean attention entropy as a head-importance proxy — too noisy.",
            "Tried using gradient magnitudes as a poor man's attribution — non-discriminating.",
            "Briefly considered training on TinyStories instead of OWT — too narrow, would not generalize.",
            "Considered a per-head learnable gate — overkill, biased the optimization.",
            "Idea: just look at attention pattern in expectation — not a good test of induction-headedness.",
        ],
        "experiment": [
            "Ran the patching grid on width=128: same L1 dominance pattern, even sharper.",
            "Reran sweep-w384-s0 with a new seed (4) to check transition-regime seed variance: confirms.",
            "Ablation matrix: pairwise ablation of L1H1 and L1H2 ≈ catastrophic; either alone tolerable.",
            "Verified Olsson induction-score implementation matches transformer_lens reference.",
            "Lit-checked Wang et al. 2022 patching to ensure clean/corrupted prompt construction matches IOI.",
            "Ran a synthetic-token-mix sanity run: prefix-match score behaves as expected on uniformly random tokens.",
            "Step-resolved induction-score: head 1,2 of L1 cross 0.5 at step 60k; L2 heads never do.",
            "Quick ablation of attention-pattern entropy: monotonic with prefix-match score at d=256.",
        ],
        "paper-claim": [
            "Stake: at $d \\le 256$ the induction circuit is layer-1-concentrated; we will write this carefully.",
            "Stake: activation-patching is the disambiguating test, not prefix-match alone.",
            "Stake: width crossover happens between $d=384$ and $d=512$ in our setup.",
            "Stake: $d=384$ is a transition regime — both layers carry signal.",
            "Stake: replication on a different slice and seed lands within noise.",
            "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
            "Stake: McDougall 2023 copy-suppression is a candidate for what L2H1 is actually doing; deferred.",
            "Stake: prefix-match score alone is insufficient; report patching in any future work on tiny models.",
        ],
        "decision": [
            "Will not write the discussion paragraph until I've decided which framing — 'compression' or 'capacity-pressure'.",
            "Defer 6L follow-up to next sprint; current paper is about the 2L picture only.",
            "Will include one negative result in the limitations section (cf. L2H1 decorative behavior).",
            "Will not include the path-patching misconfig story in the paper — covered in this trajectory instead.",
            "Decided: stick with d=256 as the canonical narrow setting; mention 128 and 384 as bookends.",
            "Plot palette: blue line + red comparison; no neon. Match paper-template style.",
            "Use OpenWebText slice 1 of 8 for all training; slice 2 strictly for replication.",
            "Will not preregister; treat the abstract softening as the visible signal of self-review.",
        ],
        "followup": [
            "6L attention-only sweep at d ∈ {128, 256, 512}, seeds {0,1,2}.",
            "Are decorative L2 heads doing copy suppression? McDougall 2023 protocol.",
            "Patching at d=1024: does the L0/L1 split survive head-specific perturbations?",
            "Train at fixed compute (token-budget matched); does compression vs split track compute as well as width?",
            "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
            "Read Conmy 2023 (ACDC) more carefully; could be a cleaner circuit-discovery tool than path patching here.",
            "Cross-check with Pythia-160m baseline runs from the public release.",
            "Build a tiny benchmark of 'compression vs split' for tiny LMs and release alongside paper.",
        ],
    }
    target = 110
    needed = target - len(anchors)
    for i in range(needed):
        day = rng.randint(0, 82)
        date = START + timedelta(days=day, hours=rng.randint(9, 19), minutes=rng.randint(0, 59))
        kind = rng.choice(kinds_pool)
        body = rng.choice(bodies_pool[kind])
        anchors.append({
            "id": f"ann-log-{i+1:03d}",
            "kind": kind,
            "body": body,
            "refSha": "",
            "ts": fmt(date),
            "gutter": False,
        })

    anchors.sort(key=lambda a: a["ts"], reverse=True)
    return anchors


# --------------------------------------------------------------
# main: write all JS data files
# --------------------------------------------------------------
def write_js(name, varname, data):
    path = OUT / name
    with open(path, "w") as f:
        f.write(f"window.{varname} = ")
        json.dump(data, f, indent=2)
        f.write(";\n")
    print(f"[gen_content] wrote {name} · {len(data)} entries")


def main():
    write_js("commits.js", "COMMITS", gen_commits())
    write_js("runs.js", "RUNS", gen_runs())
    write_js("paper-edits.js", "PAPER_EDITS", gen_paper_edits())
    write_js("annotations.js", "ANNOTATIONS", gen_annotations())


if __name__ == "__main__":
    main()
