#!/usr/bin/env python3
"""Generate all 46 PNGs for the Provenance mock-site.

matplotlib only, deterministic seeds. Run from the mock-site root:
    python3 scripts/gen_plots.py
"""
from __future__ import annotations

import math
from pathlib import Path

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

OUT = Path(__file__).resolve().parent.parent / "assets" / "figures"
OUT.mkdir(parents=True, exist_ok=True)

# ---------- shared styling ----------
ACCENT = "#1b6fe0"
ACCENT_FILL = "#1b6fe0"
INK = "#111111"
MUTED = "#5a636d"
LINE = "#d9dee6"
ADD = "#15803d"
DEL = "#b91c1c"


def style(ax):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.tick_params(colors=MUTED, labelsize=8)
    for label in ax.get_xticklabels() + ax.get_yticklabels():
        label.set_color(MUTED)
    ax.title.set_color(INK)


def save(fig, name):
    path = OUT / name
    fig.savefig(path, dpi=144, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"[gen_plots] wrote {name}")


# ---------- 1. hero: 3-checkpoint heatmap ----------
def hero_heatmap():
    rng = np.random.default_rng(0)
    # Three checkpoints; layer-1 heads saturate, layer-2 don't.
    ckpts = [50_000, 100_000, 200_000]
    # rows = layers (0, 1), cols = heads (0..3)
    scores_at_ckpt = []
    for i, _ in enumerate(ckpts):
        prog = (i + 1) / len(ckpts)
        scores = np.array([
            [0.04, 0.04, 0.04, 0.04],                               # L0 stays near chance
            [0.08, 0.82 * prog, 0.79 * prog, 0.07],                  # L1 saturates on heads 1,2
        ]) + rng.normal(0, 0.012, (2, 4))
        scores_at_ckpt.append(np.clip(scores, 0, 1))

    fig, axes = plt.subplots(1, 3, figsize=(11, 3.0), constrained_layout=True)
    for ax, scores, step in zip(axes, scores_at_ckpt, ckpts):
        im = ax.imshow(scores, vmin=0, vmax=1.0, cmap="Blues", aspect="auto")
        ax.set_title(f"step {step:,}", fontsize=10)
        ax.set_xticks(range(4))
        ax.set_yticks(range(2))
        ax.set_yticklabels(["L0", "L1"])
        ax.set_xticklabels([f"H{i}" for i in range(4)])
        for (i, j), v in np.ndenumerate(scores):
            ax.text(j, i, f"{v:.2f}", ha="center", va="center",
                    color="white" if v > 0.5 else "#111", fontsize=9)
        style(ax)
    fig.suptitle("Per-(layer, head) prefix-match score across training · d=256, 4 heads",
                 fontsize=11, color=INK, y=1.04)
    cbar = fig.colorbar(im, ax=axes, orientation="horizontal",
                        fraction=0.04, pad=0.05, shrink=0.6, location="bottom")
    cbar.ax.tick_params(colors=MUTED, labelsize=8)
    save(fig, "hero-heatmap-3ckpts.png")


# ---------- 2. per-(layer, head) heatmap at convergence ----------
def head_pm_converged():
    rng = np.random.default_rng(1)
    scores = np.array([
        [0.041, 0.038, 0.045, 0.039],
        [0.083, 0.819, 0.792, 0.071],
    ]) + rng.normal(0, 0.006, (2, 4))
    fig, ax = plt.subplots(figsize=(5.8, 2.6))
    im = ax.imshow(scores, vmin=0, vmax=1, cmap="Blues", aspect="auto")
    ax.set_xticks(range(4)); ax.set_yticks(range(2))
    ax.set_xticklabels([f"H{i}" for i in range(4)])
    ax.set_yticklabels(["L0", "L1"])
    for (i, j), v in np.ndenumerate(scores):
        ax.text(j, i, f"{v:.2f}", ha="center", va="center",
                color="white" if v > 0.5 else "#111", fontsize=9)
    ax.set_title("Prefix-match score at step 200,000  ·  d=256, seed 0", fontsize=10)
    style(ax)
    fig.colorbar(im, ax=ax, label="score")
    save(fig, "p-head-pm-converged.png")


# ---------- 3. attention pattern visualization for L1H1 (induction-shaped) ----------
def attn_pattern_l1h1():
    rng = np.random.default_rng(2)
    n = 64
    # An induction-pattern attention: token t attends to t-offset+1.
    offset = 32
    A = rng.uniform(0, 0.02, (n, n))
    for t in range(offset, n):
        target = t - offset + 1
        if target >= 0:
            A[t, target] = 0.75 + rng.uniform(-0.04, 0.04)
    # Causal mask
    for i in range(n):
        A[i, i + 1:] = 0.0
    # Normalize rows
    A = A / np.maximum(A.sum(axis=1, keepdims=True), 1e-9)
    fig, ax = plt.subplots(figsize=(5.2, 4.6))
    im = ax.imshow(A, cmap="Blues", aspect="equal")
    ax.set_title("L1H1 attention pattern  ·  repeated-prefix eval, offset k=32", fontsize=10)
    ax.set_xlabel("key position"); ax.set_ylabel("query position")
    style(ax)
    fig.colorbar(im, ax=ax, label="attention weight")
    save(fig, "p-attn-pattern-l1h1.png")


# ---------- 4. causal-effect bars per head ----------
def causal_effect_bars():
    rng = np.random.default_rng(3)
    labels = [f"L0H{i}" for i in range(4)] + [f"L1H{i}" for i in range(4)]
    means = np.array([0.02, 0.01, 0.03, 0.02, 0.05, 0.71, 0.62, 0.04])
    err = np.array([0.02, 0.02, 0.02, 0.02, 0.03, 0.05, 0.06, 0.03])
    colors = [ACCENT if m > 0.2 else MUTED for m in means]
    fig, ax = plt.subplots(figsize=(7.6, 3.4))
    bars = ax.bar(labels, means, yerr=err, color=colors, edgecolor=INK, linewidth=0.6, capsize=3)
    ax.axhline(0, color=LINE, linewidth=0.8)
    ax.set_ylabel("logit-diff recovered  (clean = 1.0)")
    ax.set_title("Per-head causal effect via activation patching at attn-out", fontsize=10)
    style(ax)
    ax.legend(handles=[Patch(facecolor=ACCENT, label="causally necessary"),
                       Patch(facecolor=MUTED, label="decorative / no effect")],
              fontsize=8, frameon=False)
    save(fig, "p-causal-effect-bars.png")


# ---------- 5. 5-panel width sweep heatmaps ----------
def width_5panel():
    rng = np.random.default_rng(4)
    widths = [128, 256, 384, 512, 1024]
    fig, axes = plt.subplots(1, 5, figsize=(14, 2.8), constrained_layout=True)
    for ax, w in zip(axes, widths):
        # Narrow widths: L1 dominates. Wide widths: L0=prev-token, L1=induction split.
        if w <= 256:
            scores = np.array([
                [0.04, 0.04, 0.04, 0.04],
                [0.08, 0.82, 0.79, 0.07],
            ])
        elif w == 384:
            scores = np.array([
                [0.04, 0.42, 0.38, 0.05],
                [0.07, 0.61, 0.58, 0.06],
            ])
        else:  # 512, 1024
            scores = np.array([
                [0.04, 0.71, 0.05, 0.04],   # L0H1 = previous-token head
                [0.06, 0.05, 0.78, 0.07],   # L1H2 = induction head
            ])
        scores = np.clip(scores + rng.normal(0, 0.008, scores.shape), 0, 1)
        im = ax.imshow(scores, vmin=0, vmax=1, cmap="Blues", aspect="auto")
        ax.set_title(f"d={w}", fontsize=10)
        ax.set_xticks(range(4)); ax.set_yticks(range(2))
        ax.set_xticklabels([f"H{i}" for i in range(4)], fontsize=7)
        ax.set_yticklabels(["L0", "L1"], fontsize=7)
        for (i, j), v in np.ndenumerate(scores):
            ax.text(j, i, f"{v:.2f}", ha="center", va="center",
                    color="white" if v > 0.5 else "#111", fontsize=7)
        style(ax)
    fig.suptitle("Width sweep · prefix-match per (layer, head)", fontsize=11, color=INK, y=1.04)
    save(fig, "p-width-5panel.png")


# ---------- 6. width crossover line ----------
def width_crossover():
    widths = np.array([128, 256, 384, 512, 1024])
    # best L1 head score vs width
    best_L1 = np.array([0.84, 0.82, 0.61, 0.78, 0.78])
    # best L0 head score vs width
    best_L0 = np.array([0.05, 0.04, 0.42, 0.71, 0.72])
    fig, ax = plt.subplots(figsize=(6.6, 3.6))
    ax.plot(widths, best_L1, "-o", color=ACCENT, label="best L1 head", linewidth=1.8, markersize=5)
    ax.plot(widths, best_L0, "-o", color=DEL,     label="best L0 head", linewidth=1.8, markersize=5)
    ax.set_xscale("log")
    ax.set_xticks(widths)
    ax.set_xticklabels([str(w) for w in widths])
    ax.set_ylim(-0.02, 1.0)
    ax.set_xlabel("model width  d")
    ax.set_ylabel("prefix-match score of best head")
    ax.set_title("Layer crossover · narrow widths compress to L1; wide widths split L0/L1", fontsize=10)
    ax.axvspan(380, 390, alpha=0.06, color="orange", label="transition (d=384)")
    ax.legend(frameon=False, fontsize=9)
    style(ax)
    save(fig, "p-width-crossover.png")


# ---------- 7-9. three width-sweep loss curves ----------
def loss_curve(name, width, final_loss, induction_step, seed):
    rng = np.random.default_rng(seed + 100)
    N = 200
    steps = np.linspace(0, 200_000, N)
    base = 6.5 * np.exp(-3.4 * steps / steps.max()) + final_loss
    # induction bump
    bump = -0.18 * np.exp(-((steps - induction_step) ** 2) / (1.0e4 ** 2))
    loss = base + bump + rng.normal(0, 0.025, N)
    fig, ax = plt.subplots(figsize=(7.2, 3.2))
    ax.plot(steps, loss, color=ACCENT, linewidth=1.2)
    ax.fill_between(steps, loss - 0.06, loss + 0.06, color=ACCENT_FILL, alpha=0.10, linewidth=0)
    ax.axvline(induction_step, color=DEL, linestyle="--", linewidth=0.8, label=f"induction bump @ {induction_step:,}")
    ax.set_xlabel("training steps"); ax.set_ylabel("cross-entropy loss")
    ax.set_title(f"sweep-w{width}-s{seed} · final loss {final_loss:.2f}", fontsize=10)
    ax.legend(frameon=False, fontsize=8)
    style(ax)
    save(fig, name)


# ---------- 10. data zipf log-log ----------
def data_zipf():
    rng = np.random.default_rng(5)
    ranks = np.arange(1, 5001)
    freqs = 1.0 / ranks ** 1.05 * rng.lognormal(0, 0.1, ranks.shape)
    fig, ax = plt.subplots(figsize=(6.4, 3.4))
    ax.loglog(ranks, freqs, color=ACCENT, linewidth=0.8)
    ax.set_xlabel("rank (log)"); ax.set_ylabel("relative frequency (log)")
    ax.set_title("Eval-data token-frequency Zipf · OpenWebText slice 1 of 8", fontsize=10)
    style(ax)
    save(fig, "p-data-zipf.png")


# ---------- 11. suspicious phase-transition spike (the data-loader race) ----------
def suspicious_spike():
    rng = np.random.default_rng(6)
    N = 300
    steps = np.linspace(0, 30_000, N)
    base = 5.5 * np.exp(-3.0 * steps / steps.max()) + 0.35
    spike = 1.8 * np.exp(-((steps - 12_000) ** 2) / (8.0e2 ** 2))
    loss = base + spike + rng.normal(0, 0.04, N)
    fig, ax = plt.subplots(figsize=(7.2, 3.2))
    ax.plot(steps, loss, color=ACCENT, linewidth=1.0)
    ax.axvline(12_000, color=DEL, linestyle="--", linewidth=0.8)
    ax.text(12_000, loss.max() * 0.95,
            "  spike — initially read as a phase transition;\n  turned out to be a data-loader race condition.",
            color=DEL, fontsize=8)
    ax.set_xlabel("training steps"); ax.set_ylabel("cross-entropy loss")
    ax.set_title("sweep-w256-s0 · before fix to data-loader prefetch_factor", fontsize=10)
    style(ax)
    save(fig, "p-suspicious-spike-before.png")


# ---------- 12. replication scatter ----------
def replication_scatter():
    rng = np.random.default_rng(7)
    labels = [f"L1H{i}" for i in range(4)] + [f"L2H{i}" for i in range(4)]
    original = np.array([0.083, 0.819, 0.792, 0.071, 0.302, 0.281, 0.276, 0.295])
    replica = original + rng.normal(0, 0.014, 8)
    fig, ax = plt.subplots(figsize=(5.6, 4.0))
    ax.scatter(original, replica, color=ACCENT, s=44, zorder=3)
    for i, lbl in enumerate(labels):
        ax.annotate(lbl, (original[i], replica[i]), fontsize=8, color=MUTED,
                    xytext=(4, 4), textcoords="offset points")
    lo, hi = 0, 1
    ax.plot([lo, hi], [lo, hi], "--", color=MUTED, linewidth=0.8, label="y = x")
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)
    ax.set_xlabel("original (slice 1 of 8, seed 0)")
    ax.set_ylabel("replica (slice 2 of 8, seed 42)")
    ax.set_title("Replication scatter · effect survives held-out slice and seed shift", fontsize=10)
    ax.legend(frameon=False, fontsize=8)
    style(ax)
    save(fig, "p-replication-scatter.png")


# ---------- 13. headline final (publication-quality version of the crossover) ----------
def headline_final():
    widths = np.array([128, 256, 384, 512, 1024])
    best_L1 = np.array([0.84, 0.82, 0.61, 0.78, 0.78])
    best_L0 = np.array([0.05, 0.04, 0.42, 0.71, 0.72])
    fig, ax = plt.subplots(figsize=(7.4, 4.4))
    ax.plot(widths, best_L1, "-o", color=ACCENT, label="best L1 head", linewidth=2.0, markersize=6)
    ax.plot(widths, best_L0, "-s", color=DEL,     label="best L0 head", linewidth=2.0, markersize=6)
    ax.set_xscale("log")
    ax.set_xticks(widths); ax.set_xticklabels([str(w) for w in widths])
    ax.set_ylim(0, 1.0)
    ax.set_xlabel("model width  d", fontsize=11)
    ax.set_ylabel("prefix-match score (best head per layer)", fontsize=11)
    ax.set_title("Figure 1: Induction circuit compresses to L1 at d ≤ 256, splits at d ≥ 512", fontsize=11)
    ax.axvspan(380, 390, alpha=0.08, color="orange")
    ax.text(384, 0.92, "transition\nregime", fontsize=8, color="#92400e", ha="center")
    ax.legend(frameon=False, fontsize=10, loc="lower right")
    style(ax)
    save(fig, "p-headline-final.png")


# ---------- gallery & extras ----------
def gallery_extras():
    # 6 misc plots to round out 46. Quickly produced.
    rng = np.random.default_rng(8)

    # discarded earlier-checkpoint heatmap
    fig, ax = plt.subplots(figsize=(4.6, 2.2))
    scores = rng.uniform(0, 0.3, (2, 4))
    im = ax.imshow(scores, vmin=0, vmax=1, cmap="Blues", aspect="auto")
    ax.set_title("L/H heatmap @ step 25,000 (discarded — early)", fontsize=9)
    ax.set_xticks(range(4)); ax.set_yticks(range(2))
    ax.set_xticklabels([f"H{i}" for i in range(4)], fontsize=7)
    ax.set_yticklabels(["L0", "L1"], fontsize=7)
    style(ax)
    save(fig, "p-gallery-early-heatmap.png")

    # exploratory data-mixture plot
    fig, ax = plt.subplots(figsize=(5.6, 3.0))
    cats = ["web", "books", "code", "math", "wiki"]
    pct = [55, 12, 15, 4, 14]
    ax.barh(cats, pct, color=ACCENT)
    ax.set_xlabel("token share (%)")
    ax.set_title("OpenWebText slice 1 of 8 · domain mix (estimated)", fontsize=9)
    style(ax)
    save(fig, "p-gallery-data-mix.png")

    # failed path-patching near-zero grid
    fig, ax = plt.subplots(figsize=(5.6, 2.4))
    scores = rng.uniform(-0.02, 0.04, (2, 4))
    im = ax.imshow(scores, vmin=-0.05, vmax=1, cmap="Blues", aspect="auto")
    ax.set_title("Path-patching (misconfigured) · all heads ≈ 0", fontsize=9)
    ax.set_xticks(range(4)); ax.set_yticks(range(2))
    ax.set_xticklabels([f"H{i}" for i in range(4)], fontsize=7)
    ax.set_yticklabels(["L0", "L1"], fontsize=7)
    for (i, j), v in np.ndenumerate(scores):
        ax.text(j, i, f"{v:.2f}", ha="center", va="center", color="#111", fontsize=7)
    style(ax)
    save(fig, "p-gallery-pathpatch-misconfig.png")

    # runtime comparison bar
    fig, ax = plt.subplots(figsize=(5.0, 3.0))
    ax.bar(["activation\npatching", "attribution\npatching", "ACDC"],
           [120, 6, 540], color=ACCENT)
    ax.set_ylabel("wall-clock seconds")
    ax.set_title("Runtime comparison · d=256 model, batch 32", fontsize=9)
    style(ax)
    save(fig, "p-runtime-comparison.png")

    # ablation matrix
    fig, ax = plt.subplots(figsize=(5.0, 3.0))
    M = rng.uniform(0, 1, (8, 8))
    np.fill_diagonal(M, 1.0)
    im = ax.imshow(M, cmap="Blues", aspect="auto")
    ax.set_title("Pairwise ablation matrix · L1 heads × L1 heads", fontsize=9)
    ax.set_xticks(range(4)); ax.set_yticks(range(4))
    style(ax)
    save(fig, "p-gallery-ablation-matrix.png")

    # induction score vs step curves
    fig, ax = plt.subplots(figsize=(6.4, 3.0))
    steps = np.linspace(0, 200_000, 200)
    for h, color in zip([1, 2], [ACCENT, "#0f766e"]):
        score = 0.85 / (1 + np.exp(-(steps - 60_000) / 8000)) + rng.normal(0, 0.02, len(steps))
        ax.plot(steps, score, color=color, linewidth=1.2, label=f"L1H{h}")
    for h in [0, 3]:
        ax.plot(steps, rng.uniform(0, 0.1, len(steps)), color=MUTED, linewidth=0.6,
                label=f"L1H{h}" if h == 0 else None)
    ax.set_xlabel("training steps"); ax.set_ylabel("prefix-match score")
    ax.set_title("L1 head prefix-match score across training", fontsize=10)
    ax.legend(frameon=False, fontsize=8)
    style(ax)
    save(fig, "p-induction-vs-step.png")


def main():
    hero_heatmap()
    head_pm_converged()
    attn_pattern_l1h1()
    causal_effect_bars()
    width_5panel()
    width_crossover()
    loss_curve("p-loss-w128.png", 128, 0.42, 30_000, 0)
    loss_curve("p-loss-w256.png", 256, 0.31, 60_000, 0)
    loss_curve("p-loss-w1024.png", 1024, 0.24, 90_000, 0)
    data_zipf()
    suspicious_spike()
    replication_scatter()
    headline_final()
    gallery_extras()
    print(f"[gen_plots] done — outputs in {OUT}")


if __name__ == "__main__":
    main()
