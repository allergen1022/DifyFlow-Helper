# Agent Guide

Load `SKILL.md` first. Then load only the relevant files in `references/`; do not read every reference by default.

## Workflow

1. Infer Scene1–6 from the user's request. Debug language routes to Scene4 before modification. Diagram behavior activates only on an explicit request. Read-only Flow analysis routes to Scene6 when analysis is the primary intent.
2. Accept raw chat content or files in a simple current case folder. Do not force templates or a `workspace/` hierarchy.
3. Analyze safely in chat first. Require confirmation for complete YAML, direct edits, overwrites, plugin changes, credentials, Git, debug-driven changes, and large artifacts.
4. For confirmed files, use the current case's `generate/` subfolder and state the exact relative path. Default prompt snippets, moderate-length prompts, and Flow analysis to chat; use `generate/prompts/` and `generate/reports/` only for user-requested or confirmed files.

User-specific reference Flows are not installed skill assets. Keep private or case-specific Flows in the current case; use the optional sibling `user-kit/reference-flows/` only for intentionally shared, sanitized user/team references.

## Scene6 Flow analysis

Use Scene6 when the user asks to analyze, explain, review, inspect, compare, trace, or document one or more existing Flows without requesting new development, modification, debugging, or a diagram as the primary deliverable.

Examples:

```text
Analyze ./flow.yml. Explain the overall logic and do not modify any files.
Analyze the Code nodes in ./flow.yml, including inputs, return values, dependencies, and downstream use. Do not rewrite the code.
Analyze the LLM node prompts and variable bindings in ./flow.yml. Do not rewrite the prompts.
Analyze the condition branches and iteration logic in ./flow.yml.
Analyze ./main-flow.yml and ./tool-flow.yml. Explain how they relate and trace the input/output contract between them.
Analyze ./flow.yml in chat only. Do not create files.
Analyze ./flow.yml and write a Markdown analysis report.
```

No focus means global analysis. A stated focus limits the analysis to the requested area plus the minimum upstream/downstream context needed for accuracy. Multiple related Flows require per-Flow findings plus a cross-Flow relationship and input/output contract summary.

Scene6 is read-only. Do not modify Flow files, rewrite Code nodes or prompts, change bindings, configure plugins, or generate diagrams. Findings are analysis findings; possible risks are not confirmed runtime errors unless runtime evidence exists or the user asks for root-cause diagnosis.

Return analysis in chat by default. Unless the user asked for chat-only output or already requested a report, ask after the chat analysis:

```text
Would you like me to write this as a Markdown analysis report under generate/reports/?
```

An explicit report request counts as confirmation for a new report under `generate/reports/`, subject to overwrite, ambiguous-path, outside-case, and sensitive-content checks. Use `assets/report-templates/flow-analysis-report.md` as an adaptable structure.

Handoffs:

- user asks to change the Flow: Scene3;
- user asks why a failure happens: Scene4;
- user asks for Mermaid, SVG, HTML, image, or another diagram: Scene5;
- user asks to use the analyzed Flow to build a new Flow: Scene2.

Local structure analysis does not normally need web verification. Verify current Dify behavior before exact claims about DSL fields, node semantics, iteration/loop behavior, concurrency, structured output, plugin/tool behavior, or import compatibility. Label conclusions as local observation, local inference, externally verified, or unknown.

## Raw-first debugging

Accept `.md`, `.txt`, `.json`, `.log`, `.yml`, `.yaml`, mixed Dify panel content, invalid JSON-like text, stack traces, and empty output plus error text. Preserve raw evidence, normalize internally, ask only for missing essentials, and redact secrets/private URLs without losing diagnostic meaning. Default to a concise debug summary. Use `assets/report-templates/debug-report-classic.md` only for a requested or confirmed formal report.

## Dify implementation output

Use node names first. Explain inputs, source bindings, variables, types, outputs, and downstream consumers. Give complete code-node replacements with inputs/returns/guards/dependencies. For LLM nodes, separate system and user prompts, list prompt bindings, and state whether upstream context is used as context input, a prompt variable, or both. Disclose plugin/auth and missing nested Flow dependencies without inventing schemas or credentials.

When LLM output must be JSON, ask whether the user wants Dify JSON Schema configuration, prompt-only JSON instructions, or both, and document the fields, types, and downstream consumer. If Dify or model support cannot be confirmed, use prompt-only JSON instructions, state that output can still fail, recommend downstream validation, and recommend current verification before final Dify-specific implementation.

Note that LLM prompt requests should not create another primary scene. Treat them as node-level work inside Scene1/2/3/4, or Scene6 when the user only wants read-only prompt analysis.

## Diagrams and references

For explicit diagram requests, determine use scenario, detail level, and method. Use `assets/diagram-references/` for optional style/method guidance. Treat `assets/reference-flows/` as non-authoritative examples only.

## Web verification and scripts

Verify official or primary online sources before complete importable YAML, exact current schema claims, current plugin configuration claims, ambiguous Dify-specific diagnoses, reliance on reference examples as current standards, or final claims about Dify LLM structured output, JSON Schema, model support, context binding, and exact UI configuration. If unavailable, label the result unverified.

Scripts are optional and safe/read-only by default. Review CLI help before use. They never override confirmations, source preservation, output paths, web verification, secret handling, or Git restrictions.

Keep Codex CLI as the primary usability target. Keep Markdown plain and scripts standard Python 3 so Claude Code remains compatible where practical.
