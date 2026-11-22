# File Output Rules

Use chat for analysis, plans, small tables, code snippets, prompts, and concise debug summaries unless the user requests a file.

Use the current workspace's `generate/` directory only for artifacts newly created by the agent, not for edits or debug fixes to existing files:

    generate/yml/
    generate/reports/
    generate/prompts/
    generate/diagrams/mermaid/
    generate/diagrams/javascript/
    generate/diagrams/svg/
    generate/diagrams/html/
    generate/diagrams/images/
    generate/code/

Use a clear subdirectory based on artifact type and a descriptive filename. Resolve generated paths within the current workspace's `generate/` directory; do not write generated artifacts outside it. State the exact relative path after writing.

Use `generate/yml/` for a newly created Flow or a copy only when the user asks to preserve the source file.
Use `generate/reports/` for requested reports.
Use `generate/prompts/` for requested prompt artifacts and prompt change plans.
Use `generate/diagrams/<format>/` for diagrams.
Use `generate/code/` for requested standalone code.

For modification or debugging, edit the supplied source file in place by default and make the smallest diff limited to the requested parts. If the user says not to change the source, create a modified copy under `generate/` instead. Do not copy an existing file to `generate/` merely because it was modified.

Do not overwrite an existing generated file unless the user explicitly requested it. If the destination exists, choose a distinct name when practical; ask once only when no clear safe path remains. Never write generated files into the installed skill or a reference package. Do not include secrets or unnecessary private data in artifacts.
