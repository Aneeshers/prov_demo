window.RUNS = [
  {
    "id": "f3a1-sanity-1",
    "name": "sanity-1",
    "configDelta": "width=128 (smoke test, steps=2000)",
    "finalLoss": 3.42,
    "finalInduction": 0.04,
    "status": "finished",
    "started": "2026-02-14T10:30",
    "summary": {
      "step": 2000,
      "loss": 3.42
    },
    "sparklines": []
  },
  {
    "id": "f3a1-sanity-2",
    "name": "sanity-2",
    "configDelta": "+ wandb logging hooks",
    "finalLoss": 3.39,
    "finalInduction": 0.04,
    "status": "finished",
    "started": "2026-02-14T11:30",
    "summary": {
      "step": 2000,
      "loss": 3.39
    },
    "sparklines": []
  },
  {
    "id": "f3a1-baseline-s0",
    "name": "baseline-s0",
    "configDelta": "+ steps=200_000",
    "finalLoss": 0.31,
    "finalInduction": 0.82,
    "status": "finished",
    "started": "2026-02-18T19:30",
    "duration": "1h12m",
    "summary": {
      "step": 200000,
      "loss": 0.31,
      "induction": 0.82,
      "best_layer": 1,
      "best_head": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          5.1,
          3.8,
          2.4,
          1.6,
          1.0,
          0.6,
          0.42,
          0.34,
          0.31
        ]
      },
      {
        "name": "induction",
        "values": [
          0.04,
          0.04,
          0.05,
          0.07,
          0.18,
          0.45,
          0.68,
          0.78,
          0.81,
          0.82
        ]
      }
    ],
    "artifacts": [
      "p-head-pm-converged",
      "p-attn-pattern-l1h1"
    ]
  },
  {
    "id": "f3a1-baseline-s1",
    "name": "baseline-s1",
    "configDelta": "seed=1",
    "finalLoss": 0.33,
    "finalInduction": 0.79,
    "status": "finished",
    "started": "2026-02-19T17:30",
    "duration": "1h09m",
    "summary": {
      "step": 200000,
      "loss": 0.33,
      "induction": 0.79
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          5.0,
          3.6,
          2.2,
          1.3,
          0.9,
          0.6,
          0.42,
          0.36,
          0.33
        ]
      }
    ]
  },
  {
    "id": "f3a1-baseline-s2",
    "name": "baseline-s2",
    "configDelta": "seed=2",
    "finalLoss": 0.32,
    "finalInduction": 0.81,
    "status": "finished",
    "started": "2026-02-19T20:30",
    "duration": "1h10m",
    "summary": {
      "step": 200000,
      "loss": 0.32,
      "induction": 0.81
    },
    "sparklines": []
  },
  {
    "id": "f3a1-pm-s0",
    "name": "pm-eval-s0",
    "configDelta": "+ probe.k=128",
    "finalLoss": null,
    "finalInduction": 0.82,
    "status": "finished",
    "started": "2026-02-28T09:30",
    "summary": {
      "L1H1": 0.82,
      "L1H2": 0.79,
      "L2H1": 0.3
    }
  },
  {
    "id": "f3a1-pm-s1",
    "name": "pm-eval-s1",
    "configDelta": "seed=1, probe.k=128",
    "finalLoss": null,
    "finalInduction": 0.79,
    "status": "finished",
    "started": "2026-02-28T11:30",
    "summary": {
      "L1H1": 0.79,
      "L1H2": 0.76
    }
  },
  {
    "id": "c7e9-patch-clean",
    "name": "patch-clean",
    "configDelta": "+ probe.task=activation_patching, mode=clean",
    "finalLoss": null,
    "finalInduction": 0.71,
    "status": "finished",
    "started": "2026-03-08T09:30",
    "duration": "0h08m",
    "summary": {
      "recovery_L1H1": 0.71,
      "recovery_L1H2": 0.62,
      "recovery_L2H1": 0.04
    },
    "sparklines": [],
    "artifacts": [
      "p-causal-effect-bars"
    ]
  },
  {
    "id": "c7e9-patch-corrupt",
    "name": "patch-corrupt",
    "configDelta": "mode=corrupted",
    "finalLoss": null,
    "finalInduction": null,
    "status": "finished",
    "started": "2026-03-08T10:30"
  },
  {
    "id": "c7e9-patch-misconfig",
    "name": "patch-misconfig",
    "configDelta": "(shuffle bug \u2014 all heads \u2248 0)",
    "finalLoss": null,
    "finalInduction": 0.02,
    "status": "finished",
    "started": "2026-03-09T09:30"
  },
  {
    "id": "c7e9-patch-fixed",
    "name": "patch-fixed",
    "configDelta": "+ shuffle fix",
    "finalLoss": null,
    "finalInduction": 0.71,
    "status": "finished",
    "started": "2026-03-10T21:30"
  },
  {
    "id": "c7e9-recover-1",
    "name": "patch-recovery-grid",
    "configDelta": "per-(layer, head) recovery grid",
    "finalLoss": null,
    "finalInduction": 0.71,
    "status": "finished",
    "started": "2026-03-11T09:30"
  },
  {
    "id": "sweep-w128-s0",
    "name": "sweep-w128-s0",
    "configDelta": "width=128, seed=0",
    "finalLoss": 0.438,
    "finalInduction": 0.841,
    "status": "finished",
    "started": "2026-03-23T23:30",
    "duration": "34m",
    "summary": {
      "step": 200000,
      "loss": 0.438,
      "induction": 0.841,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.957333333333334,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.48,
          0.44
        ]
      }
    ],
    "artifacts": [
      "p-loss-w128",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w128-s1",
    "name": "sweep-w128-s1",
    "configDelta": "width=128, seed=1",
    "finalLoss": 0.447,
    "finalInduction": 0.803,
    "status": "finished",
    "started": "2026-03-24T02:30",
    "duration": "34m",
    "summary": {
      "step": 200000,
      "loss": 0.447,
      "induction": 0.803,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.957333333333334,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.49,
          0.45
        ]
      }
    ],
    "artifacts": [
      "p-loss-w128",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w128-s2",
    "name": "sweep-w128-s2",
    "configDelta": "width=128, seed=2",
    "finalLoss": 0.437,
    "finalInduction": 0.833,
    "status": "finished",
    "started": "2026-03-24T05:30",
    "duration": "34m",
    "summary": {
      "step": 200000,
      "loss": 0.437,
      "induction": 0.833,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.957333333333334,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.48,
          0.44
        ]
      }
    ],
    "artifacts": [
      "p-loss-w128",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w256-s0",
    "name": "sweep-w256-s0",
    "configDelta": "width=256, seed=0",
    "finalLoss": 0.326,
    "finalInduction": 0.834,
    "status": "finished",
    "started": "2026-03-24T11:30",
    "duration": "38m",
    "summary": {
      "step": 200000,
      "loss": 0.326,
      "induction": 0.834,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.914666666666666,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.37,
          0.33
        ]
      }
    ],
    "artifacts": [
      "p-loss-w256",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w256-s1",
    "name": "sweep-w256-s1",
    "configDelta": "width=256, seed=1",
    "finalLoss": 0.315,
    "finalInduction": 0.824,
    "status": "finished",
    "started": "2026-03-24T14:30",
    "duration": "38m",
    "summary": {
      "step": 200000,
      "loss": 0.315,
      "induction": 0.824,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.914666666666666,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.36,
          0.32
        ]
      }
    ],
    "artifacts": [
      "p-loss-w256",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w256-s2",
    "name": "sweep-w256-s2",
    "configDelta": "width=256, seed=2",
    "finalLoss": 0.326,
    "finalInduction": 0.797,
    "status": "finished",
    "started": "2026-03-24T17:30",
    "duration": "38m",
    "summary": {
      "step": 200000,
      "loss": 0.326,
      "induction": 0.797,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.914666666666666,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.37,
          0.33
        ]
      }
    ],
    "artifacts": [
      "p-loss-w256",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w384-s0",
    "name": "sweep-w384-s0",
    "configDelta": "width=384, seed=0",
    "finalLoss": 0.284,
    "finalInduction": 0.63,
    "status": "finished",
    "started": "2026-03-24T23:30",
    "duration": "42m",
    "summary": {
      "step": 200000,
      "loss": 0.284,
      "induction": 0.63,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.872,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.32,
          0.28
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w384-s1",
    "name": "sweep-w384-s1",
    "configDelta": "width=384, seed=1",
    "finalLoss": 0.279,
    "finalInduction": 0.599,
    "status": "finished",
    "started": "2026-03-25T02:30",
    "duration": "42m",
    "summary": {
      "step": 200000,
      "loss": 0.279,
      "induction": 0.599,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.872,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.32,
          0.28
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w384-s2",
    "name": "sweep-w384-s2",
    "configDelta": "width=384, seed=2",
    "finalLoss": 0.291,
    "finalInduction": 0.604,
    "status": "finished",
    "started": "2026-03-25T05:30",
    "duration": "42m",
    "summary": {
      "step": 200000,
      "loss": 0.291,
      "induction": 0.604,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.872,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.33,
          0.29
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w512-s0",
    "name": "sweep-w512-s0",
    "configDelta": "width=512, seed=0",
    "finalLoss": 0.26,
    "finalInduction": 0.796,
    "status": "finished",
    "started": "2026-03-25T11:30",
    "duration": "46m",
    "summary": {
      "step": 200000,
      "loss": 0.26,
      "induction": 0.796,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.8293333333333335,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.3,
          0.26
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w512-s1",
    "name": "sweep-w512-s1",
    "configDelta": "width=512, seed=1",
    "finalLoss": 0.252,
    "finalInduction": 0.745,
    "status": "finished",
    "started": "2026-03-25T14:30",
    "duration": "46m",
    "summary": {
      "step": 200000,
      "loss": 0.252,
      "induction": 0.745,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.8293333333333335,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.29,
          0.25
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w512-s2",
    "name": "sweep-w512-s2",
    "configDelta": "width=512, seed=2",
    "finalLoss": 0.273,
    "finalInduction": 0.804,
    "status": "finished",
    "started": "2026-03-25T17:30",
    "duration": "46m",
    "summary": {
      "step": 200000,
      "loss": 0.273,
      "induction": 0.804,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.8293333333333335,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.31,
          0.27
        ]
      }
    ],
    "artifacts": [
      "p-width-5panel",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w1024-s0",
    "name": "sweep-w1024-s0",
    "configDelta": "width=1024, seed=0",
    "finalLoss": 0.257,
    "finalInduction": 0.748,
    "status": "finished",
    "started": "2026-03-27T11:30",
    "duration": "62m",
    "summary": {
      "step": 200000,
      "loss": 0.257,
      "induction": 0.748,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.658666666666667,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.3,
          0.26
        ]
      }
    ],
    "artifacts": [
      "p-loss-w1024",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w1024-s1",
    "name": "sweep-w1024-s1",
    "configDelta": "width=1024, seed=1",
    "finalLoss": 0.262,
    "finalInduction": 0.806,
    "status": "finished",
    "started": "2026-03-27T14:30",
    "duration": "62m",
    "summary": {
      "step": 200000,
      "loss": 0.262,
      "induction": 0.806,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.658666666666667,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.3,
          0.26
        ]
      }
    ],
    "artifacts": [
      "p-loss-w1024",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w1024-s2",
    "name": "sweep-w1024-s2",
    "configDelta": "width=1024, seed=2",
    "finalLoss": 0.232,
    "finalInduction": 0.763,
    "status": "finished",
    "started": "2026-03-27T17:30",
    "duration": "62m",
    "summary": {
      "step": 200000,
      "loss": 0.232,
      "induction": 0.763,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          4.658666666666667,
          3.6,
          2.2,
          1.4,
          0.9,
          0.6,
          0.42,
          0.27,
          0.23
        ]
      }
    ],
    "artifacts": [
      "p-loss-w1024",
      "p-width-5panel"
    ]
  },
  {
    "id": "sweep-w256-ablate",
    "name": "sweep-w256-ablate",
    "configDelta": "+ probe.zero_ablate_all_heads",
    "finalLoss": null,
    "finalInduction": 0.04,
    "status": "crashed",
    "started": "2026-03-24T23:30",
    "summary": {
      "crash": "IndexError in head_ablation.py:47"
    }
  },
  {
    "id": "paper-fig-regen-headline",
    "name": "paper-fig-regen-headline",
    "configDelta": "+ paper-quality dpi=300",
    "finalLoss": null,
    "finalInduction": null,
    "status": "finished",
    "started": "2026-04-18T09:30"
  },
  {
    "id": "paper-fig-regen-crossover",
    "name": "paper-fig-regen-crossover",
    "configDelta": "+ paper-quality dpi=300",
    "finalLoss": null,
    "finalInduction": null,
    "status": "finished",
    "started": "2026-04-19T09:30"
  },
  {
    "id": "paper-fig-regen-bars",
    "name": "paper-fig-regen-bars",
    "configDelta": "+ paper-quality dpi=300",
    "finalLoss": null,
    "finalInduction": null,
    "status": "finished",
    "started": "2026-04-18T09:30"
  },
  {
    "id": "replicate-w256-s42",
    "name": "replicate-w256-s42",
    "configDelta": "width=256, seed=42, slice=2/8",
    "finalLoss": 0.34,
    "finalInduction": 0.8,
    "status": "finished",
    "started": "2026-05-03T19:30",
    "duration": "1h11m",
    "summary": {
      "step": 200000,
      "loss": 0.34,
      "induction": 0.8,
      "best_layer": 1
    },
    "sparklines": [
      {
        "name": "loss",
        "values": [
          6.5,
          5.1,
          3.5,
          2.1,
          1.4,
          0.9,
          0.6,
          0.45,
          0.37,
          0.34
        ]
      }
    ],
    "artifacts": [
      "p-replication-scatter"
    ]
  },
  {
    "id": "replicate-w256-s42-slice3",
    "name": "replicate-w256-s42-slice3",
    "configDelta": "+ data_slice=3 (sanity)",
    "finalLoss": 0.33,
    "finalInduction": 0.81,
    "status": "finished",
    "started": "2026-05-04T17:30"
  },
  {
    "id": "next-6L-w128-s0-pending",
    "name": "6L-attn-only-w128-s0",
    "configDelta": "n_layers=6, width=128, seed=0",
    "finalLoss": null,
    "finalInduction": null,
    "status": "running",
    "started": "2026-05-07T19:30"
  },
  {
    "id": "next-6L-w256-s0-pending",
    "name": "6L-attn-only-w256-s0",
    "configDelta": "n_layers=6, width=256, seed=0",
    "finalLoss": null,
    "finalInduction": null,
    "status": "running",
    "started": "2026-05-07T20:30"
  },
  {
    "id": "18f7-data-mix-sanity-63",
    "name": "data-mix-sanity-26",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.945,
    "finalInduction": 0.728,
    "status": "finished",
    "started": "2026-02-22T04:52",
    "duration": "34m"
  },
  {
    "id": "72cc-attn-only-fwd-sanity-54",
    "name": "attn-only-fwd-sanity-5",
    "configDelta": "+ data_slice=5 of 8",
    "finalLoss": 0.799,
    "finalInduction": 0.34,
    "status": "finished",
    "started": "2026-03-06T01:11",
    "duration": "64m"
  },
  {
    "id": "9591-wd-search-57",
    "name": "wd-search-67",
    "configDelta": "+ data_slice=5 of 8",
    "finalLoss": 0.29,
    "finalInduction": 0.688,
    "status": "finished",
    "started": "2026-02-27T18:58",
    "duration": "41m"
  },
  {
    "id": "e9db-wd-search-86",
    "name": "wd-search-81",
    "configDelta": "+ warmup_steps=4000",
    "finalLoss": null,
    "finalInduction": null,
    "status": "crashed",
    "started": "2026-04-25T23:36",
    "duration": "82m"
  },
  {
    "id": "5864-olsson-replication-53",
    "name": "olsson-replication-35",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.984,
    "finalInduction": 0.725,
    "status": "finished",
    "started": "2026-05-06T22:59",
    "duration": "23m"
  },
  {
    "id": "5c72-lr-search-99",
    "name": "lr-search-66",
    "configDelta": "+ batch_size=128",
    "finalLoss": 0.771,
    "finalInduction": 0.615,
    "status": "finished",
    "started": "2026-04-19T00:08",
    "duration": "3m"
  },
  {
    "id": "99cf-probe-pm-eval-94",
    "name": "probe-pm-eval-28",
    "configDelta": "+ batch_size=128",
    "finalLoss": 0.341,
    "finalInduction": 0.546,
    "status": "finished",
    "started": "2026-04-08T01:56",
    "duration": "27m"
  },
  {
    "id": "816a-lr-search-38",
    "name": "lr-search-58",
    "configDelta": "+ data_slice=1 of 8",
    "finalLoss": 0.598,
    "finalInduction": 0.41,
    "status": "finished",
    "started": "2026-03-27T01:50",
    "duration": "69m"
  },
  {
    "id": "9ae6-patch-clean-63",
    "name": "patch-clean-57",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.508,
    "finalInduction": 0.338,
    "status": "finished",
    "started": "2026-05-08T00:43",
    "duration": "29m"
  },
  {
    "id": "b8c9-olsson-replication-73",
    "name": "olsson-replication-40",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 1.176,
    "finalInduction": 0.223,
    "status": "finished",
    "started": "2026-05-06T01:16",
    "duration": "14m"
  },
  {
    "id": "47f4-wd-search-96",
    "name": "wd-search-62",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.535,
    "finalInduction": 0.25,
    "status": "finished",
    "started": "2026-04-30T03:43",
    "duration": "54m"
  },
  {
    "id": "e027-init-scale-79",
    "name": "init-scale-51",
    "configDelta": "width=1024, seed=72",
    "finalLoss": 0.998,
    "finalInduction": 0.368,
    "status": "finished",
    "started": "2026-05-01T21:24",
    "duration": "79m"
  },
  {
    "id": "5d11-probe-pm-eval-91",
    "name": "probe-pm-eval-61",
    "configDelta": "+ data_slice=7 of 8",
    "finalLoss": 1.068,
    "finalInduction": 0.791,
    "status": "finished",
    "started": "2026-05-03T00:26",
    "duration": "4m"
  },
  {
    "id": "e06f-logit-diff-debug-51",
    "name": "logit-diff-debug-38",
    "configDelta": "+ probe.k=32",
    "finalLoss": 0.545,
    "finalInduction": 0.565,
    "status": "finished",
    "started": "2026-03-25T23:02",
    "duration": "65m"
  },
  {
    "id": "a888-lr-search-27",
    "name": "lr-search-92",
    "configDelta": "+ batch_size=16",
    "finalLoss": 0.554,
    "finalInduction": 0.224,
    "status": "finished",
    "started": "2026-02-16T18:04",
    "duration": "48m"
  },
  {
    "id": "a43c-attn-only-fwd-sanity-57",
    "name": "attn-only-fwd-sanity-78",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.542,
    "finalInduction": 0.639,
    "status": "finished",
    "started": "2026-04-09T18:06",
    "duration": "43m"
  },
  {
    "id": "3c68-init-scale-92",
    "name": "init-scale-75",
    "configDelta": "+ probe.k=128",
    "finalLoss": 0.875,
    "finalInduction": 0.524,
    "status": "finished",
    "started": "2026-04-24T04:16",
    "duration": "51m"
  },
  {
    "id": "85ef-patch-corrupt-56",
    "name": "patch-corrupt-73",
    "configDelta": "+ probe.k=64",
    "finalLoss": 0.324,
    "finalInduction": 0.241,
    "status": "finished",
    "started": "2026-03-29T21:05",
    "duration": "63m"
  },
  {
    "id": "0d25-probe-pm-eval-39",
    "name": "probe-pm-eval-43",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.716,
    "finalInduction": 0.616,
    "status": "finished",
    "started": "2026-04-20T22:55",
    "duration": "30m"
  },
  {
    "id": "564e-patch-corrupt-88",
    "name": "patch-corrupt-28",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.414,
    "finalInduction": 0.467,
    "status": "finished",
    "started": "2026-05-06T04:48",
    "duration": "55m"
  },
  {
    "id": "3089-attn-only-fwd-sanity-44",
    "name": "attn-only-fwd-sanity-66",
    "configDelta": "width=256, seed=38",
    "finalLoss": 0.957,
    "finalInduction": 0.512,
    "status": "finished",
    "started": "2026-02-22T04:50",
    "duration": "49m"
  },
  {
    "id": "7a4e-probe-pm-eval-60",
    "name": "probe-pm-eval-41",
    "configDelta": "+ batch_size=64",
    "finalLoss": 0.852,
    "finalInduction": 0.299,
    "status": "finished",
    "started": "2026-03-16T18:54",
    "duration": "7m"
  },
  {
    "id": "8d64-wd-search-36",
    "name": "wd-search-93",
    "configDelta": "+ probe.k=32",
    "finalLoss": 0.55,
    "finalInduction": 0.218,
    "status": "finished",
    "started": "2026-03-05T23:04",
    "duration": "9m"
  },
  {
    "id": "aea5-patch-corrupt-74",
    "name": "patch-corrupt-66",
    "configDelta": "+ probe.k=192",
    "finalLoss": 0.459,
    "finalInduction": 0.42,
    "status": "finished",
    "started": "2026-04-02T02:51",
    "duration": "62m"
  },
  {
    "id": "2dab-wd-search-98",
    "name": "wd-search-91",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.73,
    "finalInduction": 0.562,
    "status": "finished",
    "started": "2026-02-16T17:41",
    "duration": "7m"
  },
  {
    "id": "a2a4-fig-regen-57",
    "name": "fig-regen-77",
    "configDelta": "+ data_slice=4 of 8",
    "finalLoss": 0.602,
    "finalInduction": 0.511,
    "status": "finished",
    "started": "2026-02-16T02:22",
    "duration": "87m"
  },
  {
    "id": "2864-patch-corrupt-26",
    "name": "patch-corrupt-66",
    "configDelta": "width=512, seed=86",
    "finalLoss": 1.192,
    "finalInduction": 0.7,
    "status": "finished",
    "started": "2026-04-13T20:23",
    "duration": "61m"
  },
  {
    "id": "bb75-warmup-len-64",
    "name": "warmup-len-5",
    "configDelta": "+ probe.k=32",
    "finalLoss": 1.042,
    "finalInduction": 0.685,
    "status": "finished",
    "started": "2026-04-09T20:23",
    "duration": "83m"
  },
  {
    "id": "ed62-olsson-replication-82",
    "name": "olsson-replication-16",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.726,
    "finalInduction": 0.513,
    "status": "finished",
    "started": "2026-05-01T17:43",
    "duration": "19m"
  },
  {
    "id": "2ea3-head-ablate-84",
    "name": "head-ablate-62",
    "configDelta": "width=256, seed=87",
    "finalLoss": 0.942,
    "finalInduction": 0.354,
    "status": "finished",
    "started": "2026-02-17T20:36",
    "duration": "24m"
  },
  {
    "id": "ce00-patch-clean-64",
    "name": "patch-clean-42",
    "configDelta": "+ data_slice=4 of 8",
    "finalLoss": 0.954,
    "finalInduction": 0.26,
    "status": "finished",
    "started": "2026-03-25T00:38",
    "duration": "38m"
  },
  {
    "id": "96ef-wd-search-14",
    "name": "wd-search-9",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.855,
    "finalInduction": 0.443,
    "status": "finished",
    "started": "2026-05-05T04:57",
    "duration": "63m"
  },
  {
    "id": "e69c-training-resume-54",
    "name": "training-resume-77",
    "configDelta": "+ data_slice=3 of 8",
    "finalLoss": 0.761,
    "finalInduction": 0.594,
    "status": "finished",
    "started": "2026-02-18T00:07",
    "duration": "77m"
  },
  {
    "id": "3d92-lr-search-35",
    "name": "lr-search-33",
    "configDelta": "+ data_slice=2 of 8",
    "finalLoss": null,
    "finalInduction": null,
    "status": "running",
    "started": "2026-03-18T00:03",
    "duration": "45m"
  },
  {
    "id": "1597-eval-batch-size-38",
    "name": "eval-batch-size-52",
    "configDelta": "+ lr=0.0001",
    "finalLoss": 0.654,
    "finalInduction": 0.751,
    "status": "finished",
    "started": "2026-04-30T01:17",
    "duration": "14m"
  },
  {
    "id": "cfd4-fig-regen-62",
    "name": "fig-regen-90",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.499,
    "finalInduction": 0.396,
    "status": "finished",
    "started": "2026-04-15T03:59",
    "duration": "45m"
  },
  {
    "id": "c16d-head-ablate-78",
    "name": "head-ablate-17",
    "configDelta": "+ batch_size=64",
    "finalLoss": 0.547,
    "finalInduction": 0.709,
    "status": "finished",
    "started": "2026-03-07T00:55",
    "duration": "14m"
  },
  {
    "id": "dc96-init-scale-44",
    "name": "init-scale-84",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.557,
    "finalInduction": 0.514,
    "status": "finished",
    "started": "2026-02-28T22:04",
    "duration": "41m"
  },
  {
    "id": "5080-lr-search-27",
    "name": "lr-search-32",
    "configDelta": "+ lr=0.0005",
    "finalLoss": 0.439,
    "finalInduction": 0.373,
    "status": "finished",
    "started": "2026-04-06T04:12",
    "duration": "84m"
  },
  {
    "id": "9d85-logit-diff-debug-69",
    "name": "logit-diff-debug-42",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.966,
    "finalInduction": 0.675,
    "status": "finished",
    "started": "2026-03-01T20:09",
    "duration": "23m"
  },
  {
    "id": "2ad8-logit-diff-debug-30",
    "name": "logit-diff-debug-96",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 0.24,
    "finalInduction": 0.28,
    "status": "finished",
    "started": "2026-02-19T22:40",
    "duration": "14m"
  },
  {
    "id": "fe6f-checkpoint-spot-61",
    "name": "checkpoint-spot-46",
    "configDelta": "+ warmup_steps=4000",
    "finalLoss": 1.014,
    "finalInduction": 0.54,
    "status": "finished",
    "started": "2026-03-16T00:09",
    "duration": "89m"
  },
  {
    "id": "aed0-olsson-replication-25",
    "name": "olsson-replication-21",
    "configDelta": "+ batch_size=16",
    "finalLoss": 0.87,
    "finalInduction": 0.372,
    "status": "finished",
    "started": "2026-04-16T23:30",
    "duration": "38m"
  },
  {
    "id": "826c-fig-regen-42",
    "name": "fig-regen-86",
    "configDelta": "+ lr=0.0005",
    "finalLoss": 0.872,
    "finalInduction": 0.507,
    "status": "finished",
    "started": "2026-03-10T02:36",
    "duration": "65m"
  },
  {
    "id": "58a7-attn-only-fwd-sanity-7",
    "name": "attn-only-fwd-sanity-10",
    "configDelta": "width=384, seed=86",
    "finalLoss": 0.626,
    "finalInduction": 0.764,
    "status": "finished",
    "started": "2026-03-13T03:08",
    "duration": "51m"
  },
  {
    "id": "0fa3-data-mix-sanity-95",
    "name": "data-mix-sanity-96",
    "configDelta": "width=128, seed=40",
    "finalLoss": 0.963,
    "finalInduction": 0.376,
    "status": "finished",
    "started": "2026-04-14T03:40",
    "duration": "26m"
  },
  {
    "id": "6392-patch-clean-13",
    "name": "patch-clean-88",
    "configDelta": "width=256, seed=0",
    "finalLoss": 0.801,
    "finalInduction": 0.691,
    "status": "finished",
    "started": "2026-03-17T01:34",
    "duration": "78m"
  },
  {
    "id": "1cf2-head-ablate-2",
    "name": "head-ablate-36",
    "configDelta": "width=512, seed=92",
    "finalLoss": 1.195,
    "finalInduction": 0.416,
    "status": "finished",
    "started": "2026-02-19T04:45",
    "duration": "4m"
  },
  {
    "id": "8a49-training-resume-61",
    "name": "training-resume-37",
    "configDelta": "+ lr=0.001",
    "finalLoss": null,
    "finalInduction": null,
    "status": "killed",
    "started": "2026-04-25T03:14",
    "duration": "42m"
  },
  {
    "id": "a929-data-mix-sanity-57",
    "name": "data-mix-sanity-54",
    "configDelta": "+ init_scale=0.02",
    "finalLoss": 0.485,
    "finalInduction": 0.432,
    "status": "finished",
    "started": "2026-03-15T20:28",
    "duration": "69m"
  },
  {
    "id": "ec38-eval-batch-size-73",
    "name": "eval-batch-size-3",
    "configDelta": "+ n_heads=8 (sanity)",
    "finalLoss": 1.153,
    "finalInduction": 0.459,
    "status": "finished",
    "started": "2026-04-27T22:01",
    "duration": "21m"
  },
  {
    "id": "ce50-head-ablate-56",
    "name": "head-ablate-52",
    "configDelta": "+ data_slice=6 of 8",
    "finalLoss": 0.929,
    "finalInduction": 0.467,
    "status": "finished",
    "started": "2026-03-24T02:17",
    "duration": "73m"
  }
];
