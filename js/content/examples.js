/**
 * Example tasks for the "Example Tasks & Videos" section on the Overview page.
 *
 * Each entry corresponds to one benchmark task. Files are stored under:
 *
 *   data/frames/{id}.png              — initial frame image
 *   data/videos/{model_slug}/{id}.mp4        — standard occlusion models
 *   data/videos/{model_slug}/{baseId}.mp4   — camera-controlled models (no occlusion suffix)
 *
 * To add a task: append an entry below.
 * To add a model's videos: drop the .mp4 into the matching data/videos/{slug}/ folder.
 *
 * `level`    — benchmark level (0–5)
 * `category` — human-readable category label
 * `prompt`   — the video_WM prompt shown to the model
 * `baseId`   — task name without the occlusion suffix; used as the filename for camera-controlled models
 *
 * Per-video binary criteria are stored in VIDEO_CRITERIA below.
 * Structure: { [task_id]: { [model_slug]: { [criterion_key]: boolean } } }
 * Criterion keys: stateProgress, physicalPlausibility, coherence, observationControl, actionControl
 */

export const EXAMPLE_TASKS = [
  {
    id: "alka_seltzer_fizz_cardboard",
    baseId: "alka_seltzer_fizz",
    title: "Alka-Seltzer Fizz",
    level: 1,
    category: "Scalar State",
    prompt:
      "The room lights switch off, leaving the cup in complete darkness and completely invisible for a prolonged duration. After a pause, the lights turn back on. The camera remains stationary; no scene cuts; no new people or objects enter the scene. Smooth, continuous evolution with only objects present in the initial scene.",
  },
  {
    id: "fuse_burn_curtain",
    baseId: "fuse_burn",
    title: "Fuse Burn",
    level: 1,
    category: "Scalar State",
    prompt:
      "A heavy curtain drops from the ceiling between the camera and the fuse, completely blocking the fuse from view, without touching or interacting with any object in the scene, for a prolonged duration. After a pause, the curtain rises. The camera remains stationary; no scene cuts; no new people or objects enter the scene. Smooth, continuous evolution with only objects present in the initial scene."
  },
  {
    id: "ball_roll_down_curtain",
    baseId: "ball_roll_down",
    title: "Ball Roll Down Ramp",
    level: 2,
    category: "Spatial State",
    prompt:
      "A piece of cardboard is held up in front of the camera view, completely blocking the ball from view, without touching or interacting with any object in the scene, for a prolonged duration. After a pause, the cardboard is lowered. The camera remains stationary; no scene cuts; no new people or objects enter the scene. Smooth, continuous evolution with only objects present in the initial scene.",
  },
  {
    id: "billiard_break_lightoff",
    baseId: "billiard_break",
    title: "Billiard Break",
    level: 3,
    category: "relational_state",
    prompt:
      "The robot strikes the cue ball with a pool cue, sending it toward the rack of balls; while the cue ball rolls, the lights turn off, leaving the room in complete darkness and the billiard balls completely invisible for a prolonged duration. After a pause, the lights turn back on. The camera remains stationary; no scene cuts; no new people or objects enter the scene. Smooth, continuous evolution with only objects present in the initial scene."
  },
  {
    id: "lightbulb_and_switch",
    baseId: "lightbulb_and_switch",
    title: "Switch light on",
    level: 5,
    category: "causal_change",
    prompt:
      "The camera smoothly moves left at constant speed until the ceiling light exits the frame to the right. While the light is out of view, a human hand toggles the wall switch. Then the camera moves right back to the original viewpoint, bringing the ceiling light back into view. Smooth, continuous evolution with no scene changes or cuts."
  },
];

/**
 * Binary criteria results for each example video.
 *
 * To add results for a video:
 *   VIDEO_CRITERIA["task_id"]["model_slug"] = {
 *     stateProgress:        true/false,
 *     physicalPlausibility: true/false,
 *     coherence:            true/false,
 *     observationControl:   true/false,
 *     actionControl:        true/false,
 *   };
 */
export const VIDEO_CRITERIA = {
  "alka_seltzer_fizz_cardboard": {
    "veo3": {
      stateProgress: true,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "sora2_pro": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "hunyuan15": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "wan22": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "cogvideox": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "gen3c": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hy_worldplay": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "genie3": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "lingbot": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
  },
  "fuse_burn_curtain": {
    "veo3": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "sora2_pro": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hunyuan15": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "wan22": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "cogvideox": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "gen3c": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hy_worldplay": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "genie3": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "lingbot": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
  },
  "ball_roll_down_curtain": {
    "veo3": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: false,
      observationControl: true,
      actionControl: true,
    },
    "sora2_pro": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hunyuan15": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "wan22": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: false,
      observationControl: true,
      actionControl: true,
    },
    "cogvideox": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: false,
      observationControl: false,
      actionControl: true,
    },
    "gen3c": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hy_worldplay": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "lingbot": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
  },
  "billiard_break_lightoff": {
    "veo3": {
      stateProgress: true,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "sora2_pro": {
      stateProgress: true,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: true,
    },
    "hunyuan15": {
      stateProgress: true,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "wan22": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "cogvideox": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
    "gen3c": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: false,
    },
    "hy_worldplay": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: false,
    },
    "genie3": {
      stateProgress: true,
      physicalPlausibility: false,
      coherence: false,
      observationControl: false,
      actionControl: true,
    },
    "lingbot": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: true,
    },
  },
  "lightbulb_and_switch": {
    "veo3": {
      stateProgress: true,
      physicalPlausibility: true,
      coherence: false,
      observationControl: true,
      actionControl: true,
    },
    "sora2_pro": {
      stateProgress: true,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: false,
    },
    "hunyuan15": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: false,
    },
    "wan22": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: true,
      observationControl: false,
      actionControl: false,
    },
    "cogvideox": {
      stateProgress: false,
      physicalPlausibility: false,
      coherence: false,
      observationControl: true,
      actionControl: false,
    },
    "gen3c": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: false,
    },
    "hy_worldplay": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: false,
      actionControl: false,
    },
    "genie3": {
      stateProgress: false,
      physicalPlausibility: true,
      coherence: true,
      observationControl: true,
      actionControl: false,
    },
  }
};
