# Confirmation Rules

Require explicit confirmation before:

| Action | Requirement |
|---|---|
| Generate complete importable Dify YAML/YML/DSL | Confirm, then verify current Dify standards online |
| Directly edit a source Flow | Confirm |
| Overwrite any user file | Confirm separately |
| Install or configure a plugin in a real environment | Confirm |
| Fill or use a real key, token, credential, or auth value | Confirm; do not echo it |
| Run any Git operation | Confirm |
| Make a debug-driven source modification | Confirm after diagnosis |
| Write a large artifact when chat may suffice | Confirm output and path |
| Create a Markdown Flow analysis report under `generate/reports/` | User request or confirmation |
| Create prompt artifacts under `generate/prompts/` when chat output is enough | Confirm |
| Overwrite an existing prompt artifact | Confirm separately |
| Replace a complete system or user prompt when only partial changes were requested | Usually confirm |
| Enable or assume JSON Schema structured output without user/environment confirmation | Do not assume; verify or ask |
| Use prompt-only JSON fallback when JSON Schema support is uncertain | Allowed; state its limitations |
| Choose an unspecified diagram target/method | Clarify use scenario and format |

Read-only Flow analysis and chat output do not require confirmation. An explicit initial request such as "Analyze this Flow and write a Markdown report" counts as confirmation for creating a new report under the standard `generate/reports/` path, unless the destination is ambiguous, an existing file would be overwritten, the requested path is outside the current case/project, or sensitive content requires scope clarification.

Scene6 analysis does not authorize Flow modification, prompt replacement, code replacement, diagram generation, plugin configuration, credential use, Git operations, or debug-driven edits. If analysis leads to Scene3, Scene4, Scene5, or Scene2, apply that scene's normal confirmation rules before any side effect.

Never generate a diagram when the user did not ask for one. Do not ask unnecessary questions for safe chat analysis; state reasonable assumptions and proceed without side effects.
