# File Output Rules

Use chat for short analysis, plans, small tables, code snippets, prompts, and concise debug summaries.

After a user request or confirmation, write artifacts only under the current case:

    generate/yml/
    generate/reports/
    generate/prompts/
    generate/diagrams/mermaid/
    generate/diagrams/javascript/
    generate/diagrams/svg/
    generate/diagrams/html/
    generate/diagrams/images/
    generate/code/

Use stable names based on the case and node names. State the exact relative path after writing. Do not overwrite an existing file without separate confirmation.

Use generate/yml/ for modified Flow copies or complete YAML.
Use generate/reports/ for requested analysis or debug reports.
Use generate/prompts/ for confirmed prompt artifacts and prompt change plans.
Use generate/diagrams/<format>/ for diagrams.
Use generate/code/ for explicitly requested standalone code.

Never write generated files into the installed skill or any reference package. Do not include secrets or raw private data in artifacts.
