# Development Document Rules

Use this reference only when the user requests a development document, implementation plan, or reviewable change specification for a new or modified Flow. It is separate from an analysis or debug report.

Choose the template matching the document language:

- English: assets/development-document-templates/en_US.md
- Chinese: assets/development-document-templates/zh_CN.md

Treat the selected template as a style reference, not a required schema. Adapt its sections to the requested change, omit irrelevant details, and preserve the user's requested format. Document the affected Flow and nodes, relevant inputs/outputs and bindings, prompt or code changes, and connection changes when they matter. For node removal, describe affected consumers and their new bindings or behavior. Do not add unrelated implementation preferences or project-specific constraints. Distinguish confirmed configuration from assumptions and items that need verification.

Keep the document in the requested language. If the user requests both languages, produce separately labeled English and Chinese versions rather than mixing languages in one document. Store a requested file under generate/ according to references/file-output-rules.md; otherwise return it in chat.
