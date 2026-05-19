// The 34-file fake repo. Files with `lines > 0` show line counts.
// `fileContents` holds the full final-state content for 12 of them — these are
// the ones reviewers will click open on the tree view.
window.REPO = {
  files: [
    { path: "README.md",                                         name: "README.md",                      depth: 0, lines: 84 },
    { path: "Makefile",                                          name: "Makefile",                       depth: 0, lines: 41 },
    { path: "pyproject.toml",                                    name: "pyproject.toml",                 depth: 0, lines: 27 },
    { path: "requirements.txt",                                  name: "requirements.txt",               depth: 0, lines: 18 },
    { path: "wandb_config.yaml",                                 name: "wandb_config.yaml",              depth: 0, lines: 12 },
    { path: ".gitignore",                                        name: ".gitignore",                     depth: 0, lines: 22 },
    { path: "configs/",                                          name: "configs/",                       depth: 0 },
    { path: "configs/base.yaml",                                 name: "  base.yaml",                    depth: 1, lines: 38 },
    { path: "configs/sweep.yaml",                                name: "  sweep.yaml",                   depth: 1, lines: 24 },
    { path: "configs/replicate.yaml",                            name: "  replicate.yaml",               depth: 1, lines: 19 },
    { path: "src/",                                              name: "src/",                           depth: 0 },
    { path: "src/training/attn_only.py",                         name: "  training/attn_only.py",        depth: 1, lines: 184 },
    { path: "src/training/data_loader.py",                       name: "  training/data_loader.py",      depth: 1, lines: 112 },
    { path: "src/training/train.py",                             name: "  training/train.py",            depth: 1, lines: 142 },
    { path: "src/probes/prefix_match.py",                        name: "  probes/prefix_match.py",       depth: 1, lines: 91 },
    { path: "src/probes/activation_patching.py",                 name: "  probes/activation_patching.py",depth: 1, lines: 156 },
    { path: "src/probes/path_patching.py",                       name: "  probes/path_patching.py",      depth: 1, lines: 121 },
    { path: "src/probes/head_ablation.py",                       name: "  probes/head_ablation.py",      depth: 1, lines: 70 },
    { path: "src/utils/wandb_setup.py",                          name: "  utils/wandb_setup.py",         depth: 1, lines: 38 },
    { path: "src/utils/eval_data.py",                            name: "  utils/eval_data.py",           depth: 1, lines: 84 },
    { path: "scripts/",                                          name: "scripts/",                       depth: 0 },
    { path: "scripts/sweep_widths.py",                           name: "  sweep_widths.py",              depth: 1, lines: 62 },
    { path: "scripts/replicate.py",                              name: "  replicate.py",                 depth: 1, lines: 54 },
    { path: "scripts/plot_heatmaps.py",                          name: "  plot_heatmaps.py",             depth: 1, lines: 138 },
    { path: "scripts/gen_eval_batch.py",                         name: "  gen_eval_batch.py",            depth: 1, lines: 45 },
    { path: "scripts/inspect_checkpoint.py",                     name: "  inspect_checkpoint.py",        depth: 1, lines: 72 },
    { path: "tests/",                                            name: "tests/",                         depth: 0 },
    { path: "tests/test_prefix_match.py",                        name: "  test_prefix_match.py",         depth: 1, lines: 48 },
    { path: "tests/test_patching.py",                            name: "  test_patching.py",             depth: 1, lines: 56 },
    { path: "tests/test_data_loader.py",                         name: "  test_data_loader.py",          depth: 1, lines: 38 },
    { path: "notebooks/",                                        name: "notebooks/",                     depth: 0 },
    { path: "notebooks/01-exploration.ipynb",                    name: "  01-exploration.ipynb",         depth: 1, lines: 24 },
    { path: "notebooks/02-checkpoint-analysis.ipynb",            name: "  02-checkpoint-analysis.ipynb", depth: 1, lines: 31 },
    { path: "notebooks/03-head-attention-viz.ipynb",             name: "  03-head-attention-viz.ipynb",  depth: 1, lines: 19 },
    { path: "paper/",                                            name: "paper/",                         depth: 0 },
    { path: "paper/main.tex",                                    name: "  main.tex",                     depth: 1, lines: 28 },
    { path: "paper/refs.bib",                                    name: "  refs.bib",                     depth: 1, lines: 72 },
    { path: "paper/sections/intro.tex",                          name: "    sections/intro.tex",         depth: 2, lines: 41 },
    { path: "paper/sections/method.tex",                         name: "    sections/method.tex",        depth: 2, lines: 84 },
    { path: "paper/sections/results.tex",                        name: "    sections/results.tex",       depth: 2, lines: 112 },
    { path: "paper/sections/discussion.tex",                     name: "    sections/discussion.tex",    depth: 2, lines: 48 },
    { path: "paper/sections/limitations.tex",                    name: "    sections/limitations.tex",   depth: 2, lines: 22 },
    { path: "paper/sections/broader_impact.tex",                 name: "    sections/broader_impact.tex",depth: 2, lines: 18 },
  ],
  totalLines: 2410,
  fileContents: {
    "src/probes/prefix_match.py": `"""Olsson-style prefix-match score.

For each attention head h, on a batch of sequences with a single repeated
subsequence at offset k, the prefix-match score is the average attention
weight from query position t to key position t - k + 1, restricted to t > k.
This is the operational definition of induction-head behavior in Olsson et
al. (2022).
"""
from __future__ import annotations

import torch
from transformer_lens import HookedTransformer


def prefix_match_score(
    model: HookedTransformer,
    tokens: torch.Tensor,
    repeat_offset: int = 128,
) -> torch.Tensor:
    """Returns a [n_layers, n_heads] tensor of per-head scores."""
    assert tokens.dim() == 2, "tokens must be [batch, seq]"
    n_layers, n_heads = model.cfg.n_layers, model.cfg.n_heads

    _, cache = model.run_with_cache(
        tokens, names_filter=lambda n: n.endswith('attn.hook_pattern')
    )

    scores = torch.zeros(n_layers, n_heads, device=model.cfg.device)
    seq_len = tokens.shape[1]

    for layer in range(n_layers):
        attn = cache[f'blocks.{layer}.attn.hook_pattern']  # [batch, head, q, k]
        for q in range(repeat_offset + 1, seq_len):
            target_k = q - repeat_offset + 1
            if 0 <= target_k < seq_len:
                # Average across batch and across query positions in the
                # repeated half.
                scores[layer] += attn[:, :, q, target_k].mean(dim=0)
        scores[layer] /= max(1, seq_len - repeat_offset - 1)

    return scores
`,
    "src/probes/activation_patching.py": `from __future__ import annotations

import torch
from transformer_lens import HookedTransformer
from typing import Callable


def patch_attn_out(
    model: HookedTransformer,
    clean_tokens: torch.Tensor,
    corrupted_tokens: torch.Tensor,
    answer_token_idx: int,
    distractor_token_idx: int,
) -> torch.Tensor:
    """Per-head logit-diff recovered when patching attn-out at (layer, head).

    Returns a [n_layers, n_heads] tensor of recovery fractions.
    """
    n_layers, n_heads = model.cfg.n_layers, model.cfg.n_heads
    recovered = torch.zeros(n_layers, n_heads, device=model.cfg.device)

    _, clean_cache = model.run_with_cache(
        clean_tokens, names_filter=lambda n: n.endswith('attn.hook_z')
    )

    clean_logits = model(clean_tokens, return_type='logits')
    corrupted_logits = model(corrupted_tokens, return_type='logits')

    clean_diff = (clean_logits[:, -1, answer_token_idx] -
                  clean_logits[:, -1, distractor_token_idx]).mean()
    corrupted_diff = (corrupted_logits[:, -1, answer_token_idx] -
                      corrupted_logits[:, -1, distractor_token_idx]).mean()

    for layer in range(n_layers):
        for head in range(n_heads):
            def hook_fn(z, hook, h=head):
                z[:, :, h] = clean_cache[f'blocks.{layer}.attn.hook_z'][:, :, h]
                return z

            patched = model.run_with_hooks(
                corrupted_tokens,
                fwd_hooks=[(f'blocks.{layer}.attn.hook_z', hook_fn)],
                return_type='logits',
            )
            patched_diff = (patched[:, -1, answer_token_idx] -
                            patched[:, -1, distractor_token_idx]).mean()
            recovered[layer, head] = (patched_diff - corrupted_diff) / (clean_diff - corrupted_diff)

    return recovered
`,
    "src/probes/head_ablation.py": `from __future__ import annotations

import torch
from transformer_lens import HookedTransformer


def ablate_head(model, tokens, layer: int, head: int) -> torch.Tensor:
    """Zero-ablate a single attention head at (layer, head)."""
    def hook(z, hook_, h=head):
        z[..., h, :] = 0.0
        return z

    return model.run_with_hooks(
        tokens,
        fwd_hooks=[(f'blocks.{layer}.attn.hook_z', hook)],
        return_type='logits',
    )


def ablate_all_heads(model, tokens):
    """Returns dict mapping head index to its ablation logits."""
    out = {}
    for h in range(model.cfg.n_heads):  # was range(n_heads + 1) — off-by-one fixed at 44bd1ef0
        out[h] = ablate_head(model, tokens, layer=1, head=h)
    return out
`,
    "src/utils/eval_data.py": `from __future__ import annotations

import numpy as np
import torch


def make_repeated_prefix_batch(
    vocab_size: int,
    batch_size: int,
    seq_len: int,
    repeat_offset: int,
    rng: np.random.Generator,
) -> torch.Tensor:
    """Build a batch of sequences with one repeated subsequence at offset k.

    Each sequence has random tokens [0..k-1] followed by a copy of the same
    [0..k-1] tokens; the model should learn to predict positions k..2k from
    the first half (this is the eval Olsson et al. 2022 use).
    """
    base = rng.integers(0, vocab_size, size=(batch_size, repeat_offset))
    tail_len = seq_len - repeat_offset
    if tail_len > repeat_offset:
        tail = np.concatenate([base, rng.integers(0, vocab_size,
                                                  size=(batch_size, tail_len - repeat_offset))], axis=1)
    else:
        tail = base[:, :tail_len]
    seq = np.concatenate([base, tail], axis=1)
    return torch.from_numpy(seq).long()


def _make_corrupted(tokens, offset, rng):
    """Build the corrupted prompt: same prefix, shuffled repeat region.

    NOTE: an earlier version shuffled the *prefix* by mistake, which produced
    corrupted prompts almost identical to clean ones (caught in Act III). Fix
    landed in commit 2c81bb50.
    """
    out = tokens.clone()
    indices = rng.permutation(np.arange(offset, len(out)))
    out[offset:] = tokens[indices]
    return out
`,
    "scripts/sweep_widths.py": `import argparse, itertools, json, subprocess, sys
from pathlib import Path

WIDTHS = [128, 256, 384, 512, 1024]
SEEDS = [0, 1, 2]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--widths', type=int, nargs='+', default=WIDTHS)
    parser.add_argument('--seeds', type=int, nargs='+', default=SEEDS)
    parser.add_argument('--steps', type=int, default=200_000)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    grid = list(itertools.product(args.widths, args.seeds))
    print(f'[sweep] {len(grid)} runs queued', file=sys.stderr)
    for width, seed in grid:
        cmd = [
            'python', '-m', 'src.training.train',
            '--width', str(width),
            '--seed', str(seed),
            '--steps', str(args.steps),
            '--run-name', f'sweep-w{width}-s{seed}',
        ]
        print(' '.join(cmd))
        if not args.dry_run:
            subprocess.run(cmd, check=True)


if __name__ == '__main__':
    main()
`,
    "scripts/replicate.py": `import argparse, subprocess, sys


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--seed', type=int, default=42)
    parser.add_argument('--data-slice', type=int, default=2,
                        help='OpenWebText slice index (1..8)')
    parser.add_argument('--width', type=int, default=256)
    args = parser.parse_args()

    cmd = [
        'python', '-m', 'src.training.train',
        '--width', str(args.width),
        '--seed', str(args.seed),
        '--data-slice', str(args.data_slice),
        '--steps', '200000',
        '--run-name', f'replicate-w{args.width}-s{args.seed}-slice{args.data_slice}',
        '--tags', 'replication',
    ]
    print(' '.join(cmd), file=sys.stderr)
    subprocess.run(cmd, check=True)


if __name__ == '__main__':
    main()
`,
    "src/utils/wandb_setup.py": `import os, wandb
from typing import Mapping


def init_wandb(run_name: str, config: Mapping, project: str = 'induction-heads', tags=None):
    return wandb.init(
        project=project,
        name=run_name,
        config=dict(config),
        tags=list(tags or []),
        mode=os.environ.get('WANDB_MODE', 'online'),
        settings=wandb.Settings(start_method='thread'),
    )
`,
    "configs/base.yaml": `# Base training config — induction-heads-2L
# (commit 7902aabb fixed the prefetch_factor that was causing the spurious
#  phase-transition spike on sweep-w256-s0; see Act IV.)

model:
  arch: attn-only
  n_layers: 2
  n_heads: 4
  d_model: 256
  d_head: 64

training:
  batch_size: 32
  seq_len: 256
  learning_rate: 3.0e-4
  warmup_steps: 2000
  steps: 200000
  optimizer: adam
  weight_decay: 0.01

data:
  source: openwebtext
  slice: 1
  prefetch_factor: 4    # was 0; concurrent eval/train batch caused a race
  num_workers: 4

probe:
  k: 128
  eval_batch_size: 32

wandb:
  project: induction-heads
  tags: [base, attn-only-2L]
`,
    "paper/main.tex": `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{Induction Heads, Compressed:\\\\
       a 2-layer attention-only model uses a single layer}
\\author{A. Iyer \\\\ MIT CSAIL \\\\ \\texttt{aiyer@mit.edu}}
\\date{\\today}

\\begin{document}
\\maketitle

\\input{sections/intro}
\\input{sections/method}
\\input{sections/results}
\\input{sections/discussion}
\\input{sections/limitations}
\\input{sections/broader_impact}

\\bibliography{refs}

\\end{document}
`,
    "paper/sections/results.tex": `\\section{Results}

\\subsection{Prefix-match scores at $d{=}256$}
We measure per-(layer, head) prefix-match score at offset $k=128$. Contrary
to the canonical position, scores saturate on \\emph{layer 1} (heads 1 and 2,
at $0.82$ and $0.79$) while layer-2 heads remain near $0.30$.

\\subsection{Activation patching}
With activation patching at attention output (Wang et al. 2022), the L1
heads 1 and 2 are causally necessary (recovering $0.71$ and $0.62$ of the
logit-difference respectively), and the high-prefix-match L2 head 1 is
\\emph{not} ($0.04 \\pm 0.03$).

\\subsection{Width sweep}
Figure~\\ref{fig:width-crossover} summarises the per-(layer, head)
prefix-match score of the best head in each layer across widths
$d \\in \\{128, 256, 384, 512, 1024\\}$, three seeds each. At $d \\le 256$,
the best-scoring head is in layer 1 in every seed.\\footnote{We further
replicate the $d{=}256$ result on a held-out dataset slice (OpenWebText
slice 2 of 8) and a fresh seed ($\\mathrm{seed}{=}42$); see Appendix~A.}
At $d \\ge 512$, the canonical L0=previous-token, L1=induction split emerges
in 5/6 seeds. $d{=}384$ is the transition regime: both layers carry signal.
`,
    "Makefile": `.PHONY: train sweep eval probe paper test clean

PYTHON ?= python

train:
\t$(PYTHON) -m src.training.train --config configs/base.yaml

sweep:
\t$(PYTHON) scripts/sweep_widths.py --widths 128 256 384 512 1024 --seeds 0 1 2

eval:
\t$(PYTHON) -m src.probes.prefix_match --layer all --width 256

probe:
\t$(PYTHON) -m src.probes.activation_patching --width 256

paper:
\tcd paper && pdflatex main.tex && bibtex main && pdflatex main.tex && pdflatex main.tex

test:
\tpytest tests/

clean:
\trm -rf wandb/run-* checkpoints/scratch/ paper/main.aux paper/main.log
`,
  },
};
