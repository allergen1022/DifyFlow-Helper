# Agent Guide

Load SKILL.md first. Read only the reference files needed for the current request.

## Execution

1. Route the request with references/routing-and-scenes.md.
2. Read the scene-specific rules and any required safety or verification rules.
3. Analyze in chat before writing or modifying files.
4. Apply confirmation rules before edits, generated artifacts, external effects, credentials, or Git.
5. State the exact relative path for every written artifact.

## Scene boundaries

Scene6 is read-only. It may inspect one or more Flows, trace bindings, compare related Flows, and analyze Code Nodes, prompts, conditions, iteration, tools, plugins, or nested Flows. It does not authorize edits, prompt replacement, code replacement, diagrams, credentials, plugins, or Git.

Debugging takes priority when the request contains an error, failed run, wrong output, parsing failure, or runtime evidence. Diagnose from the available evidence before proposing a source change.

Use node names first. Explain inputs, bindings, types, outputs, downstream consumers, dependencies, and uncertainty. Do not invent missing Dify schema fields or credentials.

## Output

Chat is the default for analysis, plans, short prompts, code snippets, and concise debug summaries. Reports, prompt files, modified Flow copies, diagrams, and standalone code files require a user request or confirmation and belong under the current case generate/ directory.

## Verification

Local structure analysis normally needs no web lookup. Verify current Dify behavior before exact claims about import/export, DSL fields, node semantics, iteration, plugins, tools, model support, or structured output. Label local observations, inferences, verified facts, and unknowns separately.

Scripts are optional read-only helpers. Review their help output before use.
