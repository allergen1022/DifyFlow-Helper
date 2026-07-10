# Diagram Rules

Activate only for an explicit request for a diagram, flowchart, architecture/logic/implementation visual, Mermaid, JavaScript, SVG, HTML, image, or text-only diagram.

Scene6 Flow Analysis must not automatically generate a diagram. Text descriptions, execution-path summaries, node tables, and data-flow tables are allowed inside analysis. If the user requests Mermaid, JavaScript, SVG, HTML, image output, or a diagram as a deliverable, apply Scene5 and preserve all diagram confirmation and output-format rules.

Ask or infer only missing essentials:

1. Use scenario: Word, PPT, Markdown, HTML, technical review, delivery, or display.
2. Detail: overview, node-level, variable-level, or implementation-level.
3. Source: one or more Flow files, pasted logic, or reference Flow.
4. Reference role: logic, style, or both.
5. Method: Mermaid, JavaScript, SVG, HTML, image, or text-only.
6. Relevant color, font, size, or layout preferences.

Use `assets/diagram-references/` as optional agent reference, not user input. For an accepted default draft, use clear hierarchy, minimal decoration, readable labels, body text at least 20px, larger title text, restrained colors, and distinguish start/end, LLM, code, tool/plugin, and decision nodes when possible.

Write confirmed artifacts to:

- `generate/diagrams/mermaid/`
- `generate/diagrams/javascript/`
- `generate/diagrams/svg/`
- `generate/diagrams/html/`
- `generate/diagrams/images/`

Use Mermaid for editable text diagrams. For JavaScript, state Node.js/browser runtime and dependencies. Use standalone HTML when requested. Generate an image only when requested or when an accepted image artifact is appropriate.
