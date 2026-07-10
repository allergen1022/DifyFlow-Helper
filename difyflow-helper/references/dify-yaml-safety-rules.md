# Dify YAML Safety Rules

- Treat source `.yml` and `.yaml` as read-only by default; analyze before editing.
- Scene6 may read one or more YAML/YML/DSL files together for read-only Flow analysis.
- Use node names first and ids only as secondary locators.
- Preserve originals. After confirmed modification, prefer `generate/yml/<case-name>.modified.yml`.
- Require explicit confirmation before direct edits, overwrites, or complete importable YAML generation.
- Verify the current Dify import/export format online before full generation.
- During analysis, do not normalize formatting, rewrite fields, migrate schema, or modify source files.
- Quote only short relevant fragments when useful; do not dump an entire Flow unnecessarily.
- Use placeholders for credentials and authorization values.
- Disclose plugin and missing nested Flow dependencies.
- If `.git` exists, do not run Git operations unless explicitly requested.
