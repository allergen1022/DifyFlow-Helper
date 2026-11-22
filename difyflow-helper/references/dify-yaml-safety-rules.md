# Dify YAML Safety Rules

- Treat source `.yml` and `.yaml` as read-only unless the user requests a scoped edit; analyze before changing them.
- Scene6 may read one or more YAML/YML/DSL files together for read-only Flow analysis.
- Use node names first and ids only as secondary locators.
- Preserve originals when generating a modified copy; store that copy under `generate/yml/`.
- A direct request authorizes the requested source edit, overwrite, or complete importable YAML generation. Ask only if the target or scope is unclear.
- Verify the current Dify import/export format online before full generation.
- During analysis, do not normalize formatting, rewrite fields, migrate schema, or modify source files.
- Quote only short relevant fragments when useful; do not dump an entire Flow unnecessarily.
- Use placeholders for credentials and authorization values.
- Disclose plugin and missing nested Flow dependencies.
