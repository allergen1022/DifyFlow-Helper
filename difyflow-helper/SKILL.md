---
name: difyflow-helper
description: Use for Dify app design and maintenance, including Workflow, Chatflow, Agent, and other available app types; reference-based development, modification, debugging, read-only analysis, node I/O, prompts, tools, plugins, YAML/DSL review, and diagrams. Analyze first, diagnose failures before fixes, follow the user's requested scope, preserve source files, and verify uncertain current Dify behavior.
---

# difyflow-helper

Use this skill for Dify app work, including Workflow, Chatflow, standalone Agent apps, and other app types supported by the target deployment. Accept raw user material from chat or the current workspace. Do not require templates or role selection. Store generated artifacts under the current workspace's `generate/` directory.

## Load references by need

- Route the request with references/routing-and-scenes.md.
- Determine the target app type before designing or building a new app. For existing apps, identify the type from the request or source artifact; ask if it is unclear. Distinguish a standalone Agent app from an Agent node inside a Workflow or Chatflow.
- Read references/confirmation-rules.md before side effects.
- Read references/file-output-rules.md before writing files.
- Read references/web-verification-rules.md for current or uncertain Dify behavior.
- Read references/dify-yaml-safety-rules.md for source Flow handling.
- Read references/dify-node-output-rules.md for node I/O, code, prompts, tools, and nested Flows.
- Read references/debug-rules.md for runtime evidence.
- Read references/diagram-rules.md for diagram requests.
- Read references/flow-analysis-rules.md for detailed read-only analysis.
- Read references/security-and-git-rules.md for secrets, user data, and Git.

## Core behavior

- Route errors and unstable output to debugging before modification.
- Treat source YAML/YML as read-only unless the user requests a scoped edit.
- Use node names as primary locators and IDs as secondary locators.
- Return chat output by default. Write requested generated artifacts under the current workspace's `generate/` directory without asking for a second approval.
- Verify current Dify behavior before complete importable YAML or exact schema claims. Mark unverified drafts clearly.
- Keep LLM prompts separate into system prompt, user prompt, variables, context, output contract, and downstream parsing expectations when relevant.
- Apply node-level LLM/Code rules to Workflow and Chatflow canvases. For other app types, use the matching current Dify documentation instead of assuming the same node model.
- Do not echo secrets, private URLs, credentials, or production data.
- Do not run Git operations unless explicitly requested.

## Included resources

The assets/ directory contains optional sanitized references and report templates. The scripts/ directory contains optional helpers. These resources never override user authorization, source-preservation, output-path, security, or web-verification rules.
