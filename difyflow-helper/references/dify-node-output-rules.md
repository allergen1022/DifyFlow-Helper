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

Use Code nodes for deterministic operations such as exact calculations, fixed mappings, validation, and data shaping. Prefer native Dify logic nodes when they express the required operation clearly. Do not use an LLM to generate exact identifiers, indexes, codes, or other fixed values.

Choose a Code node language based on the user's requirements, existing code, dependencies, and target Dify runtime. If none of these constrain the choice, JavaScript is a reasonable default. Keep inputs limited to required variables and outputs limited to values used downstream. Add guards only when required by the input contract or actual runtime uncertainty. Use placeholders instead of secrets.

Provide complete replacement code by default for actual design or modification tasks. Keep the original language when modifying. For Scene6 analysis, review existing code, expected inputs, return values, dependencies, downstream use, and risks without replacing it. Show important object/array shapes and list third-party packages when relevant.

## LLM and deterministic logic boundary

These rules apply to LLM and Code nodes in Workflow and Chatflow canvases:

- Use LLM nodes for semantic understanding, such as interpreting free text, resolving intent, classifying by meaning, or generating natural-language content.
- Use Code or native logic nodes for deterministic processing, including exact calculations, fixed mappings, validation, identifiers, indexes, and formatting.
- When a task needs both, keep semantic judgment in the LLM step and exact processing in Code or native logic nodes.
- Send only the context and variables needed for the LLM task; avoid repeated or oversized context.

## Control flow and errors

- Let error behavior follow the business requirement. Add an exception branch only when it provides a defined recovery or user-visible result.
- When multiple error messages must be returned together, consider a Variable Aggregator if supported by the target Dify version.
- Preserve existing error behavior when modifying Iteration or Loop nodes. For new designs, choose error and continuation behavior from the business requirement; clarify only if the choice materially affects expected results.

## LLM Node Prompt and Structured Output Rules
Note that LLM prompt handling is a cross-cutting node-level capability, not a standalone Scene. Apply these rules whenever an LLM node prompt is designed, reused, modified, debugged, or exported.

Separate system and user prompts when the Dify configuration supports them. Explain relevant variables and bindings. Infer whether a full replacement or targeted change is wanted from the request; ask only if that choice materially changes an unclear deliverable. Default to chat; write requested prompt artifacts under `generate/prompts/`.

For Scene6, analyze prompt structure, bindings, context, JSON requirements, downstream parsing, conflicts, missing variables, and output stability risks without rewriting the prompt.

Use this table for prompt bindings:

| Prompt Section | Variable | Bind From Node | Bind Variable | Data Type | Required | Notes |
|---|---|---|---|---|---:|---|

Identify whether context is needed, its upstream producer, and whether it is passed as LLM context input, a prompt variable, or both. Explain the distinction when relevant. Do not invent context schemas when an upstream or nested Flow is missing; request the missing details when exact behavior matters.

| Context Item | Source Node | Source Variable / Output | Data Type | Used In | Notes |
|---|---|---|---|---|---|

When JSON output is required or consumed downstream, derive the contract from the request and available downstream configuration. Ask only for missing fields, types, or strictness that materially affect the result. Verify current Dify and model support before configuring structured output or JSON Schema; do not assume support.

| Output Field | Type | Required | Description | Downstream Consumer |
|---|---|---:|---|---|

If JSON Schema support is unavailable or uncertain, describe the JSON contract in the prompt and label native schema configuration as optional and unverified. Match the requested output shape. Where reliability matters, explain that prompt-only formatting can fail and use downstream validation or error handling appropriate to the task.

## Plugins, auth, and keys

Before configuring an external tool, plugin, API integration, or MCP server, ask once whether to use documented defaults or add task-specific parameters when the user has not specified. Reuse the answer for that integration throughout the task. Clarify only missing purpose or behavior for requested custom parameters.

Verify parameter names, types, requiredness, and behavior against the integration's official documentation and the target Dify version. Configure only parameters supported by those sources and needed for the user's stated goal. If documentation is unavailable or the requirement is unclear, ask for the relevant specification or clarify; never invent fields or values.

Identify required plugins or APIs. A clear user request authorizes the requested installation or configuration; do not ask for a second approval. Never echo real keys, tokens, cookies, authorization headers, signed URLs, or private bucket URLs.

## Nested Flows

State when a called Flow/tool Flow is missing. Do not invent its output schema; request it when exact behavior matters.

For multi-Flow analysis, trace caller/callee, tool, nested-Flow, handoff, shared schema, shared variable, and cross-Flow input/output contracts only where the provided materials support them.
