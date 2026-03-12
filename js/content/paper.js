/**
 * Paper metadata and content.
 * Edit this file to update the paper page.
 *
 * links[].disabled — set to true to show the button greyed out (e.g. "coming soon")
 */

export const PAPER = {
  venue: "arXiv 2025",
  title: "Out of Sight, Out of Mind? Evaluating State Evolution in Video World Models",
  authors: [
    { name: "Ziqi Ma", equal: true },
    { name: "Mengzhan Liufu", equal: true },
    { name: "Georgia Gkioxari", equal: false },
  ],
  affiliations: ["Caltech"],

  abstract: `Evolutions in the world, such as water pouring or ice melting, happen
regardless of being observed. Video world models generate \u201cworlds\u201d via
2D frame observations. Can these generated \u201cworlds\u201d evolve regardless of
observation? To probe this question, we design a benchmark to evaluate
whether video world models can decouple state evolution from observation.
Our benchmark applies observation control to evolving processes via
instructions of occluder insertion, turning off the light, or specifying
camera \u201clookaway\u201d trajectories. By evaluating video models with and without
camera control for a diverse set of naturally-occurring evolutions, we
expose their limitations in decoupling state evolution from observation.
We propose an evaluation protocol to automatically detect and disentangle
failure modes of video world models across key aspects of natural state
evolution. Our analysis provides new insight into potential data and
architecture biases of present-day video world models.`,

  links: [
    { label: "arXiv", href: "#", disabled: true },
    { label: "GitHub", href: "#", disabled: true },
  ],

  bibtex: `@article{ma2025stevobench,
  title   = {Out of Sight, Out of Mind? Evaluating State Evolution in Video World Models},
  author  = {Ma, Ziqi and Liufu, Mengzhan and Gkioxari, Georgia},
  journal = {arXiv preprint},
  year    = {2025},
}`,
};
