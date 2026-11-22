# Agent Guide

Load SKILL.md first. Read only the reference files needed for the current request.

## Execution

1. Route the request with references/routing-and-scenes.md.
2. Read the scene-specific rules and any required safety or verification rules.
3. Analyze before changing files. A clear request authorizes the requested scoped work; do not ask for a second approval.
4. Ask only when a material requirement is missing. Follow confirmation rules for genuinely unresolved choices, credentials, external configuration details, and Git.
5. State the exact relative path for every written artifact.

## Scene boundaries

Read-only analysis does not authorize unrelated edits. If the user also requests a specific change, perform that scoped change.

For a new app, establish the app type before design when it changes the architecture. Apply Workflow and Chatflow node-canvas guidance only to those canvases; use the matching configuration model and current documentation for other app types.

Debugging takes priority when the request contains an error, failed run, wrong output, parsing failure, or runtime evidence. Diagnose from the available evidence before proposing a source change.

For requested modifications and debug fixes, edit the source file directly with the smallest possible diff. Create a modified copy under `generate/` only when the user asks to preserve the source. Use `generate/` for newly created artifacts.

For focused Code-node or LLM-prompt work, optionally extract relevant content from an exported Flow using `scripts/extract_node_content.py`; treat the result as a working view and verify it against the source Flow. For developer-requested local Code-node debugging, a small harness may exercise the configured JavaScript or Python code, but local execution does not establish Dify runtime behavior.

In Workflow and Chatflow nodes, use LLMs for semantic interpretation and code or native logic for deterministic operations. Before adding an external tool, plugin, API, or MCP integration, resolve whether documented defaults are sufficient or task-specific parameters are needed; verify requested parameters against official documentation.

Use node names first. Explain inputs, bindings, types, outputs, downstream consumers, dependencies, and uncertainty. Do not invent missing Dify schema fields or credentials. When a development document is requested, consult `references/development-document-rules.md` and its language-matched template; those templates are style references, not mandatory formats.

## Output

Chat is the default for analysis, plans, short prompts, code snippets, and concise debug summaries. Write requested artifacts under the current workspace's `generate/` directory without asking for a second approval.

## Verification

Local structure analysis normally needs no web lookup. Verify current Dify behavior before exact claims about import/export, DSL fields, node semantics, iteration, plugins, tools, model support, or structured output. Label local observations, inferences, verified facts, and unknowns separately.

For a new Flow intended for direct import, target the supplied Dify version. If it is unknown, use web search to check the latest official Dify release and DSL guidance, state the checked release/DSL version and date, and remind the user to confirm the destination instance version before import. For existing Flows, preserve the source DSL version and structure. When plugins, tools, APIs, or MCP servers are involved, verify and report relevant integration versions and compatibility; "latest" alone does not establish compatibility. Ask for deployment details only when the unknown version blocks an import-ready result.

Scripts are optional read-only helpers. Review their help output before use.
