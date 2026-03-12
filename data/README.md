# Website Data Assets

## Directory Layout

```
data/
├── frames/
│   └── {task_id}.png          ← initial frame image for each example task
└── videos/
    ├── veo3/
    │   └── {task_id}.mp4
    ├── sora2_pro/
    │   └── {task_id}.mp4
    ├── sora2/
    ├── gen3c/
    ├── hy_worldplay/
    ├── hunyuan15/
    ├── wan22/
    ├── cogvideox/
    ├── genie2/
    │   └── {task_id}.mp4
    └── lingbot/
        └── {task_id}.mp4  ← uses baseId (no occlusion suffix)
```

## Naming Convention

`task_id` matches the `id` field in the benchmark YAML files (e.g. `alka_seltzer_fizz_cardboard`).

Initial frames are copied from:
  `StEvo-Bench/benchmark/tasks/{split}/{task_id}/{task_id}_init_frame.png`
  → rename to `{task_id}.png` and drop in `data/frames/`

Generated videos follow the same naming as the evaluation pipeline output:
  `outputs/{model}_{run}/task_id.mp4`
  → rename to `{task_id}.mp4` and drop in `data/videos/{model_slug}/`

## Model Slug → Display Name Mapping

| Folder         | Model Name          | Org               |
|----------------|---------------------|-------------------|
| `veo3`         | Veo 3               | Google DeepMind   |
| `sora2_pro`    | Sora 2 Pro          | OpenAI            |
| `sora2`        | Sora 2              | OpenAI            |
| `gen3c`        | Gen-3C              | Runway            |
| `hy_worldplay` | HY-WorldPlay        | Tencent           |
| `hunyuan15`    | HunyuanVideo 1.5    | Tencent           |
| `wan22`        | WAN 2.2             | Alibaba           |
| `cogvideox`    | CogVideoX           | Zhipu AI          |
| `genie2`       | Genie 2             | Google DeepMind   |
| `lingbot`      | Lingbot World       | Lingbot           |

## Adding a New Example Task

1. Copy the initial frame:
   `benchmark/tasks/{split}/{task_id}/{task_id}_init_frame.png` → `data/frames/{task_id}.png`
2. Drop each model's video into `data/videos/{model_slug}/{task_id}.mp4`
3. Add an entry to `js/content/examples.js`
