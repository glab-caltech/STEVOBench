import { PAPER } from "../content/paper.js";

export function renderPaper(container) {
  const authorHtml = PAPER.authors
    .map((a) => (a.equal ? `${a.name}*` : a.name))
    .join(" &nbsp;&middot;&nbsp; ");

  const linksHtml = PAPER.links
    .map((l) =>
      l.disabled
        ? `<a href="${l.href}" class="btn btn-ghost" aria-disabled="true">${l.label} (coming soon)</a>`
        : `<a href="${l.href}" class="btn btn-ghost" target="_blank" rel="noopener">${l.label}</a>`
    )
    .join("");

  container.innerHTML = `
    <section class="section paper-section">
      <div class="section-header">
        <h2 class="section-title">Paper</h2>
      </div>

      <div class="paper-card">
        <div class="paper-meta-row">
          <span class="paper-venue">${PAPER.venue}</span>
        </div>
        <h3 class="paper-title">${PAPER.title}</h3>
        <div class="paper-authors">${authorHtml}</div>
        <div class="paper-affiliation">${PAPER.affiliations.join(", ")}</div>
        <p class="paper-abstract">${PAPER.abstract}</p>
        <div class="paper-links">
          ${linksHtml}
        </div>
      </div>

      <div class="bibtex-block">
        <div class="bibtex-header">
          <span class="bibtex-label">BibTeX</span>
          <button class="copy-btn" id="copy-bibtex">Copy</button>
        </div>
        <pre class="bibtex-pre"><code id="bibtex-code"></code></pre>
      </div>
    </section>
  `;

  // Set bibtex as text content to avoid any HTML injection
  document.getElementById("bibtex-code").textContent = PAPER.bibtex;

  document.getElementById("copy-bibtex").addEventListener("click", () => {
    navigator.clipboard.writeText(PAPER.bibtex).then(() => {
      const btn = document.getElementById("copy-bibtex");
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 2000);
    });
  });
}
