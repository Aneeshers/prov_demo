# prov_demo · one research trajectory, fully captured

A single-page demo of **Provenance** — a tool that captures the full graph of an AI-assisted
research project: every Claude Code session, every git commit, every wandb experiment,
every paper edit, every researcher annotation, and every dead end.

This repository contains **one** trajectory (the "Induction Heads, Compressed" investigation)
rendered as a long-form web page. It exists to demonstrate what one captured project looks like
end to end — what a frontier lab would actually buy.

## What's on the page

- One mech-interp research project — Aneesh Muppidi (Stanford CS) asking whether a 2-layer
  attention-only model implements the canonical Olsson 2022 induction circuit.
- **386 conversation turns** across 40 Claude Code sessions (9 with full transcripts inline,
  the other 31 with summary drawers in the session index).
- **88 git commits** with realistic mech-interp messages, in a github-style feed.
- **87 wandb runs** with config-deltas, status mix, and per-run sparklines.
- **52 paper edits** across 7 LaTeX files, shown as unified diffs on the page and as a
  timeline at the bottom.
- **46 plots** (19 generated as real PNGs by `scripts/gen_plots.py`; 27 reference these).
- **110 researcher annotations** in 6 kinds (hypothesis / rejected / experiment / paper-claim
  / decision / followup) — 32 anchored to specific turns in the gutter.
- **4 dead-ends preserved** — the moments a marketing demo would hide:
  1. The L2 prediction rejected in Act II.
  2. The path-patching bug afternoon in Act III.
  3. The off-by-one slicing error + data-loader race in Act IV.
  4. The abstract "collapses" self-rejection in Act V.

## Reading paths

The page can feel overwhelming. Three suggested time budgets:

- **30 seconds** — read the abstract, look at the hero plot, scan the stat strip.
- **5 minutes** — read the abstract, then walk the seven acts via the TOC on the left.
- **30 minutes** — read Act II (the surprise), Act III (the disambiguation), Act IV (the
  width sweep with two more dead-ends), Act V (the abstract self-rejection). These are the
  moments that don't appear in the final paper but were central to the research.

The filter chips in the top bar (turns / code / runs / plots / paper / notes) let you hide
everything except one artifact type — useful for "show me every paper diff in order."

## View it locally

```sh
python3 -m http.server 8000
# open http://127.0.0.1:8000/
```

Plain HTML/CSS/JS. No framework, no build step.

## Regenerate the content

```sh
python3 scripts/gen_plots.py     # 19 PNGs into assets/figures/
python3 scripts/gen_content.py   # commits.js · runs.js · paper-edits.js · annotations.js
```

The other content files (`meta.js`, `trajectory.js`, `sessions.js`, `repo-tree.js`,
`plots.js`) are hand-authored.

## What's non-negotiable

If you fork or edit this, preserve:

1. **The four dead-ends.** Without them, the page reads as marketing copy.
2. **The two Python tracebacks** (path-patching diff sanity check, head-ablation IndexError).
3. **The "we make no dynamical claim" sentence** at the end of the abstract — the receipt
   for the soften in Act V.

## License

Captured research content is illustrative for demonstration purposes.
Demo code is MIT-licensed.

## Built by

Aneesh Muppidi · [aneeshers.github.io](https://aneeshers.github.io)
