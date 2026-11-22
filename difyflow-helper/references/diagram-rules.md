# Diagram Rules

Activate only for an explicit request for a diagram, flowchart, architecture/logic/implementation visual, Mermaid, JavaScript, SVG, HTML, image, or text-only diagram.

Scene6 Flow Analysis does not automatically include a diagram. Text descriptions, execution-path summaries, node tables, and data-flow tables are allowed inside analysis. When the user requests a diagram, use the requested output format and do not ask for a second approval.

Infer audience, detail, source, reference role, output method, and visual preferences from the request and supplied materials. Ask only for an unknown choice that materially changes the requested result.

Use `assets/diagram-references/` as optional agent reference, not user input. For a first draft without style guidance, use body text of at least 20px in rendered visual formats, a larger title, clear hierarchy, readable labels, and a layout that fits the intended use.

Write requested diagram artifacts under the current workspace's `generate/diagrams/` directory:

- `generate/diagrams/mermaid/`
- `generate/diagrams/javascript/`
- `generate/diagrams/svg/`
- `generate/diagrams/html/`
- `generate/diagrams/images/`

Choose a suitable method based on the requested use and format. For JavaScript, state the Node.js or browser runtime and dependencies. Use standalone HTML when it fits the request.
