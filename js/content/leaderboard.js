/**
 * Leaderboard content.
 *
 * To add a model: append an entry to LEADERBOARD.
 * Scores are percentages (0–100).
 *
 * Metric keys:
 *   stateProgress        – State Progress (primary metric)
 *   physicalPlausibility – Physical Plausibility
 *   coherence            – Coherence
 *   observationControl   – Observation Control
 *   actionControl        – Action Control
 */

export const LEVELS = [
  { id: "L0", label: "L0", name: "Continuous Evolution",              pct: 26.7, color: "#B5522A" },
  { id: "L1", label: "L1", name: "Kinematics",                        pct: 16.3, color: "#6A4E9E" },
  { id: "L2", label: "L2", name: "Relational Change",                 pct: 16.3, color: "#7CB85A" },
  { id: "L3", label: "L3", name: "State Transformation",              pct: 17.4, color: "#C4A0CC" },
  { id: "L4", label: "L4", name: "Causal Change",                     pct: 12.8, color: "#8EC0D0" },
  { id: "L5", label: "L5", name: "Expected Human & Animal Behavior",  pct: 10.5, color: "#EAC840" },
];

export const LEADERBOARD = [
  {
    model: "Veo 3",
    slug: "veo3",
    org: "Google DeepMind",
    date: "2025-06",
    stateProgress: 17.4,
    physicalPlausibility: 82.6,
    coherence: 66.5,
    observationControl: 81.6,
    actionControl: 88,
  },
  {
    model: "Sora 2 Pro",
    slug: "sora2_pro",
    org: "OpenAI",
    date: "2025-05",
    stateProgress: 13.1,
    physicalPlausibility: 85.5,
    coherence: 69.7,
    observationControl: 69.4,
    actionControl: 80.4,
  },
  {
    model: "Gen-3C",
    slug: "gen3c",
    cameraControlled: true,
    org: "NVIDIA",
    date: "2025-04",
    stateProgress: 0,
    physicalPlausibility: 30.6,
    coherence: 82.4,
    observationControl: 90.6,
    actionControl: 57.6,
  },
  {
    model: "HY-WorldPlay",
    slug: "hy_worldplay",
    cameraControlled: true,
    org: "Tencent",
    date: "2025-04",
    stateProgress: 0,
    physicalPlausibility: 72.2,
    coherence: 88.2,
    observationControl: 55.4,
    actionControl: 64.9,
  },
  {
    model: "HunyuanVideo 1.5",
    slug: "hunyuan15",
    org: "Tencent",
    date: "2025-03",
    stateProgress: 4.1,
    physicalPlausibility: 42.1,
    coherence: 59.1,
    observationControl: 31.2,
    actionControl: 81,
  },
  {
    model: "WAN 2.2",
    slug: "wan22",
    org: "Alibaba",
    date: "2025-03",
    stateProgress: 7.7,
    physicalPlausibility: 52,
    coherence: 58.4,
    observationControl: 46.2,
    actionControl: 76.5,
  },
  {
    model: "CogVideoX",
    slug: "cogvideox",
    org: "Zhipu AI",
    date: "2025-02",
    stateProgress: 1.4,
    physicalPlausibility: 68.5,
    coherence: 67.1,
    observationControl: 22.2,
    actionControl: 75.5,
  },
  {
    model: "Genie 3",
    slug: "genie3",
    cameraControlled: true,
    org: "Google DeepMind",
    date: "2025-01",
    stateProgress: 2.9,
    physicalPlausibility: 15.2,
    coherence: 27.3,
    observationControl: 84.7,
    actionControl: 78.6,
  },
  {
    model: "Lingbot World",
    slug: "lingbot",
    cameraControlled: true,
    org: "Lingbot",
    date: "2025-02",
    stateProgress: 3.4,
    physicalPlausibility: 40.7,
    coherence: 76.3,
    observationControl: 35.6,
    actionControl: 67.8,
  },
];
