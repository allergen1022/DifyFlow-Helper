# Dify YAML Safety Rules

- Analyze source `.yml` and `.yaml` before changing them. For a requested modification or debug fix, edit the source file in place and make the smallest possible diff limited to the requested parts.
- Scene6 may read one or more YAML/YML/DSL files together for read-only Flow analysis.
- Use node names first and ids only as secondary locators.
- If the user explicitly asks to preserve the source, write the modified copy under `generate/yml/`. Otherwise do not create a copy just because the file was modified.
- A direct request authorizes the requested source edit, overwrite, or complete importable YAML generation. Ask only if the target or scope is unclear.
- For a new Flow intended for direct import, establish the target Dify version when available. If it is unknown, use web search to check the latest official Dify release and DSL documentation, identify the checked release/DSL version and the artifact's target in the handoff, and remind the user to compare it with the destination instance before importing. Do not imply that "latest" guarantees compatibility with an unknown deployment. Report the check date when version freshness matters.
- For an existing Flow, preserve its DSL version and surrounding structure. Verify current compatibility details when an importable change depends on Dify version behavior.
- When the Flow uses plugins, tools, APIs, or MCP servers, check their relevant documented version/compatibility details against the target Dify environment when available. In the handoff, distinguish verified versions from unknown deployment details and remind the user to confirm any unresolved compatibility before import or use. Do not call an integration compatible merely because its latest release exists.
- During analysis, do not normalize formatting, rewrite fields, migrate schema, or modify source files.
- Quote only short relevant fragments when useful; do not dump an entire Flow unnecessarily.
- Use placeholders for credentials and authorization values.
- Disclose plugin and missing nested Flow dependencies.
