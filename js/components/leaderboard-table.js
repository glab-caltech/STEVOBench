/**
 * Builds and mounts a leaderboard table into `el`.
 *
 * Options:
 *   compact   – show fewer columns (overview mini-table)
 *   highlight – column key to visually highlight
 */
export function buildLeaderboardTable(el, data, options = {}) {
  const { compact = false, highlight = "stateProgress", groupLabel = null } = options;
  el.innerHTML = buildMainTable(data, compact, highlight, groupLabel);
}

function scoreBar(value) {
  const pct = Math.round(value);
  const cls =
    value >= 60 ? "bar-high" : value >= 40 ? "bar-mid" : "bar-low";
  return `
    <div class="score-cell">
      <span class="score-num">${pct}</span>
      <div class="score-bar-wrap">
        <div class="score-bar ${cls}" style="width:${pct}%"></div>
      </div>
    </div>`;
}

function rankBadge(rank) {
  if (rank === 1) return `<span class="rank gold">${rank}</span>`;
  if (rank === 2) return `<span class="rank silver">${rank}</span>`;
  if (rank === 3) return `<span class="rank bronze">${rank}</span>`;
  return `<span class="rank">${rank}</span>`;
}

const ALL_COLS = [
  { key: "stateProgress",        label: "State Progress" },
  { key: "physicalPlausibility", label: "Physical Plausibility" },
  { key: "coherence",            label: "Coherence" },
  { key: "observationControl",   label: "Observation Control" },
  { key: "actionControl",        label: "Action Control" },
];

function buildMainTable(data, compact, highlight, groupLabel) {
  const cols = compact ? ALL_COLS.slice(0, 3) : ALL_COLS;

  const header = `
    <tr>
      <th class="col-rank">#</th>
      <th class="col-model">Model</th>
      ${compact ? "" : '<th class="col-org">Org</th>'}
      ${cols
        .map(
          (c) => {
            const classes = ["col-score"];
            if (c.key === highlight) classes.push("col-highlight");
            if (c.key === "stateProgress") classes.push("col-primary");
            return `<th class="${classes.join(" ")}">${c.label}</th>`;
          }
        )
        .join("")}
      ${compact ? "" : '<th class="col-date">Date</th>'}
    </tr>`;

  const rows = data
    .map(
      (m) => `
    <tr>
      <td class="col-rank">${rankBadge(m.rank)}</td>
      <td class="col-model">
        <span class="model-name">${m.model}</span>
        ${compact ? `<span class="model-org-inline">${m.org}</span>` : ""}
      </td>
      ${compact ? "" : `<td class="col-org">${m.org}</td>`}
      ${cols
        .map(
          (c) =>
            `<td class="col-score${c.key === highlight ? " col-highlight" : ""}">${scoreBar(m[c.key])}</td>`
        )
        .join("")}
      ${compact ? "" : `<td class="col-date">${m.date}</td>`}
    </tr>`
    )
    .join("");

  return `
    <div class="table-wrap">
      ${groupLabel ? `<div class="lb-group-label">${groupLabel}</div>` : ""}
      <table class="lb-table">
        <thead>${header}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

