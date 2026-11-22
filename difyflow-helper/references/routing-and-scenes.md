# Routing and Scenes

Infer the primary scene from the request. Do not require the user to name a scene.

## Priority

1. Errors, failed runs, wrong output, parsing failures, tool failures, import failures, or runtime evidence route to Scene4.
2. An explicit diagram request routes to Scene5.
3. Modification of an existing Flow routes to Scene3.
4. New development based on an existing Flow or reusable logic routes to Scene2.
5. New development without a reference routes to Scene1.
6. Read-only explanation, review, comparison, tracing, or documentation routes to Scene6.

LLM prompt work is node-level work within the applicable scene. Use Scene6 for prompt analysis only, Scene4 for prompt-related failures, and Scene3 for prompt changes in an existing Flow.

## Scene1: New Flow

Clarify or infer the business goal, inputs, outputs, node responsibilities, risks, and next deliverable. Confirm before complete importable YAML and verify current Dify behavior.

## Scene2: Reference-based development

Read the referenced Flow from the current case. Explain reusable structure, business-specific parts, required changes, missing dependencies, and old-to-new mapping. Confirm the desired deliverable before complete YAML.

## Scene3: Modify an existing Flow

Locate the target node, trace upstream inputs and downstream consumers, and provide a modification plan before editing or generating a modified copy.

## Scene4: Debug first

Identify the failing Flow or node, error, actual input and output, expected output, and recent change. Diagnose from evidence, state uncertainty, and confirm before a debug-driven source change.

## Scene5: Explicit diagram generation

Use only when the user explicitly asks for a diagram or diagram format. Determine the use, detail level, source, method, and output format before generating files.

## Scene6: Flow analysis

Analyze one or more existing Flows without modification. Use global, focused, or multi-Flow analysis. Return chat output by default. Write a report only after request or confirmation.

When intents are combined, use the highest-priority scene and treat analysis as a supporting phase.
