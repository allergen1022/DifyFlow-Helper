# Dify Node Output Rules

Include node-level detail when designing, changing, or debugging nodes.

| Field | Requirement |
|---|---|
| Node name | Primary locator |
| Node id | Secondary locator when available |
| Node type | Start / LLM / Code / Tool / HTTP / Plugin / Variable Assigner / End / Unknown |
| Input parameter | Name configured in Dify |
| Bind from node | Source node name |
| Bind variable | Source variable name |
| Input data type | `string`, `number`, `boolean`, `object`, `array`, `array[object]`, or `unknown` |
| Output variable/type | Produced variable and expected shape |
| Downstream consumers | Nodes using the output |
| Operation instruction | What to bind or change in the Dify UI |

Prefer this compact format:

| Node | Type | Parameter / Output | Bind / Produced Value | Data Type | Used By | Note |
|---|---|---|---|---|---|---|

## Scene6 analysis boundary

When the task is Flow Analysis, explain existing node inventory, topology, I/O bindings, Code nodes, LLM prompts, conditions, iteration, loops, plugins, tools, and nested Flows without changing them.

- Analyze existing code; do not output replacement code unless the user moves to modification.
- Analyze existing prompts; do not rewrite them unless requested.
- Explain bindings; do not edit them.
- Identify risks and unclear contracts; do not generate patches from analysis findings alone.

For focused analysis, use compact tables such as:

| Node | Type | Main role | Main inputs | Main outputs | Downstream use |
|---|---|---|---|---|---|

| Binding | Source node | Source variable | Data type | Consumer | Finding |
|---|---|---|---|---|---|

## Code nodes

Provide complete replacement code by default for actual design or modification tasks. Keep the original language when modifying. For Scene6 analysis, review the existing code, expected inputs, return values, dependencies, downstream use, and risks without replacing it. For new development, ask Python versus JavaScript only when the choice matters; when asked to proceed quickly, choose the simpler safe option and state conversion is possible. List expected inputs and returned outputs, add null/type guards, show important object/array shapes, list third-party packages, and use placeholders instead of secrets.

## LLM Node Prompt and Structured Output Rules
Note that LLM prompt handling is a cross-cutting node-level capability, not a standalone Scene. Apply these rules whenever an LLM node prompt is designed, reused, modified, debugged, or exported.

Separate system and user prompts, explain what belongs in each, and list variables used by each prompt. Explain where each variable binds in the Dify UI. Ask full replacement versus changed sections only when it materially changes the deliverable. Default to chat; use the current case `generate/prompts/` folder only for user-requested or confirmed prompt artifacts.

For Scene6, analyze prompt structure, bindings, context, JSON requirements, downstream parsing, conflicts, missing variables, and output stability risks without rewriting the prompt.

Use this table for prompt bindings:

| Prompt Section | Variable | Bind From Node | Bind Variable | Data Type | Required | Notes |
|---|---|---|---|---|---:|---|

Identify whether context is needed, its upstream producer, and whether it is passed as LLM context input, a prompt variable, or both. Explain the distinction when relevant. Do not invent context schemas when an upstream or nested Flow is missing; request the missing details when exact behavior matters.

| Context Item | Source Node | Source Variable / Output | Data Type | Used In | Notes |
|---|---|---|---|---|---|

When JSON output is required or consumed downstream, confirm whether strict JSON is needed, the exact fields and types, the downstream consumer, and whether the user's Dify version and selected model support structured output or JSON Schema. Do not assume support. Verify current support before final configuration, or ask the user for environment details.

| Output Field | Type | Required | Description | Downstream Consumer |
|---|---|---:|---|---|

If JSON Schema support is unavailable or uncertain, put the JSON contract in the prompt and mark native schema configuration as optional and unverified. Instruct the model to output JSON only, without Markdown fences or text outside JSON; include every required field; use `null` for unknown optional values when appropriate; obey the exact schema and user-specified string limits. Warn that prompt-only JSON can fail, and require downstream validation, retry, or error handling where appropriate.

## Plugins, auth, and keys

Disclose required plugins or APIs and ask before installation/configuration. Never echo real keys, tokens, cookies, authorization headers, signed URLs, or private bucket URLs.

## Nested Flows

State when a called Flow/tool Flow is missing. Do not invent its output schema; request it when exact behavior matters.

For multi-Flow analysis, trace caller/callee, tool, nested-Flow, handoff, shared schema, shared variable, and cross-Flow input/output contracts only where the provided materials support them.
