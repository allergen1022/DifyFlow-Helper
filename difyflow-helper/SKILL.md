---
name: difyflow-helper
description: Use for Dify Workflow and Chatflow design, reference-based development, modification, debugging, read-only Flow analysis, node I/O, prompts, tools, plugins, YAML/DSL review, and explicitly requested diagrams. Analyze first, diagnose before modifying, confirm before writing, preserve source files, and verify uncertain current Dify behavior.
---

# difyflow-helper

Use this skill for Dify Workflow and Chatflow work. Accept raw user material from chat or the current case folder. Do not require templates, role selection, or a fixed workspace layout.

## Load references by need

- Route the request with references/routing-and-scenes.md.
- Read references/confirmation-rules.md before side effects.
- Read references/file-output-rules.md before writing files.
- Read references/web-verification-rules.md for current or uncertain Dify behavior.
- Read references/dify-yaml-safety-rules.md for source Flow handling.
- Read references/dify-node-output-rules.md for node I/O, code, prompts, tools, and nested Flows.
- Read references/debug-rules.md for runtime evidence.
- Read references/diagram-rules.md for explicit diagram requests.
- Read references/flow-analysis-rules.md for detailed read-only analysis.
- Read references/security-and-git-rules.md for secrets, user data, and Git.

## Core behavior

- Route errors and unstable output to debugging before modification.
- Treat source YAML/YML as read-only by default.
- Use node names as primary locators and IDs as secondary locators.
- Return chat output by default. Write confirmed artifacts only under the current case generate/ directory.
- Verify current Dify behavior before complete importable YAML or exact schema claims. Mark unverified drafts clearly.
- Keep LLM prompts separate into system prompt, user prompt, variables, context, output contract, and downstream parsing expectations when relevant.
- Do not echo secrets, private URLs, credentials, or production data.
- Do not run Git operations unless explicitly requested.

## Included resources

The assets/ directory contains optional sanitized references and report templates. The scripts/ directory contains optional read-only helpers. These resources never override confirmation, source-preservation, output-path, security, or web-verification rules.
