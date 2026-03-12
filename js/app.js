import { renderOverview } from "./pages/overview.js";
import { renderLeaderboard } from "./pages/leaderboard.js";
import { renderPaper } from "./pages/paper.js";

const TABS = [
  { id: "overview",    label: "Overview",        render: renderOverview },
  { id: "leaderboard", label: "Full Leaderboard", render: renderLeaderboard },
  { id: "paper",       label: "Paper",            render: renderPaper },
];

function getActiveTab() {
  const hash = location.hash.replace("#", "") || "overview";
  return TABS.find((t) => t.id === hash) || TABS[0];
}

function navigate(tabId) {
  location.hash = tabId;
}

function renderTabs(activeId) {
  const nav = document.getElementById("tab-nav");
  nav.innerHTML = TABS.map(
    (t) => `<button
      class="tab-btn${t.id === activeId ? " active" : ""}"
      data-tab="${t.id}"
      aria-selected="${t.id === activeId}"
    >${t.label}</button>`
  ).join("");

  nav.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => navigate(btn.dataset.tab));
  });
}

function mount() {
  const tab = getActiveTab();
  renderTabs(tab.id);
  const content = document.getElementById("page-content");
  content.innerHTML = "";
  tab.render(content);
}

window.addEventListener("hashchange", mount);
document.addEventListener("DOMContentLoaded", mount);
