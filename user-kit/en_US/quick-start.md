# Quick Start

Prepare only the materials you already have. Templates are optional, and raw text can be pasted directly into the agent request.

## New or Modified Flows

Use `new-flow-request.md`, `reference-flow-request.md`, or `modify-flow-request.md`. State the relevant file paths. For a new app, name its type when known; if the choice affects the design, settle the app type first. If the Flow must be directly importable, provide the target Dify version when known. The agent checks official current DSL guidance and reports the Dify/DSL and required integration versions it verified; confirm these against the destination environment before import.

## Debugging

Use `debug-material.md`, or provide `.txt`, `.json`, `.log`, error text, node inputs, and node outputs directly. The material does not need to be valid JSON. For focused Code-node or prompt work, relevant content can be extracted from an exported Flow; the source bindings still need review.

## Prompt Work

Use `llm-prompt-material.md`. Include the Flow file when variable bindings or node context matter.

## Flow Analysis

Use `flow-analysis-request.md`, or name one or more Flows directly. Analysis is chat-only by default and does not modify source files.

## Diagrams

Use `diagram-request.md` and consult `diagram-kit/` for format, method, and style references. Diagrams are generated only when explicitly requested.

## Output directories

Newly created files go under the current case's `generate/` directory. For requested edits or debug fixes, the source file is changed with a minimal diff by default; ask for a copy in `generate/` when you need to keep the source unchanged. The directory is created only when needed:

```text
generate/yml/
generate/reports/
generate/prompts/
generate/diagrams/mermaid/
generate/diagrams/javascript/
generate/diagrams/svg/
generate/diagrams/html/
generate/diagrams/images/
generate/code/
```

Do not place business data or generated files inside `user-kit/` or the installed `difyflow-helper/` skill.
