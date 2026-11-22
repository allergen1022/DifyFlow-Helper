# Confirmation and Clarification Rules

- Treat a clear user request as authorization for the requested work. Do not ask for a second approval before scoped Flow edits, complete importable YAML, or requested files.
- Ask only when missing information materially affects correctness, scope, or an external action. First use the request and supplied files; bundle related questions into one concise message and do not ask for information already provided.
- When a safe, reversible default is clear, proceed and state the assumption instead of interrupting the task.
- Keep generated artifacts under the current workspace's `generate/` directory. A direct request authorizes the artifact within that output root.
- Preserve existing files unless the user explicitly asks to overwrite them. If a requested destination already exists and overwrite was not requested, use a distinct name when practical; otherwise ask once.
- Before configuring an external tool, plugin, API integration, or MCP server, ask once whether to use documented defaults or add task-specific parameters if the user has not specified. For requested custom parameters, clarify only missing purpose or behavior, verify them against official provider and Dify documentation, then proceed without another approval prompt.
- Use real credentials only when necessary and explicitly authorized. Keep them out of generated content, prompts, logs, and responses; ask only if the credential's use or destination is unclear.
- Generate diagrams only when requested. Do not assume structured-output support; verify it when exact configuration matters.
- Do not run Git operations unless explicitly requested.
