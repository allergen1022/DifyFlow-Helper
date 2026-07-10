# DifyFlow-Helper-Skill

**English** | [简体中文](./README_CN.md)

> An Agent Skill for Dify Flow / Workflow / Chatflow tasks. It helps an agent analyze existing Flows, understand the available materials, assess the impact of proposed changes, and act only after the user confirms what should be modified or generated.

DifyFlow-Helper is not designed for a single role. General users, product managers, delivery teams, developers, and maintainers can describe their goals in natural language or provide existing Flows, error messages, node inputs and outputs, prompts, analysis questions, and reference materials.

Its goal is to make an agent's Dify Flow work more controlled, transparent, and safe:

- **Analyze before acting:** identify the task, read only the relevant materials, explain existing Flow logic when requested, and propose an approach before generating or rewriting files.
- **Diagnose before modifying:** when a node fails, output becomes abnormal, or a runtime error appears, debugging takes priority over changing the Flow.
- **Confirm before creating side effects:** complete YAML files, modified Flow copies, reports, diagrams, and prompt artifacts are generated only after user confirmation.
- **Explain work at the node level:** describe node names, input bindings, output variables, data formats, downstream impact, and the corresponding settings in the Dify UI.
- **Accept raw materials:** users are not forced into complex forms. `.md`, `.txt`, `.json`, `.log`, `.yml`, `.yaml`, content copied from Dify panels, and mixed error text are all valid inputs.
- **Keep generated artifacts out of the Skill:** confirmed outputs are written to the current case or project under `generate/`, never into the installed Skill or `user-kit/`.

> **Skill principle:** turn the agent into a Dify Flow assistant that analyzes, asks, confirms, and protects source files—not a script that rewrites YAML without permission.

---

## Table of Contents

- [Project Overview](#project-overview)
- [What It Can Do](#what-it-can-do)
- [30-Second Quick Start](#30-second-quick-start)
- [Preparing Materials with `user-kit`](#preparing-materials-with-user-kit)
- [Repository Contents](#repository-contents)
- [Installation](#installation)
- [How `generate/` Is Created](#how-generate-is-created)
- [Node-Level Output](#node-level-output)
- [LLM Prompts and JSON Output](#llm-prompts-and-json-output)
- [Optional Helper Scripts](#optional-helper-scripts)
- [Safety and Confirmation](#safety-and-confirmation)
- [What This Project Is Not](#what-this-project-is-not)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The core of DifyFlow-Helper is `difyflow-helper/`, an Agent Skill installed for use by an agent.

It guides the agent through Dify Flow / Workflow / Chatflow design, reference-based development, modification, debugging, read-only Flow analysis, node input and output analysis, code nodes, LLM prompts, plugin and authorization risks, and explicitly requested logic or architecture diagrams.

The repository also includes an optional `user-kit/` for preparing requirements, Flows, error details, prompts, and diagram materials. `user-kit/` is not a Skill and does not need to be installed.

You do not need to decide whether you are acting as a product manager, delivery specialist, or developer before using the project. Describe the goal, provide whatever materials you already have, and let the agent determine the task type.

Typical users include:

- people designing a Dify Flow from scratch;
- product or delivery teams adapting logic from an existing Flow or a similar use case;
- developers modifying nodes, prompts, code, or variable bindings;
- maintainers investigating node failures, abnormal output, JSON parsing errors, or plugin failures;
- users who want to understand, review, compare, or document one or more existing Flows without changing them;
- teams turning Flow logic into Mermaid, SVG, HTML, or diagrams suitable for Word and PowerPoint.

---

## What It Can Do

DifyFlow-Helper covers six primary task types. Users do not need to remember the numbering or select a role in advance; the agent infers the task from the request and available materials.

| Scenario | Best suited for | How the agent handles it |
|---|---|---|
| **1. Design a new Flow from scratch** | You have a business goal but no existing Flow or reusable logic | Clarifies or infers the goal, asks whether an overall node framework is needed, and explains node responsibilities, inputs, outputs, risks, and recommendations. A complete importable YAML is considered only after confirmation. |
| **2. Build a new Flow from a reference** | You have an older Flow, a similar use case, or reusable logic | Reads the specified reference materials, separates reusable logic from parts that must change, and lets the user choose between an overall framework, selected nodes, code, prompts, or a complete YAML. |
| **3. Modify an existing Flow** | You need to change nodes, code, variable bindings, prompts, or output structure | Locates the target node, traces upstream inputs and downstream consumers, and proposes a modification plan first. Direct edits or generated modified files require confirmation. |
| **4. Debug a Flow error** | A Flow does not run, a node fails, output is abnormal, or errors such as `JSON.parse`, `error_msg`, plugin failures, or tool failures appear | **Diagnoses first, modifies second.** Focuses on the failing Flow and node, error details, actual input and output, expected output, and recent changes. After identifying the cause, it asks whether to fix the issue or generate a report. |
| **5. Create a logic or architecture diagram** | You explicitly need Mermaid, JavaScript, SVG, HTML, an image, or a diagram suitable for Word or PowerPoint | Activates only when diagram output is explicitly requested. Confirms the intended use, level of detail, implementation method, and visual style before generating content or files. |
| **6. Analyze one or more existing Flows** | You want to understand, review, compare, trace, or document existing Flow logic without changing it | Performs global analysis when no focus is specified, or focused analysis of Code nodes, LLM prompts, conditions, iterations, loops, bindings, tools, plugins, nested Flows, or cross-Flow contracts. Responds in chat by default and creates a Markdown analysis report only after request or confirmation. |

LLM node prompts are a cross-cutting node-level capability rather than a separate primary scene. They are used across new development, reference-based work, modification, debugging, and read-only Flow analysis. See [LLM Prompts and JSON Output](#llm-prompts-and-json-output).

---

## 30-Second Quick Start

### 1. Prepare only the materials you already have

A case folder can stay very simple. No fixed workspace structure is required:

```text
case/
├── flow.yml
└── debug.txt
```

You can also skip files entirely and paste the requirement, Flow content, node inputs and outputs, prompt, or error text directly into the chat.

Common supported formats:

```text
.md  .txt  .json  .log  .yml  .yaml
```

Valid JSON is helpful but not required. Content copied from a Dify panel, partial JSON, invalid JSON-like text, stack traces, or an empty output accompanied by an error message can all be used as-is.

### 2. Tell the agent what each item is for

A short instruction with the relevant paths is enough.

Debugging:

```text
Use ./flow.yml as the source Flow and ./debug.txt as the error material. First diagnose why the "Parse Invoice JSON" node fails. Do not modify the source file yet.
```

Modifying an existing Flow:

```text
Analyze the upstream and downstream impact of the "Supplier Risk Assessment" node in ./flow.yml. I need to change its output fields. Provide a modification plan first and do not write files yet.
```

Designing from scratch:

```text
I want to build a supplier document review Flow. Start with the overall node framework, key inputs and outputs, and major risks. Do not generate a complete YAML yet.
```

Reference-based development:

```text
Use the node structure in ./reference-flow.yml as a reference and redesign it for the business fields in ./request.md. First explain which parts are reusable and which are not.
```

Flow analysis:

```text
Analyze ./main-flow.yml and ./related-tool-flow.yml. Explain the overall execution path and focus on the Code nodes, LLM prompts, conditions, and cross-Flow input/output contracts. Do not modify any files. After the analysis, ask whether I want a Markdown report.
```

Organizing an LLM prompt:

```text
Use ./llm-prompt-material.md to reorganize the system prompt and user prompt for this LLM node, and explain which upstream node variables should be bound.
```

Creating a diagram:

```text
Create a node-level logic diagram from ./flow.yml for use in a PowerPoint presentation. Confirm the level of detail and output format before generating files.
```

### 3. Confirm only the deliverables you actually need

The agent may ask whether you want:

- an overall framework or modification advice in chat;
- a node-level input, output, and binding table;
- complete replacement code for a Code node;
- a complete or partial LLM prompt;
- a modified copy of the Flow;
- a debug report;
- a Flow analysis report;
- Mermaid, SVG, HTML, or another diagram format;
- a complete importable YAML.

You only need to confirm the deliverables required for the current task. There is no need to generate everything at once.

---

## Preparing Materials with `user-kit`

`user-kit/` is an optional material-preparation package. **It is not an Agent Skill and does not need to be installed.**

When you are unsure what information to provide, start here:

- English guide: [`user-kit/README.md`](./user-kit/README.md)
- 中文说明: [`user-kit/README_CN.md`](./user-kit/README_CN.md)
- Scenario-based quick start: [`user-kit/quick-start.md`](./user-kit/quick-start.md)

`user-kit/` includes lightweight templates, filled and sanitized examples, reference Flow guidance, and diagram style references. You may copy a single relevant file into your own case folder, or ignore the templates entirely and provide raw materials directly in chat.

Useful entry points:

| What you need | Where to look |
|---|---|
| Lightweight material templates | [`user-kit/templates/`](./user-kit/templates/) |
| Filled and sanitized examples | [`user-kit/examples/`](./user-kit/examples/) |
| Flow analysis template and example | [`user-kit/templates/flow-analysis-request.md`](./user-kit/templates/flow-analysis-request.md), [`user-kit/examples/flow-analysis/request.md`](./user-kit/examples/flow-analysis/request.md) |
| Shared reference Flow guidance | [`user-kit/reference-flows/`](./user-kit/reference-flows/) |
| Diagram styles and implementation references | [`user-kit/diagram-kit/`](./user-kit/diagram-kit/) |

Private, customer-specific, or case-specific Flows, logs, and prompts should remain in the user's own case or project folder and should not be committed to `user-kit/`.

---

## Repository Contents

The open-source repository root contains four items:

```text
DifyFlow-Helper/
├── difyflow-helper/        # The only installable Agent Skill
├── user-kit/               # Optional user material kit; not installed as a Skill
├── README.md               # English repository documentation
└── README_CN.md            # Chinese repository documentation
```

There are two functional directories:

| Directory | Install as a Skill? | Purpose |
|---|---:|---|
| [`difyflow-helper/`](./difyflow-helper/) | **Yes** | The actual Agent Skill, including the Skill entry point, task routing, confirmation rules, debugging rules, YAML safety rules, node I/O rules, diagram rules, security rules, optional scripts, and installation documentation. |
| [`user-kit/`](./user-kit/) | **No** | An optional user-facing material kit with lightweight templates, sanitized examples, reference Flow guidance, LLM prompt materials, and diagram style references. |

### `difyflow-helper/`: the only installable Skill

```text
difyflow-helper/
├── SKILL.md              # Skill entry point and top-level behavioral boundaries
├── references/           # Routing, confirmation, debugging, YAML, node I/O, diagram, and security rules
├── assets/               # Agent-facing references and optional report templates
├── scripts/              # Optional read-only analysis and basic Mermaid helper scripts
└── docs/                 # Installation instructions and the agent guide
```

Its responsibilities include:

- routing requests across the six primary scenarios, with error-related tasks entering debugging first;
- accepting natural language and irregular raw materials without forcing users into forms;
- treating source `.yml` and `.yaml` files as read-only by default;
- locating nodes primarily by name, with node IDs used as secondary identifiers;
- explaining node inputs, source bindings, data types, output variables, and downstream consumers;
- providing complete replacement code, inputs, return values, type guards, and dependency notes for Code nodes when needed;
- handling LLM prompts, variables, context, JSON output, and downstream parsing relationships;
- analyzing existing single or multiple Flows, including global analysis, focused node analysis, and cross-Flow input/output contracts;
- verifying current or uncertain Dify-specific behavior online when necessary;
- using placeholders or redaction for keys, tokens, authorization headers, cookies, signed URLs, and private data;
- writing confirmed artifacts to the user's current case rather than the installed Skill directory.

See [`difyflow-helper/SKILL.md`](./difyflow-helper/SKILL.md) for the behavioral rules and [`difyflow-helper/docs/AGENT_GUIDE.md`](./difyflow-helper/docs/AGENT_GUIDE.md) for agent-facing usage guidance.

### `user-kit/`: optional material kit

`user-kit/` does not contain the agent's core behavioral rules and does not need to be installed. It helps general users, product teams, delivery teams, and developers prepare requirements, Flows, errors, inputs and outputs, prompts, and diagram materials.

For a first look, start with [`user-kit/README.md`](./user-kit/README.md) and [`user-kit/quick-start.md`](./user-kit/quick-start.md).

---

## Installation

### Installation boundary

> **Install only the `difyflow-helper/` directory. Do not install the repository root or `user-kit/` as a Skill.**

```text
DifyFlow-Helper/
├── difyflow-helper/        # ✅ Install this directory as the Skill root
├── user-kit/               # ❌ Do not install as a Skill
├── README.md               # ❌ Repository documentation
└── README_CN.md            # ❌ Repository documentation
```

After installation, the installed Skill root should directly contain:

```text
SKILL.md
references/
assets/
scripts/
docs/
```

If you must enter another nested `difyflow-helper/` directory before seeing `SKILL.md`, the wrong directory was probably selected as the Skill root.

Compatibility targets:

- **Primary:** Codex CLI
- **Secondary:** Claude Code
- **Other agents:** best-effort compatibility, without compromising the core behavior for Codex CLI or Claude Code

Skill locations and installation commands may differ across agents, CLIs, IDEs, and versions. Follow the current official installation guidance for your environment.

### Option A: ask an agent to install it

Give the repository URL to the agent and explicitly instruct it to install only `difyflow-helper/`.

Copyable installation prompt:

```text
Install DifyFlow-Helper from the following GitHub repository:

<Paste the GitHub repository URL here>

Installation requirements:
1. Install only the difyflow-helper/ directory and treat it as the Skill root.
2. Do not install the DifyFlow-Helper/ repository root.
3. Do not install user-kit/ as a Skill.
4. After installation, verify that SKILL.md, references/, assets/, scripts/, and docs/ are located directly under the installed Skill root.
5. Follow the official Skill installation instructions for your current agent, CLI, IDE, or environment when choosing the destination and installation method.
6. When finished, report the actual installation path and verification result.
```

Short version:

```text
Install the difyflow-helper/ directory from this repository as an Agent Skill. Do not install the repository root or user-kit/. Verify that SKILL.md is directly under the installed Skill root, and report the installation path.
```

### Option B: install it manually

1. Clone or download this repository.
2. Check the Skill installation instructions for your current agent, CLI, or IDE.
3. Add or copy the repository's `difyflow-helper/` directory as the Skill root.
4. Do not select the `DifyFlow-Helper/` repository root or `user-kit/`.
5. Verify that `SKILL.md` is directly under the installed Skill root.

Repository-specific installation boundaries are documented in [`difyflow-helper/docs/INSTALL.md`](./difyflow-helper/docs/INSTALL.md).

### Is Python required?

Installing and using the `difyflow-helper` Skill itself **does not require Python**.

The `scripts/` directory contains a small set of optional Python helpers for read-only Flow YAML inspection, node extraction, suspected-secret scanning, and basic Mermaid generation. These helpers are not prerequisites for normal Skill operation.

- Installing and using the Skill: Python is not required.
- Asking the agent to read, analyze, plan, debug, or organize prompts: Python is not required.
- Running `scripts/*.py` locally: a Python environment is required.
- Running YAML parsing helpers may also require `PyYAML`.

Helper scripts cannot override the Skill's safety rules. Source Flows remain read-only by default, and direct modification, overwriting, or generation of a complete importable YAML still requires user confirmation.

---

## How `generate/` Is Created

Users do **not** need to create `generate/` in advance, and it is not a pre-created workspace inside the repository.

Only after the user explicitly requests or confirms file output does the agent create `generate/` and the necessary subdirectories under the current case or project:

```text
case/
├── flow.yml
├── debug.txt
└── generate/                     # Created on demand after confirmation
    ├── yml/                      # New or modified Flow files
    ├── reports/                  # Debug reports, analysis reports, and modification plans
    ├── prompts/                  # System/User prompts and JSON output specifications
    ├── diagrams/
    │   ├── mermaid/
    │   ├── javascript/
    │   ├── svg/
    │   ├── html/
    │   └── images/
    └── code/                     # Standalone code files explicitly requested by the user
```

Typical paths include:

```text
generate/yml/invoice-check.modified.yml
generate/reports/invoice-check-debug-report.md
generate/reports/order-routing-flow-analysis-report.md
generate/reports/customer-support-multi-flow-analysis-report.md
generate/prompts/supplier-review-system-prompt.md
generate/prompts/supplier-review-user-prompt.md
generate/prompts/supplier-review-json-output-spec.md
generate/diagrams/mermaid/invoice-check-logic.mmd
generate/diagrams/html/invoice-check-diagram.html
generate/code/json-normalizer.js
```

After writing or proposing a file, the agent should state its exact relative path. Generated content is not written into the installed `difyflow-helper/` directory or into `user-kit/`.

When the user requests chat-only output, `generate/` is not created.

---

## Node-Level Output

When a task involves node design, modification, debugging, or read-only Flow analysis, the Skill can provide the following details when relevant:

| Area | What it explains |
|---|---|
| Node identification | Node name as the primary locator, with node ID as a secondary reference |
| Input bindings | Dify parameter names, source nodes, source variables, and data types |
| Output definitions | Output variables, data shape, and downstream consumers |
| UI instructions | What the user should bind or change in the Dify UI |
| Code nodes | Complete replacement code, inputs, return values, null and type handling, and third-party dependencies |
| LLM nodes | System prompt, user prompt, variables, context, JSON fields, and downstream parsing impact |
| External dependencies | Plugins, APIs, authorization, nested Tool Flows, and missing Flow dependencies |
| Flow analysis | Global Flow explanation, focused Code/LLM/condition/iteration analysis, and multi-Flow input/output contracts |

If the current Flow invokes a nested Flow or Tool Flow that has not been provided, the agent identifies the missing dependency instead of inventing its output structure.

---

## LLM Prompts and JSON Output

LLM node prompt work is a node-level capability of DifyFlow-Helper, not a separate primary scene.

Across new development, reference-based work, modification, and debugging, the Skill can help with:

- separating and organizing the system prompt and user prompt;
- identifying which node and variable should provide each prompt binding;
- determining whether context comes from a retrieval node, an upstream node, or a prompt variable;
- designing JSON output fields and their downstream consumers;
- debugging invalid JSON, missing fields, and downstream parsing failures;
- analyzing existing LLM prompts and bindings without rewriting them;
- distinguishing native Structured Output / JSON Schema support from prompt-only JSON constraints when the current environment is uncertain;
- writing longer prompts, prompt modification plans, JSON output specifications, or JSON Schema drafts to `generate/prompts/` after confirmation.

When a user requests only a partial prompt change, the agent should not replace the complete prompt by default. Full replacement or file output requires confirmation.

---

## Optional Helper Scripts

The Skill includes a small set of optional Python helpers, but its core behavior does not depend on them. The scripts are read-only by default and cannot bypass confirmation, safety, or verification rules.

| Script | Purpose |
|---|---|
| `inspect_dify_yaml.py` | Produces a high-level summary of a Flow |
| `extract_node_index.py` | Extracts node names, types, and IDs |
| `extract_node_io.py` | Extracts potential node input and output configuration clues |
| `scan_secrets.py` | Scans for suspected sensitive values and reports only redacted results |
| `generate_mermaid_from_flow.py` | Generates a basic Mermaid draft when diagram output has been explicitly requested |

Python 3.10+ is recommended. YAML-reading scripts require `PyYAML`. See [`difyflow-helper/scripts/SCRIPT_INDEX.md`](./difyflow-helper/scripts/SCRIPT_INDEX.md) for details.

---

## Safety and Confirmation

Generating or modifying a Dify Flow can affect source files, plugins, credentials, node bindings, and downstream behavior. DifyFlow-Helper separates low-risk analysis from actions that create side effects:

```text
The user describes a task or provides materials
        ↓
The agent identifies the scenario and reads only relevant content
        ↓
The agent analyzes the issue, gathers essential details, and proposes a plan
        ↓
The user confirms the deliverable and scope of action
        ↓
The agent generates files, modifies a copy, or performs another confirmed action
```

Explicit confirmation is required before:

- generating a complete importable Dify YAML / YML / DSL;
- directly modifying a source Flow or overwriting an existing file;
- changing a Flow based on a debugging conclusion;
- installing or configuring a plugin;
- using real API keys, tokens, credentials, or authorization values;
- creating a large file artifact when chat output would otherwise be sufficient;
- creating a Markdown Flow analysis report under `generate/reports/` when chat output would otherwise be sufficient;
- performing Git operations;
- replacing a complete prompt when the user requested only a partial change;
- writing long prompts, JSON output specifications, or JSON Schema drafts to files;
- choosing a diagram output format or implementation path that the user has not confirmed.

Additional boundaries:

- **Source file protection:** source YAML and YML files are read-only by default. Even after approval, modified copies should preferably be written under `generate/yml/`.
- **Current-standard verification:** complete importable YAML, exact DSL fields, current plugin configuration, model Structured Output support, and uncertain Dify-specific behavior should be verified against current reliable sources.
- **When online verification is unavailable:** local structure analysis and drafts are still possible, but they must be labeled unverified and must not be presented as compliant with the current import standard.
- **Sensitive information:** real keys, tokens, cookies, authorization headers, complete signed URLs, and unnecessary private data should not be echoed.
- **Plugins and credentials:** placeholders should be used until the user explicitly confirms plugin installation, environment configuration, or use of real credentials.
- **Git:** commands such as `git add`, `commit`, `push`, `reset`, `checkout`, `rebase`, and `merge` are not performed unless explicitly requested.
- **Diagrams:** ordinary analysis does not automatically produce a diagram. Diagram behavior activates only when the user explicitly requests one.
- **Flow analysis:** Scene6 is read-only. It may identify risks and missing evidence, but those findings are not approved modifications or confirmed runtime errors unless the user moves into modification or debugging.
- **Reference Flows:** example or placeholder Flows in the repository do not represent the current official Dify import format and must not be treated as a production baseline without verification.

Short analyses, small tables, code snippets, and concise debugging conclusions are normally returned directly in chat rather than being turned into files for the sake of formality.

---

## What This Project Is Not

DifyFlow-Helper is not:

- an official Dify tool or an official description of the Dify DSL standard;
- an automatic deployment, publishing, or one-click production tool;
- a script that rewrites a user's source Flow without confirmation;
- a workflow management system that forces users to complete complex forms;
- a large Dify example repository;
- a storage location for business Flows, customer data, production logs, or private prompts;
- a replacement for the Dify platform, model capabilities, plugin environments, or user judgment.

The Skill can help organize incomplete materials, but it does not present assumptions as facts. Generated Flows, code, prompts, and diagrams should still be reviewed against the user's own Dify environment, model, plugins, and business data.

---

## Contributing

Contributions are welcome in areas such as:

- improving the behavioral rules under `difyflow-helper/references/`;
- strengthening guidance for Flow analysis, debugging, node I/O, LLM prompts, JSON output, and diagrams;
- improving material examples under `user-kit/templates/` and `user-kit/examples/`;
- adding sanitized reference Flows or diagram style references;
- improving the robustness and documentation of the read-only helper scripts.

Please preserve the following boundaries when contributing:

- do not commit real API keys, tokens, cookies, authorization headers, signed URLs, production logs, or private business data;
- do not place case runtime artifacts inside `difyflow-helper/` or `user-kit/`;
- do not turn `user-kit/` into another Skill;
- do not turn the project into a mandatory workspace or form-driven framework;
- when documenting current Dify behavior, DSL fields, plugin configuration, or model Structured Output capabilities, verify the information against current reliable sources whenever possible.

---

## License

This project is licensed under the [MIT License](./LICENSE).
