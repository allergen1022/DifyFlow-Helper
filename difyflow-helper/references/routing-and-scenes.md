# Routing and Scenes

Infer the scene from natural language; do not require the user to name it.

## Priority

1. Route errors, wrong output, `error_msg`, stack traces, tool failures, `JSON.parse`, `exit status`, import errors, “报错”, or “跑不起来” to Scene4 first.
2. Route an explicit diagram request to Scene5.
3. Route modification of an existing Flow to Scene3.
4. Route new development using a reference Flow or reusable logic to Scene2.
5. Route new development without a reference to Scene1.
6. Route analysis, explanation, review, inspection, comparison, tracing, or documentation of one or more existing Flows to Scene6 when no higher-priority scene is primary.
7. LLM prompt handling is a cross-cutting node-level capability, not a separate primary Scene. When the user asks to design, organize, modify, debug, analyze, or output an LLM node prompt, route the task through the relevant scene: Scene1 for new Flow design, Scene2 for reference-based development, Scene3 for existing Flow modification, Scene4 when the prompt is related to an error or unstable output, and Scene6 when the user only wants read-only prompt analysis.

## Scene1: Pure new Flow

Clarify or infer the business goal and whether the user wants an overall logic/node framework first. Provide agreed design direction, suggestions, node IO, risks, and next options. Ask again before complete importable YAML. Generate it only after explicit confirmation and current Dify web verification.

## Scene2: New Flow with reference logic

Ask for or locate the indicated reference Flow in the current case. User-specific reference Flows are not part of the installed skill; they may remain in the current case or in the optional sibling `user-kit/reference-flows/` only when the user or team intentionally maintains a sanitized shared library. Read only relevant files, judge actual reuse value, and explain reusable logic, non-reusable parts, required changes, missing dependencies, and old-to-new mapping. Ask whether to provide a framework, selected nodes, prompts/code, or complete YAML. Full YAML still needs confirmation and web verification.

## Scene3: Modify an existing Flow

Locate the Flow and target node, then trace upstream inputs and downstream consumers. If the target is unclear, identify candidates and assumptions. Default to a modification plan, not direct editing. Accept raw runtime materials if evidence is needed. Ask whether to provide changed content or a confirmed modified copy. Route to Scene1 or Scene2 when the current Flow is unsuitable.

## Scene4: Debug first

Do not jump to modification or read every local file. Identify the failing Flow/node, error, actual input/output, expected output, and recent change when available. Accept messy pasted or file-based evidence. Diagnose and provide a concise likely cause, then offer a fix plan, complete replacement code, confirmed modification, or optional report. Debug-driven edits require confirmation. Scene4 overrides Scene3 while a Flow is failing.

## Scene5: Explicit diagram generation

Activate only when the user explicitly requests a diagram, Mermaid, JavaScript, SVG, HTML, image, or Word/PPT-friendly visual. Ask or infer the use scenario, detail level, method, source, and useful references. Use `assets/diagram-references/` as optional agent reference, never as required user input. If a default draft is accepted, use clear hierarchy, minimal decoration, body text at least 20px, and a larger title.

## Scene6: Flow Analysis

Analyze and explain one or more existing Flows without modifying them. Use global analysis when the user gives no focus. Use focused analysis when the user names Code nodes, LLM prompts, conditions, iteration, loops, node I/O bindings, tools, plugins, nested Flows, cross-Flow contracts, or another area. Use multi-Flow analysis when several related Flows are provided.

Scene6 is chat-first. Read-only inspection and chat output do not require confirmation. A Markdown analysis report is optional and may be written under `generate/reports/` only after the user requests or confirms file output.

Do not rewrite source YAML, Code nodes, prompts, bindings, or plugin configuration. Do not generate diagrams unless the user explicitly asks. Do not treat possible risks as confirmed runtime errors without runtime evidence or a user request for root-cause diagnosis.

Boundary examples:

| Request | Route |
|---|---|
| "Analyze this Flow." | Scene6 |
| "Analyze these three related Flows." | Scene6 |
| "Analyze the Code nodes only. Do not rewrite the code." | Scene6 focused analysis |
| "Analyze the LLM prompt but do not rewrite it." | Scene6 |
| "Analyze why this node fails." | Scene4 |
| "Analyze this Flow and modify node X." | Scene3 |
| "Analyze this old Flow and build a new one from it." | Scene2 |
| "Analyze this Flow and draw a Mermaid diagram." | Scene5 |

When a request combines intents, use the highest-priority applicable scene and treat analysis as a phase or supporting capability.
