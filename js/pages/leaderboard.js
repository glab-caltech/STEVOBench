import { LEADERBOARD } from "../content/leaderboard.js";
import { buildLeaderboardTable } from "../components/leaderboard-table.js";

export function renderLeaderboard(container) {
  const videoModels  = LEADERBOARD.filter((m) => !m.cameraControlled);
  const cameraModels = LEADERBOARD.filter((m) =>  m.cameraControlled);

  container.innerHTML = `
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Full Leaderboard</h2>
        <span class="section-meta">Results across all evaluated models</span>
      </div>

      <div class="leaderboard-controls">
        <div class="filter-group">
          <label class="filter-label">Sort by</label>
          <div class="segmented" id="sort-control">
            <button class="seg-btn active" data-sort="stateProgress">State Progress</button>
            <button class="seg-btn" data-sort="physicalPlausibility">Physical Plausibility</button>
            <button class="seg-btn" data-sort="coherence">Coherence</button>
            <button class="seg-btn" data-sort="observationControl">Observation Control</button>
            <button class="seg-btn" data-sort="actionControl">Action Control</button>
          </div>
        </div>
      </div>

      <div id="video-lb"></div>
      <div id="camera-lb"></div>
    </section>

    <section class="section metric-defs">
      <h3 class="defs-title">Criteria Definitions</h3>
      <dl class="defs-list">
        <div class="def-row">
          <dt>State Progress</dt>
          <dd>Did the expected physical state change occur during the unobserved interval?</dd>
        </div>
        <div class="def-row">
          <dt>Physical Plausibility</dt>
          <dd>Are the generated videos free of visible artifacts or physics violations?</dd>
        </div>
        <div class="def-row">
          <dt>Coherence</dt>
          <dd>Is the video temporally consistent without scene cuts or discontinuities?</dd>
        </div>
        <div class="def-row">
          <dt>Observation Control</dt>
          <dd>Did the model correctly execute the occlusion or light-off observation control as specified?</dd>
        </div>
        <div class="def-row">
          <dt>Action Control</dt>
          <dd>Did the model correctly execute the triggered action (e.g. camera pan) as specified?</dd>
        </div>
      </dl>
    </section>
  `;

  let sortKey = "stateProgress";
  const sortControl = document.getElementById("sort-control");

  function render() {
    function sortedGroup(arr) {
      return [...arr]
        .sort((a, b) => b[sortKey] - a[sortKey])
        .map((m, i) => ({ ...m, rank: i + 1 }));
    }

    buildLeaderboardTable(document.getElementById("video-lb"), sortedGroup(videoModels), {
      highlight: sortKey,
      groupLabel: "Video Models",
    });
    buildLeaderboardTable(document.getElementById("camera-lb"), sortedGroup(cameraModels), {
      highlight: sortKey,
      groupLabel: "Camera-Controlled Models",
    });
  }

  sortControl.addEventListener("click", (e) => {
    const btn = e.target.closest(".seg-btn");
    if (!btn) return;
    sortKey = btn.dataset.sort;
    sortControl.querySelectorAll(".seg-btn")
      .forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });

  render();
}
