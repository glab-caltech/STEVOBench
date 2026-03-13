import { LEADERBOARD, LEVELS } from "../content/leaderboard.js";
import { buildLeaderboardTable } from "../components/leaderboard-table.js";
import { EXAMPLE_TASKS, VIDEO_CRITERIA } from "../content/examples.js";
import { ICON_GITHUB, ICON_HUGGINGFACE, ICON_ARXIV } from "../icons.js";

export function renderOverview(container) {
  container.innerHTML = `
    <section class="hero">
      <div class="hero-label">Benchmark</div>
      <h1 class="hero-title">STEVO-Bench</h1>
      <p class="hero-subtitle">
        Can video world models evolve the state of the world without observing it?
      </p>
      <p class="hero-desc">
        STEVO-Bench evalutes whether video world models can “simulate” a world beyond 
        the pixel frame. We introduce observation control such as occlusion, camera lookaway 
        or illumination dimming to probe whether video world models can evolve state successfully
      </p>
      <div class="hero-actions">
        <a href="#leaderboard" class="btn btn-primary">View Full Leaderboard</a>
        <a href="https://github.com/jhanliufu-personal/STEVO-Bench/tree/main" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">${ICON_GITHUB} GitHub</a>
        <a href="https://huggingface.co/datasets/JhanLiufu/StEvo-Bench" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">${ICON_HUGGINGFACE} HuggingFace</a>
        <a href="#paper" class="btn btn-ghost">${ICON_ARXIV} Paper</a>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Leaderboard</h2>
      </div>
      <div id="overview-leaderboard-video"></div>
      <div id="overview-leaderboard-camera"></div>
      <div class="table-footer">
        <a href="#leaderboard" class="link-subtle">View full results →</a>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Benchmark Categories</h2>
      </div>
      <p class="section-desc">
        STEVO-Bench includes <strong>225</strong> tasks from <strong>6</strong> different categories, each of which captures a
        fundamentally distinct mode by which the world changes. The categories span scalar processes
        that accumulate gradually over time, simple few-object kinematics,
        irreversible structural or material transformations, and intent-driven behavior of agents etc.
        Together, they cover the physical, chemical, and social dimensions of world dynamics, providing
        a comprehensive probe of a model's internal simulation capacity.
      </p>
      <div class="categories-layout">
        <div class="pie-wrap">
          <svg class="pie-svg" id="pie-chart" viewBox="0 0 200 200" aria-hidden="true"></svg>
        </div>
        <ol class="categories-legend" id="categories-legend"></ol>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">How STEVO-Bench Works</h2>
      </div>
      <div class="pipeline-figure">
        <img
          src="assets/steobench_pipeline.png"
          alt="STEVO-Bench pipeline diagram"
          class="pipeline-img"
          loading="lazy"
        />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Example Tasks &amp; Videos</h2>
      </div>
      <div class="examples-viewer">
        <div class="task-selector-row">
          <label class="task-selector-label" for="task-select">Task</label>
          <select class="task-select" id="task-select">
            ${EXAMPLE_TASKS.map((t) => `<option value="${t.id}"${t.id === "ball_roll_down_curtain" ? " selected" : ""}>${t.title} — ${LEVELS[t.level - 1].name}</option>`).join("")}
          </select>
        </div>
        <div class="task-detail" id="task-detail"></div>
        <div class="task-videos" id="task-videos"></div>
      </div>
    </section>
  `;

  // Mini leaderboard — split into video models and camera-controlled models
  const videoModels = LEADERBOARD.filter((m) => !m.cameraControlled);
  const cameraModels = LEADERBOARD.filter((m) => m.cameraControlled);

  function rankGroup(arr) {
    return [...arr]
      .sort((a, b) => b.stateProgress - a.stateProgress)
      .map((m, i) => ({ ...m, rank: i + 1 }));
  }

  buildLeaderboardTable(
    document.getElementById("overview-leaderboard-video"),
    rankGroup(videoModels),
    { compact: true, highlight: "stateProgress", groupLabel: "Video Models" }
  );
  buildLeaderboardTable(
    document.getElementById("overview-leaderboard-camera"),
    rankGroup(cameraModels),
    { compact: true, highlight: "stateProgress", groupLabel: "Camera-Controlled Models" }
  );

  // Example Tasks & Videos — dropdown + viewer
  const exVideoModels = LEADERBOARD.filter((m) => m.slug && !m.cameraControlled);
  const exCameraModels = LEADERBOARD.filter((m) => m.slug && m.cameraControlled);

  const CRITERIA = [
    { key: "stateProgress",        label: "State Progress" },
    { key: "physicalPlausibility", label: "Physical Plausibility" },
    { key: "coherence",            label: "Coherence" },
    { key: "observationControl",   label: "Observation Control" },
    { key: "actionControl",        label: "Action Control" },
  ];

  function criteriaRows(taskId, modelSlug) {
    const results = VIDEO_CRITERIA[taskId]?.[modelSlug];
    if (!results) return "";
    return CRITERIA.map((c) => {
      const icon = results[c.key]
        ? `<span class="criterion-pass">&#10003;</span>`
        : `<span class="criterion-fail">&#10007;</span>`;
      return `<li class="criterion-row">${icon}<span>${c.label}</span></li>`;
    }).join("");
  }

  function videoCard(m, videoId, taskId) {
    const rows = criteriaRows(taskId, m.slug);
    return `
      <div class="model-video-card">
        <video
          class="model-video"
          src="data/videos/${m.slug}/${videoId}.mp4"
          controls
          muted
          loop
          preload="metadata"
        ></video>
        <div class="model-video-label">
          <span class="model-video-name">${m.model}</span>
          <span class="model-video-org">${m.org}</span>
        </div>
        ${rows ? `<ul class="criteria-list">${rows}</ul>` : ""}
      </div>`;
  }

  function renderTask(taskId) {
    const task = EXAMPLE_TASKS.find((t) => t.id === taskId);
    if (!task) return;

    const detail = document.getElementById("task-detail");
    const videos = document.getElementById("task-videos");

    detail.innerHTML = `
      <div class="task-frame-wrap">
        <img
          class="task-init-frame"
          src="data/frames/${task.id}.png"
          alt="Initial frame for ${task.title}"
          loading="lazy"
        />
        <div class="task-frame-label">Initial Frame</div>
      </div>
      <div class="task-prompt-wrap">
        <div class="task-prompt-heading">Prompt</div>
        <p class="task-prompt-text">${task.prompt}</p>
      </div>
    `;

    const camId = task.baseId ?? task.id;
    videos.innerHTML = `
      <div class="video-group show-criteria" id="vg-video">
        <div class="video-group-header">
          <span class="video-group-label">Video Models</span>
          <button class="criteria-toggle-btn active" data-group="vg-video">Hide Criteria</button>
        </div>
        <div class="task-videos-grid">
          ${exVideoModels.map((m) => videoCard(m, task.id, task.id)).join("")}
        </div>
      </div>
      <div class="video-group show-criteria" id="vg-camera">
        <div class="video-group-header">
          <span class="video-group-label">Camera-Controlled Models</span>
          <button class="criteria-toggle-btn active" data-group="vg-camera">Hide Criteria</button>
        </div>
        <div class="task-videos-grid">
          ${exCameraModels.map((m) => videoCard(m, camId, task.id)).join("")}
        </div>
      </div>
    `;

    videos.querySelectorAll(".criteria-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = document.getElementById(btn.dataset.group);
        const showing = group.classList.toggle("show-criteria");
        btn.textContent = showing ? "Hide Criteria" : "Show Criteria";
        btn.classList.toggle("active", showing);
      });
    });
  }

  const taskSelect = document.getElementById("task-select");
  taskSelect.addEventListener("change", () => renderTask(taskSelect.value));
  renderTask("ball_roll_down_curtain");

  // Benchmark Categories — animated pie chart + legend
  const catDescs = [
    "Does the model track continuous physical properties like temperature, volume, or phase?",
    "Does it simulate position and velocity under kinematic constraints?",
    "Does it track interdependencies between interacting objects?",
    "Does it model irreversible structural or state changes?",
    "Does it reason about causal links with hidden mechanisms?",
    "Does it predict outcomes governed by learned human or animal behavior?",
  ];

  function slicePath(cx, cy, r, startDeg, endDeg) {
    const toRad = (d) => (d - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`;
  }

  const pieSvg = document.getElementById("pie-chart");
  let angle = 0;
  LEVELS.forEach((cat, i) => {
    const sweep = (cat.pct / 100) * 360;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", slicePath(100, 100, 92, angle, angle + sweep));
    path.setAttribute("fill", cat.color);
    path.style.setProperty("--i", i);
    path.classList.add("pie-slice");
    pieSvg.appendChild(path);
    angle += sweep;
  });

  document.getElementById("categories-legend").innerHTML = LEVELS.map((cat, i) => `
    <li class="cat-item" style="--i:${i}">
      <span class="cat-dot" style="background:${cat.color}"></span>
      <span class="cat-name">${cat.name}</span>
      <span class="cat-pct">${cat.pct}%</span>
      <span class="cat-desc">${catDescs[i]}</span>
    </li>
  `).join("");
}
