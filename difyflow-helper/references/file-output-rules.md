# File Output Rules

Use chat for analysis, plans, small tables, code snippets, prompts, and concise debug summaries unless the user requests a file.

Store every generated artifact under the current workspace's `generate/` directory:

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

Use `generate/yml/` for modified Flow copies or complete YAML.
Use `generate/reports/` for requested reports.
Use `generate/prompts/` for requested prompt artifacts and prompt change plans.
Use `generate/diagrams/<format>/` for diagrams.
Use `generate/code/` for requested standalone code.

Do not overwrite an existing file unless the user explicitly requested it. If the destination exists, choose a distinct name when practical; ask once only when no clear safe path remains. Never write generated files into the installed skill or a reference package. Do not include secrets or unnecessary private data in artifacts.
