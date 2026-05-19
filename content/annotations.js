window.ANNOTATIONS = [
  {
    "id": "ann-010",
    "kind": "followup",
    "anchorId": "\u03ba",
    "gutter": true,
    "body": "Next: 6L attn-only at $d \\in \\{128, 256, 512\\}$. Prediction: canonical L0/L1 split holds at all widths once depth $\\ge 4$. Open: are decorative high-pm L2 heads doing copy-suppression?",
    "refSha": "aacc1199",
    "ts": "2026-05-07T09:30"
  },
  {
    "id": "ann-log-006",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-05-06T01:41",
    "gutter": false
  },
  {
    "id": "ann-log-052",
    "kind": "paper-claim",
    "body": "Stake: width crossover happens between $d=384$ and $d=512$ in our setup.",
    "refSha": "",
    "ts": "2026-05-05T20:51",
    "gutter": false
  },
  {
    "id": "ann-log-038",
    "kind": "paper-claim",
    "body": "Stake: $d=384$ is a transition regime \u2014 both layers carry signal.",
    "refSha": "",
    "ts": "2026-05-05T00:41",
    "gutter": false
  },
  {
    "id": "ann-log-081",
    "kind": "paper-claim",
    "body": "Stake: at $d \\le 256$ the induction circuit is layer-1-concentrated; we will write this carefully.",
    "refSha": "",
    "ts": "2026-05-04T22:25",
    "gutter": false
  },
  {
    "id": "ann-log-008",
    "kind": "followup",
    "body": "Are decorative L2 heads doing copy suppression? McDougall 2023 protocol.",
    "refSha": "",
    "ts": "2026-05-03T20:34",
    "gutter": false
  },
  {
    "id": "ann-log-014",
    "kind": "decision",
    "body": "Defer 6L follow-up to next sprint; current paper is about the 2L picture only.",
    "refSha": "",
    "ts": "2026-05-03T19:02",
    "gutter": false
  },
  {
    "id": "ann-009",
    "kind": "experiment",
    "anchorId": "\u03b9",
    "gutter": true,
    "body": "Replication on held-out slice (OpenWebText slice 2 of 8, seed=42) lands within noise: L1H1=0.80 vs original 0.82; L1H2=0.78 vs 0.79. Effect is robust.",
    "refSha": "3344aabb",
    "ts": "2026-05-03T09:30"
  },
  {
    "id": "ann-log-085",
    "kind": "followup",
    "body": "Patching at d=1024: does the L0/L1 split survive head-specific perturbations?",
    "refSha": "",
    "ts": "2026-05-01T03:42",
    "gutter": false
  },
  {
    "id": "ann-log-010",
    "kind": "followup",
    "body": "Build a tiny benchmark of 'compression vs split' for tiny LMs and release alongside paper.",
    "refSha": "",
    "ts": "2026-04-30T04:45",
    "gutter": false
  },
  {
    "id": "ann-log-084",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-04-29T05:07",
    "gutter": false
  },
  {
    "id": "ann-log-095",
    "kind": "experiment",
    "body": "Ran the patching grid on width=128: same L1 dominance pattern, even sharper.",
    "refSha": "",
    "ts": "2026-04-29T04:35",
    "gutter": false
  },
  {
    "id": "ann-log-057",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-04-28T23:07",
    "gutter": false
  },
  {
    "id": "ann-log-051",
    "kind": "rejected",
    "body": "Considered a per-head learnable gate \u2014 overkill, biased the optimization.",
    "refSha": "",
    "ts": "2026-04-28T20:03",
    "gutter": false
  },
  {
    "id": "ann-log-060",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-04-28T00:02",
    "gutter": false
  },
  {
    "id": "ann-log-012",
    "kind": "paper-claim",
    "body": "Stake: prefix-match score alone is insufficient; report patching in any future work on tiny models.",
    "refSha": "",
    "ts": "2026-04-26T22:01",
    "gutter": false
  },
  {
    "id": "ann-log-062",
    "kind": "hypothesis",
    "body": "Maybe the prev-token head is actually a 'shifted-induction' head at d=128.",
    "refSha": "",
    "ts": "2026-04-26T18:53",
    "gutter": false
  },
  {
    "id": "ann-log-098",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-04-25T19:43",
    "gutter": false
  },
  {
    "id": "ann-log-054",
    "kind": "experiment",
    "body": "Ran a synthetic-token-mix sanity run: prefix-match score behaves as expected on uniformly random tokens.",
    "refSha": "",
    "ts": "2026-04-24T19:35",
    "gutter": false
  },
  {
    "id": "ann-log-099",
    "kind": "experiment",
    "body": "Verified Olsson induction-score implementation matches transformer_lens reference.",
    "refSha": "",
    "ts": "2026-04-24T02:06",
    "gutter": false
  },
  {
    "id": "ann-log-022",
    "kind": "experiment",
    "body": "Lit-checked Wang et al. 2022 patching to ensure clean/corrupted prompt construction matches IOI.",
    "refSha": "",
    "ts": "2026-04-22T23:48",
    "gutter": false
  },
  {
    "id": "ann-log-090",
    "kind": "rejected",
    "body": "Considered using mean attention entropy as a head-importance proxy \u2014 too noisy.",
    "refSha": "",
    "ts": "2026-04-22T22:14",
    "gutter": false
  },
  {
    "id": "ann-log-065",
    "kind": "followup",
    "body": "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
    "refSha": "",
    "ts": "2026-04-22T02:37",
    "gutter": false
  },
  {
    "id": "ann-log-016",
    "kind": "hypothesis",
    "body": "If we ablate L1H1 alone, the model should lose ICL at the repeated-prefix eval.",
    "refSha": "",
    "ts": "2026-04-22T00:02",
    "gutter": false
  },
  {
    "id": "ann-log-042",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-04-20T02:25",
    "gutter": false
  },
  {
    "id": "ann-007",
    "kind": "rejected",
    "anchorId": "\u03b7",
    "gutter": true,
    "body": "Original phrasing 'induction collapses into a single layer' overstates: 'collapses' implies dynamics. We have a static head-allocation observation. Softening to 'effectively compresses'.",
    "refSha": "70f132aa",
    "ts": "2026-04-19T09:30"
  },
  {
    "id": "ann-008",
    "kind": "paper-claim",
    "anchorId": "\u03b8",
    "gutter": true,
    "body": "Final phrasing: 'effectively compresses into layer 1 at $d \\le 256$ in the sense that the best L1 head exceeds 0.79 while the best L2 head remains below 0.35.' Avoids dynamical claim.",
    "refSha": "70f132aa",
    "ts": "2026-04-19T09:30"
  },
  {
    "id": "ann-log-025",
    "kind": "paper-claim",
    "body": "Stake: McDougall 2023 copy-suppression is a candidate for what L2H1 is actually doing; deferred.",
    "refSha": "",
    "ts": "2026-04-18T02:21",
    "gutter": false
  },
  {
    "id": "ann-log-031",
    "kind": "followup",
    "body": "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
    "refSha": "",
    "ts": "2026-04-17T23:33",
    "gutter": false
  },
  {
    "id": "ann-log-048",
    "kind": "decision",
    "body": "Will not write the discussion paragraph until I've decided which framing \u2014 'compression' or 'capacity-pressure'.",
    "refSha": "",
    "ts": "2026-04-17T20:28",
    "gutter": false
  },
  {
    "id": "ann-log-091",
    "kind": "experiment",
    "body": "Lit-checked Wang et al. 2022 patching to ensure clean/corrupted prompt construction matches IOI.",
    "refSha": "",
    "ts": "2026-04-15T23:42",
    "gutter": false
  },
  {
    "id": "ann-log-079",
    "kind": "followup",
    "body": "Patching at d=1024: does the L0/L1 split survive head-specific perturbations?",
    "refSha": "",
    "ts": "2026-04-15T22:47",
    "gutter": false
  },
  {
    "id": "ann-log-071",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-04-15T22:10",
    "gutter": false
  },
  {
    "id": "ann-log-077",
    "kind": "paper-claim",
    "body": "Stake: McDougall 2023 copy-suppression is a candidate for what L2H1 is actually doing; deferred.",
    "refSha": "",
    "ts": "2026-04-15T19:07",
    "gutter": false
  },
  {
    "id": "ann-log-083",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-04-14T21:47",
    "gutter": false
  },
  {
    "id": "ann-log-080",
    "kind": "experiment",
    "body": "Ran the patching grid on width=128: same L1 dominance pattern, even sharper.",
    "refSha": "",
    "ts": "2026-04-14T04:14",
    "gutter": false
  },
  {
    "id": "ann-log-096",
    "kind": "decision",
    "body": "Will include one negative result in the limitations section (cf. L2H1 decorative behavior).",
    "refSha": "",
    "ts": "2026-04-14T02:30",
    "gutter": false
  },
  {
    "id": "ann-log-045",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-04-13T22:04",
    "gutter": false
  },
  {
    "id": "ann-log-027",
    "kind": "rejected",
    "body": "Tried using gradient magnitudes as a poor man's attribution \u2014 non-discriminating.",
    "refSha": "",
    "ts": "2026-04-13T00:18",
    "gutter": false
  },
  {
    "id": "ann-log-018",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-04-12T20:28",
    "gutter": false
  },
  {
    "id": "ann-log-093",
    "kind": "decision",
    "body": "Plot palette: blue line + red comparison; no neon. Match paper-template style.",
    "refSha": "",
    "ts": "2026-04-11T04:23",
    "gutter": false
  },
  {
    "id": "ann-log-097",
    "kind": "rejected",
    "body": "Tried using gradient magnitudes as a poor man's attribution \u2014 non-discriminating.",
    "refSha": "",
    "ts": "2026-04-10T19:13",
    "gutter": false
  },
  {
    "id": "ann-log-069",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-04-09T19:14",
    "gutter": false
  },
  {
    "id": "ann-log-002",
    "kind": "experiment",
    "body": "Reran sweep-w384-s0 with a new seed (4) to check transition-regime seed variance: confirms.",
    "refSha": "",
    "ts": "2026-04-09T01:22",
    "gutter": false
  },
  {
    "id": "ann-log-015",
    "kind": "experiment",
    "body": "Reran sweep-w384-s0 with a new seed (4) to check transition-regime seed variance: confirms.",
    "refSha": "",
    "ts": "2026-04-08T19:36",
    "gutter": false
  },
  {
    "id": "ann-log-019",
    "kind": "followup",
    "body": "6L attention-only sweep at d \u2208 {128, 256, 512}, seeds {0,1,2}.",
    "refSha": "",
    "ts": "2026-04-08T01:24",
    "gutter": false
  },
  {
    "id": "ann-log-049",
    "kind": "rejected",
    "body": "Idea: just look at attention pattern in expectation \u2014 not a good test of induction-headedness.",
    "refSha": "",
    "ts": "2026-04-04T19:21",
    "gutter": false
  },
  {
    "id": "ann-log-055",
    "kind": "followup",
    "body": "Cross-check with Pythia-160m baseline runs from the public release.",
    "refSha": "",
    "ts": "2026-04-04T18:45",
    "gutter": false
  },
  {
    "id": "ann-log-023",
    "kind": "hypothesis",
    "body": "If we ablate L1H1 alone, the model should lose ICL at the repeated-prefix eval.",
    "refSha": "",
    "ts": "2026-04-04T05:20",
    "gutter": false
  },
  {
    "id": "ann-log-021",
    "kind": "followup",
    "body": "Build a tiny benchmark of 'compression vs split' for tiny LMs and release alongside paper.",
    "refSha": "",
    "ts": "2026-04-04T02:55",
    "gutter": false
  },
  {
    "id": "ann-log-013",
    "kind": "experiment",
    "body": "Ran the patching grid on width=128: same L1 dominance pattern, even sharper.",
    "refSha": "",
    "ts": "2026-04-04T00:12",
    "gutter": false
  },
  {
    "id": "ann-log-066",
    "kind": "hypothesis",
    "body": "Could the L1 saturation be eval-batch artifact? Test with three eval batches.",
    "refSha": "",
    "ts": "2026-04-03T02:17",
    "gutter": false
  },
  {
    "id": "ann-log-056",
    "kind": "experiment",
    "body": "Ablation matrix: pairwise ablation of L1H1 and L1H2 \u2248 catastrophic; either alone tolerable.",
    "refSha": "",
    "ts": "2026-04-02T03:33",
    "gutter": false
  },
  {
    "id": "ann-log-100",
    "kind": "rejected",
    "body": "Idea: just look at attention pattern in expectation \u2014 not a good test of induction-headedness.",
    "refSha": "",
    "ts": "2026-04-01T21:34",
    "gutter": false
  },
  {
    "id": "ann-log-086",
    "kind": "decision",
    "body": "Will include one negative result in the limitations section (cf. L2H1 decorative behavior).",
    "refSha": "",
    "ts": "2026-04-01T02:33",
    "gutter": false
  },
  {
    "id": "ann-log-039",
    "kind": "experiment",
    "body": "Reran sweep-w384-s0 with a new seed (4) to check transition-regime seed variance: confirms.",
    "refSha": "",
    "ts": "2026-03-31T23:38",
    "gutter": false
  },
  {
    "id": "ann-log-078",
    "kind": "decision",
    "body": "Will not include the path-patching misconfig story in the paper \u2014 covered in this trajectory instead.",
    "refSha": "",
    "ts": "2026-03-31T00:40",
    "gutter": false
  },
  {
    "id": "ann-log-094",
    "kind": "followup",
    "body": "Are decorative L2 heads doing copy suppression? McDougall 2023 protocol.",
    "refSha": "",
    "ts": "2026-03-30T21:44",
    "gutter": false
  },
  {
    "id": "ann-log-034",
    "kind": "decision",
    "body": "Will not include the path-patching misconfig story in the paper \u2014 covered in this trajectory instead.",
    "refSha": "",
    "ts": "2026-03-30T21:12",
    "gutter": false
  },
  {
    "id": "ann-006",
    "kind": "paper-claim",
    "anchorId": "\u03b6",
    "gutter": true,
    "body": "Resolution: at $d \\le 256$, induction compresses into L1. At $d \\ge 512$, the canonical L0=prev-token, L1=induction split emerges. $d=384$ is the transition regime. This is the headline.",
    "refSha": "ed002231",
    "ts": "2026-03-30T09:30"
  },
  {
    "id": "ann-log-075",
    "kind": "paper-claim",
    "body": "Stake: activation-patching is the disambiguating test, not prefix-match alone.",
    "refSha": "",
    "ts": "2026-03-30T03:08",
    "gutter": false
  },
  {
    "id": "ann-log-047",
    "kind": "decision",
    "body": "Defer 6L follow-up to next sprint; current paper is about the 2L picture only.",
    "refSha": "",
    "ts": "2026-03-28T21:42",
    "gutter": false
  },
  {
    "id": "ann-log-017",
    "kind": "followup",
    "body": "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
    "refSha": "",
    "ts": "2026-03-26T19:23",
    "gutter": false
  },
  {
    "id": "ann-log-068",
    "kind": "hypothesis",
    "body": "If we ablate L1H1 alone, the model should lose ICL at the repeated-prefix eval.",
    "refSha": "",
    "ts": "2026-03-26T00:49",
    "gutter": false
  },
  {
    "id": "ann-log-073",
    "kind": "experiment",
    "body": "Step-resolved induction-score: head 1,2 of L1 cross 0.5 at step 60k; L2 heads never do.",
    "refSha": "",
    "ts": "2026-03-25T02:36",
    "gutter": false
  },
  {
    "id": "ann-log-020",
    "kind": "paper-claim",
    "body": "Stake: replication on a different slice and seed lands within noise.",
    "refSha": "",
    "ts": "2026-03-24T23:47",
    "gutter": false
  },
  {
    "id": "ann-log-046",
    "kind": "experiment",
    "body": "Verified Olsson induction-score implementation matches transformer_lens reference.",
    "refSha": "",
    "ts": "2026-03-23T04:52",
    "gutter": false
  },
  {
    "id": "ann-log-036",
    "kind": "followup",
    "body": "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
    "refSha": "",
    "ts": "2026-03-22T04:08",
    "gutter": false
  },
  {
    "id": "ann-log-029",
    "kind": "paper-claim",
    "body": "Stake: width crossover happens between $d=384$ and $d=512$ in our setup.",
    "refSha": "",
    "ts": "2026-03-21T05:25",
    "gutter": false
  },
  {
    "id": "ann-log-035",
    "kind": "rejected",
    "body": "Tried using gradient magnitudes as a poor man's attribution \u2014 non-discriminating.",
    "refSha": "",
    "ts": "2026-03-20T01:21",
    "gutter": false
  },
  {
    "id": "ann-log-040",
    "kind": "followup",
    "body": "Patching at d=1024: does the L0/L1 split survive head-specific perturbations?",
    "refSha": "",
    "ts": "2026-03-17T23:36",
    "gutter": false
  },
  {
    "id": "ann-log-024",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-03-16T21:13",
    "gutter": false
  },
  {
    "id": "ann-log-003",
    "kind": "rejected",
    "body": "Tried using gradient magnitudes as a poor man's attribution \u2014 non-discriminating.",
    "refSha": "",
    "ts": "2026-03-16T18:42",
    "gutter": false
  },
  {
    "id": "ann-log-082",
    "kind": "followup",
    "body": "6L attention-only sweep at d \u2208 {128, 256, 512}, seeds {0,1,2}.",
    "refSha": "",
    "ts": "2026-03-15T18:36",
    "gutter": false
  },
  {
    "id": "ann-log-041",
    "kind": "hypothesis",
    "body": "Could the L1 saturation be eval-batch artifact? Test with three eval batches.",
    "refSha": "",
    "ts": "2026-03-14T04:44",
    "gutter": false
  },
  {
    "id": "ann-log-026",
    "kind": "experiment",
    "body": "Lit-checked Wang et al. 2022 patching to ensure clean/corrupted prompt construction matches IOI.",
    "refSha": "",
    "ts": "2026-03-12T19:52",
    "gutter": false
  },
  {
    "id": "ann-log-087",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-03-12T02:37",
    "gutter": false
  },
  {
    "id": "ann-005",
    "kind": "decision",
    "anchorId": "\u03b5",
    "gutter": true,
    "body": "Need a width sweep to disentangle the two explanations. If L1 saturation is width-dependent, hypothesis (a) is right; if it persists at all widths, (b) is more likely.",
    "refSha": "1a2bc903",
    "ts": "2026-03-10T09:30"
  },
  {
    "id": "ann-log-044",
    "kind": "experiment",
    "body": "Ran a synthetic-token-mix sanity run: prefix-match score behaves as expected on uniformly random tokens.",
    "refSha": "",
    "ts": "2026-03-09T20:30",
    "gutter": false
  },
  {
    "id": "ann-004",
    "kind": "experiment",
    "anchorId": "\u03b4",
    "gutter": true,
    "body": "Activation patching confirms: L1 heads 1,2 are causally necessary (recover 0.71 / 0.62 of logit-diff). L2 head 1 is <b>not</b> (0.04). Some 'induction-looking' L2 heads are decorative.",
    "refSha": "1a2bc903",
    "ts": "2026-03-09T09:30"
  },
  {
    "id": "ann-log-043",
    "kind": "paper-claim",
    "body": "Stake: activation-patching is the disambiguating test, not prefix-match alone.",
    "refSha": "",
    "ts": "2026-03-09T00:41",
    "gutter": false
  },
  {
    "id": "ann-log-061",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-03-05T21:01",
    "gutter": false
  },
  {
    "id": "ann-002",
    "kind": "rejected",
    "anchorId": "\u03b2",
    "gutter": true,
    "body": "Layer-2 hypothesis is wrong at this scale. Prefix-match saturates on <b>layer 1</b>, not 2. Two competing explanations: (a) compression at $d=256$, (b) prefix-match is a copy-suppression proxy.",
    "refSha": "ee21bb01f1c0e7d8",
    "ts": "2026-03-04T09:30"
  },
  {
    "id": "ann-003",
    "kind": "decision",
    "anchorId": "\u03b3",
    "gutter": true,
    "body": "Will not write Section 3 prose until we have a discriminating experiment (activation patching). Currently only the prediction is in the file, marked TODO.",
    "refSha": "9c4a55fa",
    "ts": "2026-03-04T09:30"
  },
  {
    "id": "ann-log-088",
    "kind": "decision",
    "body": "Defer 6L follow-up to next sprint; current paper is about the 2L picture only.",
    "refSha": "",
    "ts": "2026-03-02T01:09",
    "gutter": false
  },
  {
    "id": "ann-log-033",
    "kind": "paper-claim",
    "body": "Stake: McDougall 2023 copy-suppression is a candidate for what L2H1 is actually doing; deferred.",
    "refSha": "",
    "ts": "2026-02-28T04:14",
    "gutter": false
  },
  {
    "id": "ann-log-005",
    "kind": "rejected",
    "body": "Idea: just look at attention pattern in expectation \u2014 not a good test of induction-headedness.",
    "refSha": "",
    "ts": "2026-02-27T19:55",
    "gutter": false
  },
  {
    "id": "ann-log-059",
    "kind": "experiment",
    "body": "Verified Olsson induction-score implementation matches transformer_lens reference.",
    "refSha": "",
    "ts": "2026-02-27T02:33",
    "gutter": false
  },
  {
    "id": "ann-log-058",
    "kind": "followup",
    "body": "What does the analogous picture look like with MLPs added? Need a 2L MLP+attn model.",
    "refSha": "",
    "ts": "2026-02-27T00:15",
    "gutter": false
  },
  {
    "id": "ann-log-067",
    "kind": "rejected",
    "body": "Initial guess that the spike at step 12k was a phase transition \u2014 turned out to be data-loader race.",
    "refSha": "",
    "ts": "2026-02-26T23:15",
    "gutter": false
  },
  {
    "id": "ann-log-037",
    "kind": "hypothesis",
    "body": "Could the L1 saturation be eval-batch artifact? Test with three eval batches.",
    "refSha": "",
    "ts": "2026-02-26T05:12",
    "gutter": false
  },
  {
    "id": "ann-log-072",
    "kind": "hypothesis",
    "body": "Bigger batch \u21d2 smoother induction-score curve? Worth one run.",
    "refSha": "",
    "ts": "2026-02-25T04:01",
    "gutter": false
  },
  {
    "id": "ann-log-076",
    "kind": "paper-claim",
    "body": "Stake: replication on a different slice and seed lands within noise.",
    "refSha": "",
    "ts": "2026-02-23T02:46",
    "gutter": false
  },
  {
    "id": "ann-log-064",
    "kind": "decision",
    "body": "Decided: stick with d=256 as the canonical narrow setting; mention 128 and 384 as bookends.",
    "refSha": "",
    "ts": "2026-02-23T02:36",
    "gutter": false
  },
  {
    "id": "ann-log-001",
    "kind": "followup",
    "body": "Build a tiny benchmark of 'compression vs split' for tiny LMs and release alongside paper.",
    "refSha": "",
    "ts": "2026-02-20T22:38",
    "gutter": false
  },
  {
    "id": "ann-log-089",
    "kind": "rejected",
    "body": "Idea: just look at attention pattern in expectation \u2014 not a good test of induction-headedness.",
    "refSha": "",
    "ts": "2026-02-20T03:55",
    "gutter": false
  },
  {
    "id": "ann-log-030",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-02-19T20:08",
    "gutter": false
  },
  {
    "id": "ann-log-028",
    "kind": "rejected",
    "body": "Briefly considered training on TinyStories instead of OWT \u2014 too narrow, would not generalize.",
    "refSha": "",
    "ts": "2026-02-18T23:01",
    "gutter": false
  },
  {
    "id": "ann-log-009",
    "kind": "decision",
    "body": "Use OpenWebText slice 1 of 8 for all training; slice 2 strictly for replication.",
    "refSha": "",
    "ts": "2026-02-18T22:50",
    "gutter": false
  },
  {
    "id": "ann-log-004",
    "kind": "rejected",
    "body": "Tried using gradient magnitudes as a poor man's attribution \u2014 non-discriminating.",
    "refSha": "",
    "ts": "2026-02-18T21:47",
    "gutter": false
  },
  {
    "id": "ann-log-074",
    "kind": "paper-claim",
    "body": "Stake: we make NO dynamical claim. This is a static observation about head allocation.",
    "refSha": "",
    "ts": "2026-02-18T21:36",
    "gutter": false
  },
  {
    "id": "ann-log-032",
    "kind": "experiment",
    "body": "Ran the patching grid on width=128: same L1 dominance pattern, even sharper.",
    "refSha": "",
    "ts": "2026-02-18T20:35",
    "gutter": false
  },
  {
    "id": "ann-log-050",
    "kind": "hypothesis",
    "body": "If we ablate L1H1 alone, the model should lose ICL at the repeated-prefix eval.",
    "refSha": "",
    "ts": "2026-02-18T19:00",
    "gutter": false
  },
  {
    "id": "ann-log-007",
    "kind": "rejected",
    "body": "Idea: just look at attention pattern in expectation \u2014 not a good test of induction-headedness.",
    "refSha": "",
    "ts": "2026-02-17T03:01",
    "gutter": false
  },
  {
    "id": "ann-log-011",
    "kind": "rejected",
    "body": "Initial guess that the spike at step 12k was a phase transition \u2014 turned out to be data-loader race.",
    "refSha": "",
    "ts": "2026-02-17T02:47",
    "gutter": false
  },
  {
    "id": "ann-log-053",
    "kind": "hypothesis",
    "body": "The L2H1 score might be carrying gradient through a residual stream short-cut.",
    "refSha": "",
    "ts": "2026-02-16T04:41",
    "gutter": false
  },
  {
    "id": "ann-log-070",
    "kind": "followup",
    "body": "Train at fixed compute (token-budget matched); does compression vs split track compute as well as width?",
    "refSha": "",
    "ts": "2026-02-16T00:10",
    "gutter": false
  },
  {
    "id": "ann-log-092",
    "kind": "paper-claim",
    "body": "Stake: $d=384$ is a transition regime \u2014 both layers carry signal.",
    "refSha": "",
    "ts": "2026-02-15T20:33",
    "gutter": false
  },
  {
    "id": "ann-log-063",
    "kind": "paper-claim",
    "body": "Stake: width crossover happens between $d=384$ and $d=512$ in our setup.",
    "refSha": "",
    "ts": "2026-02-15T20:21",
    "gutter": false
  },
  {
    "id": "ann-001",
    "kind": "hypothesis",
    "anchorId": "\u03b1",
    "gutter": true,
    "body": "Induction circuit lives in layer 2; layer 1 is just the previous-token feeder. (Olsson et al. 2022 canonical position.)",
    "refSha": "8f3a1c4e7d3f1011",
    "ts": "2026-02-15T09:30"
  }
];
