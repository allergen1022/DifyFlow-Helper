# File Output Rules

Default to chat for short analysis, small tables, code blocks, design outlines, and concise debug summaries.

Write only when the user asks or confirms, or when an accepted artifact is naturally too large for chat. Use the current case folder:

```text
generate/yml/
generate/reports/
generate/prompts/
generate/diagrams/mermaid/
generate/diagrams/javascript/
generate/diagrams/svg/
generate/diagrams/html/
generate/diagrams/images/
generate/code/
```

Flow analysis reports are optional. Chat is the default. Write a Markdown analysis report only when the user requests or confirms file output, and only under the current case:

```text
generate/reports/<flow-name>-analysis-report.md
generate/reports/<flow-name>-<focus>-analysis-report.md
generate/reports/<case-name>-multi-flow-analysis-report.md
```

Do not write reports into the installed skill or `user-kit/`. Do not overwrite an existing report without explicit confirmation.

Prompt artifacts use safe case and node names, with the node name as the primary locator. Use these patterns:

```text
generate/prompts/<case-name>-<node-name>-system-prompt.md
generate/prompts/<case-name>-<node-name>-user-prompt.md
generate/prompts/<case-name>-<node-name>-context-notes.md
generate/prompts/<case-name>-<node-name>-full-prompt.md
generate/prompts/<case-name>-<node-name>-json-output-schema.md
generate/prompts/<case-name>-<node-name>-prompt-change-plan.md
```

Generate prompt files only when the user asks, confirms suggested file output, or accepts file generation because the prompt is too long for reliable chat. Do not create full prompt files when only changed sections were requested unless confirmed. Do not include secrets or raw private data; use placeholders or summaries unless preservation is explicitly confirmed.

Never write generated files inside the installed skill or `user-kit/`. Prefer modified Flow copies under `generate/yml/`; never overwrite sources without confirmation. Use `generate/code/` only for explicitly requested standalone code files. Honor chat-only requests.

Always state the exact relative path after writing or proposing a file. If the case folder is ambiguous, ask for it; use the current directory only when the environment clearly establishes it as the user's case.
