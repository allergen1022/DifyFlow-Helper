---
name: difyflow-helper
description: Use for Dify Workflow or Chatflow design, reference-based development, existing Flow modification, runtime debugging, analysis of one or more existing Flows, Flow structure and relationship analysis, focused analysis of Code nodes, LLM prompts, conditions, iteration, loops, YAML/YML/DSL analysis, node input/output binding, plugin/auth/key risks, and architecture/logic/implementation diagrams when explicitly requested. Prioritize raw user materials, debug-first behavior, node-level IO clarity, explicit confirmations, safe file output to the current case generate/ folder, and web verification for uncertain or current Dify behavior. Primary target Codex CLI; compatible with Claude Code where possible.
---

# difyflow-helper

Use this agent-facing skill for Dify Flow, Workflow, and Chatflow operations. Use universal-user mode; never require the user to choose a developer, product, delivery, or business role.

## Route and load

Read only the relevant references:

- Route Scenes 1–6 with `references/routing-and-scenes.md`. Give Scene4 priority when error language appears. Activate Scene5 only for an explicit diagram request. Use Scene6 for read-only analysis of one or more existing Flows.
- Before consequential actions, read `references/confirmation-rules.md`.
- Before writing files, read `references/file-output-rules.md`.
- For current or uncertain Dify behavior, read `references/web-verification-rules.md`.
- For source Flow handling, read `references/dify-yaml-safety-rules.md`.
- For node IO, code, prompts, plugins, and nested Flows, read `references/dify-node-output-rules.md`.
- For raw runtime evidence, read `references/debug-rules.md`.
- For explicit diagrams, read `references/diagram-rules.md`.
- For detailed Flow analysis behavior, read `references/flow-analysis-rules.md`.
- For secrets, user data, and Git, read `references/security-and-git-rules.md`.

## Operating rules

- Accept raw, messy user material from chat or flat case folders in `.md`, `.txt`, `.json`, `.log`, `.yml`, and `.yaml`. Do not force intake templates or a workspace structure.
- Treat source YAML/YML as read-only by default. Require explicit confirmation for direct edits, overwrites, and complete importable YAML generation.
- Verify current Dify DSL/import/export behavior online before complete importable YAML or exact current-schema claims. If verification is unavailable, label output as an unverified draft.
- Write confirmed artifacts only under the user's current case `generate/` folder and state the exact relative path. Never write user runtime data inside this skill.
- Default LLM prompts to chat. If the user requests prompt files, or confirms file output for prompts too long for reliable chat, write them under the current case `generate/prompts/` folder.
- Use node names as primary locators and ids only as secondary locators. Explain bindings, variables, data types, shapes, and downstream consumers clearly.
- Provide complete replacement code for code nodes when needed, with expected inputs, returned outputs, guards, dependencies, and placeholders instead of secrets.
- For LLM nodes, separate system prompt, user prompt, variables, context usage, structured JSON output requirements, and downstream parser expectations when relevant.
- For Scene6, analyze existing Flows without modification. Use global analysis when no focus is specified, focused analysis when the user names Code nodes, LLM prompts, conditions, iteration, loops, bindings, tools, plugins, nested Flows, or other areas, and multi-Flow analysis when several related Flows are provided. Return chat output by default; create a Markdown analysis report only after request or confirmation.
- Do not claim exact Dify LLM node JSON Schema or structured-output support without current verification when environment or model details matter.
- Require confirmation before plugin installation/configuration, real credentials, debug-driven changes, Git operations, or large file artifacts. Never echo real secrets or full signed/private URLs.
- Do not run Git operations unless explicitly requested.

## Optional resources

- Treat `assets/reference-flows/` as optional agent reference, never as a guaranteed current Dify standard without web verification.
- Use `assets/diagram-references/` only when the user explicitly requests a diagram.
- Use `assets/report-templates/` only for requested or confirmed formal reports; default debug output is concise chat.
- Treat scripts as optional safe helpers. They never override confirmation, web-verification, source-preservation, output-path, or security rules.
