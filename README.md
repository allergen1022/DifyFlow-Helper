<div align="center">

# DifyFlow Helper

<img src="./assets/logo-robot-2-redraw.svg" width="196" height="196" alt="DifyFlow Helper flow mark">

**A practical Agent Skill for building, understanding, debugging, and changing Dify apps.**

From a rough requirement or an existing Flow to a clear design, a grounded diagnosis, or a carefully scoped change.

<p>
  <img src="https://img.shields.io/badge/Agent_Skill-Dify-168A76?style=flat-square" alt="Dify Agent Skill">
  <img src="https://img.shields.io/badge/Apps-Workflow_%7C_Chatflow_%7C_Agent-245A50?style=flat-square" alt="Workflow, Chatflow, and Agent apps">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-E1B454?style=flat-square" alt="MIT License"></a>
</p>

[简体中文](./README_CN.md) · **English**

[What it does](#what-it-does) · [Quick start](#quick-start) · [Install](#install) · [How it works](#how-it-works) · [Resources](#resources)

</div>

---

## What It Does

DifyFlow Helper gives an agent a focused way to work with Dify applications. Bring a goal, a Flow export, a question about a node, or the raw evidence from a failed run. The agent works from what you provide, explains the relevant logic and impact, and follows the scope of your request.

| Work | What the Skill helps with |
|---|---|
| **Design or build** | Shape a new app around its intended type, inputs, outputs, and behavior. Work with Workflow, Chatflow, standalone Agent apps, and other app types supported by the target Dify deployment; prepare node plans, code, prompts, or a complete YAML when requested. |
| **Reuse a Flow** | Separate reusable structure from case-specific logic and adapt only what fits the new goal. |
| **Change an existing app** | Trace node inputs, bindings, outputs, and downstream consumers before making a targeted change. |
| **Debug a failure** | Work from raw logs, panel output, node inputs and outputs, stack traces, or error text. Diagnose the reported failure before changing the Flow. |
| **Understand or compare Flows** | Explain execution paths, node responsibilities, conditions, loops, prompts, dependencies, and cross-Flow contracts without changing the source. |
| **Prepare a deliverable** | Create a requested development document, report, prompt artifact, code file, or diagram in the appropriate format. |

For a new app, the app type is established before design when it changes the architecture. Existing app types are inferred from the request or source where possible. Workflow and Chatflow node canvases share useful guidance; other app types are handled according to their own configuration and current documentation.

At node level, the Skill can trace configured inputs to source variables, describe output shapes and downstream consumers, and map prompt variables to their bindings. It distinguishes native structured-output support from prompt-only instructions when that detail matters, and verifies exact Dify behavior before presenting it as current.

### Semantic decisions and exact operations

In Workflow and Chatflow designs, LLM nodes handle meaning: interpreting language, classifying by intent, or composing natural-language content. Code or native logic handles deterministic work such as exact calculations, fixed mappings, validation, and data shaping. When both are needed, keep each responsibility clear and pass only the context required for the task.

### Focused code and prompt work

For a targeted Code-node or LLM-prompt task, an optional helper can extract the relevant content from an exported Flow. The extraction is a read-only working view; bindings and surrounding Flow context still need to be checked. Developers can also choose to exercise a Code node locally with representative inputs and breakpoints, using its configured JavaScript or Python signature. A local check does not establish behavior inside Dify's runtime.

## Quick Start

You can paste the request and relevant material into chat, or point the agent to files you already have. No case-folder template is required.

```text
Use ./flow.yml as the source Flow and ./run-log.txt as the failure evidence.
Diagnose why the "Parse Result" Code node returns an empty object.
Explain the likely cause and the evidence behind it. Do not change the Flow yet.
```

For a new app, state the type when you know it. If the type is unclear and affects the design, the agent will resolve that choice before moving on.

```text
I need a Dify Workflow that normalizes uploaded records and classifies their
meaning. Propose the node responsibilities, inputs, outputs, and key risks.
Keep semantic judgment in the LLM step and exact normalization in code.
```

Other common requests include:

```text
In ./flow.yml, update the "Normalize Result" node to return the new fields.
Trace its bindings and downstream users, then make only that scoped change.
```

```text
Compare ./main.yml and ./called-flow.yml. Explain their call relationship,
input/output contracts, and any missing information. Do not modify them.
```

## Install

Install **only [`difyflow-helper/`](./difyflow-helper/)** as the Agent Skill. That directory is the skill: it contains `SKILL.md` and the references, assets, scripts, and guidance used by it. When installing from this repository, select that directory as the skill root; do not install the repository root or `user-kit/` as a skill.

The skill uses the shared `SKILL.md` format and is compatible through each tool's skill loader:

- **Coding agents:** Codex, Claude Code, OpenCode, ZCode, and other coding agents that support the Agent Skills format.
- **Agent harnesses / runtimes:** Pi (includes a coding-agent CLI), DeepSeek Harness (enable its local skill provider), and other harnesses/runtimes that support the Agent Skills format.
- **Personal and workplace assistants:** Hermes Agent, OpenClaw, WorkBuddy (manual upload), and other assistants that support the Agent Skills format.

After installation, `SKILL.md` should be directly inside the selected skill root. Use your agent's current official instructions for adding a skill from a repository or local directory. See [the installation notes](./difyflow-helper/docs/INSTALL.md) for the package boundary.

The skill itself does not require Python. Python is needed only for optional local helper scripts; scripts that read YAML may require `PyYAML`.

## How It Works

- **Start with the request and available evidence.** Raw text and partial materials are useful; a rigid intake form is not required.
- **Read only what the task needs.** The entry skill routes to focused references for design, modification, debugging, analysis, diagrams, and safety.
- **Use the right source of truth.** Existing Flow configuration and runtime evidence ground the analysis. Current Dify behavior and integration parameters are checked against official documentation when exact details matter.
- **Keep changes scoped.** Requested modifications and debug fixes use the source file with a minimal diff. `generate/` is reserved for newly created artifacts, or a modified copy when you ask to preserve the source. It is created only when needed, not during installation.
- **Keep the response useful.** Chat is the default for analysis, plans, code snippets, and concise findings. Reports, development documents, and diagrams are produced when requested. A clear request is enough to authorize its scoped work; the agent asks only when a missing choice materially changes the result.

### Tools, plugins, APIs, and MCP

When an external integration is requested and its parameter choices are open, the agent checks whether documented defaults are enough or task-specific parameters are needed. It verifies custom parameters against the provider's official documentation and the target Dify behavior instead of inventing configuration.

For directly importable Flows, it checks the official Dify/DSL version guidance and reports the version basis. When plugins, tools, APIs, or MCP servers are involved, it also reports relevant integration version and compatibility findings; confirm unresolved version details against the destination environment before import or use.

### Sensitive information

Use a protected secret-storage mechanism supported by the target Dify version and integration. Do not assume a value is encrypted because it is placed in an environment variable, hidden input, prompt, Code node, or exported file. When reviewing YAML or configuration, the Skill looks for likely credentials and reports findings without repeating secret values.

## Resources

### Optional helpers

The helper scripts can inspect exported YAML, list nodes, extract likely I/O configuration, extract Code and LLM prompt content, scan for likely secrets with redacted findings, and draft a Mermaid graph. They are not required to use the Skill and do not replace review of the original Flow.

See the [script index](./difyflow-helper/scripts/SCRIPT_INDEX.md) for available helpers and usage notes.

When requested, development documents can follow the English or Chinese style reference included with the Skill. The references are adaptable examples, not fixed schemas. Diagrams can be prepared in formats such as Mermaid, SVG, HTML, or JavaScript according to the requested use.

### User Kit

[`user-kit/`](./user-kit/) is a separate, optional collection of bilingual templates, examples, reference Flows, and diagram references. It is not part of the skill installation. Use only the parts that help; you can also work directly from your own files or chat material.

- [English materials](./user-kit/en_US/)
- [简体中文材料](./user-kit/zh_CN/)

### Documentation

- [Agent guide](./difyflow-helper/docs/AGENT_GUIDE.md)
- [Installation notes](./difyflow-helper/docs/INSTALL.md)
- [Skill entry point](./difyflow-helper/SKILL.md)

## Project Boundaries

DifyFlow Helper is an independent community skill, not an official Dify product or a guarantee that a generated draft matches every Dify version. It does not deploy apps or silently rewrite source Flows. Importable YAML, integrations, code, and prompts should be reviewed against the target environment and tested as appropriate.

Reference examples and the User Kit are optional aids, not required inputs or authoritative Dify specifications. Keep real credentials, production logs, customer information, private prompts, and case-specific Flow data in your own workspace, not in this repository.

## License

Released under the [MIT License](./LICENSE).
