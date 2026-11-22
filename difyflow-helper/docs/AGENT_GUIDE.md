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

Debugging takes priority when the request contains an error, failed run, wrong output, parsing failure, or runtime evidence. Diagnose from the available evidence before proposing a source change.

Use node names first. Explain inputs, bindings, types, outputs, downstream consumers, dependencies, and uncertainty. Do not invent missing Dify schema fields or credentials.

## Output

Chat is the default for analysis, plans, short prompts, code snippets, and concise debug summaries. Write requested artifacts under the current workspace's `generate/` directory without asking for a second approval.

## Verification

Local structure analysis normally needs no web lookup. Verify current Dify behavior before exact claims about import/export, DSL fields, node semantics, iteration, plugins, tools, model support, or structured output. Label local observations, inferences, verified facts, and unknowns separately.

Scripts are optional read-only helpers. Review their help output before use.
