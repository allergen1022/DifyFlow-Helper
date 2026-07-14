<div align="center">

[简体中文](./README_CN.md) · **English**

# 🧩 DifyFlow Helper

**A safety-first Agent Skill for designing, analyzing, debugging, and modifying Dify Workflows and Chatflows.**

**Analyze first · Diagnose before modifying · Confirm before writing**

<p>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/allergen1022/DifyFlow-Helper?style=flat-square&label=LICENSE&labelColor=24292f&color=2f81f7" alt="License">
  </a>
  <img src="https://img.shields.io/badge/Codex_CLI-Primary-2ea44f?style=flat-square&labelColor=1f2328" alt="Codex CLI Primary">
  <img src="https://img.shields.io/badge/Claude_Code-Compatible-d97757?style=flat-square&labelColor=1f2328" alt="Claude Code Compatible">
   <img src="https://img.shields.io/badge/Dify-Workflow_%26_Chatflow-6c63ff?style=flat-square&labelColor=1f2328" alt="Dify Workflow and Chatflow">
    <img src="https://img.shields.io/badge/Python-Optional-3776ab?style=flat-square&labelColor=1f2328" alt="Python Optional">
</p>

[Quick Start](#quick-start) · [Installation](#installation) · [Capabilities](#capabilities) · [Safety](#safety) · [Optional](#optional) · [Limitations](#limitations) · [User Kit](#user-kit)

</div>

---

DifyFlow Helper turns an AI agent into a controlled assistant for Dify Flow, Workflow, and Chatflow work—not a script that rewrites YAML without permission.

Give it a business requirement, an existing Flow, a runtime error, node inputs and outputs, an LLM prompt, or raw debugging material. It identifies the task, reads only the relevant materials, explains the impact at node level, proposes a plan, and creates or modifies files only after confirmation.

```text
Requirement / Flow / Error / Prompt / Raw Material
                         │
                         ▼
                DifyFlow Helper
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
    Analyze           Diagnose           Design
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
              Explain impact and plan
                         ▼
                    User confirms
                         ▼
       YAML · Code · Prompts · Reports · Diagrams
```

> [!IMPORTANT]
> Install **only** the [`difyflow-helper/`](./difyflow-helper/) directory as the Agent Skill. The repository root and [`user-kit/`](./user-kit/) are not Skill roots.

<a id="capabilities"></a>

## What It Can Do

DifyFlow Helper covers six primary scenarios. You do not need to select a role or remember a scenario number—the agent infers the task from your request and materials.

| Scenario | Use it when | Default behavior |
|---|---|---|
| **Design a new Flow** | You have a business goal but no existing Flow | Clarifies the goal, designs the node framework, and explains responsibilities, inputs, outputs, risks, and recommendations before considering a complete YAML. |
| **Build from a reference** | You have an older Flow, a similar use case, or reusable logic | Separates reusable structure from business-specific parts and lets you choose whether you need a framework, selected nodes, code, prompts, or a complete Flow. |
| **Modify an existing Flow** | You need to change nodes, code, bindings, prompts, or output fields | Locates the target node, traces upstream inputs and downstream consumers, and proposes a modification plan before writing files. |
| **Debug a Flow error** | A node fails, output is abnormal, JSON parsing breaks, or a plugin/tool call fails | Diagnoses first and modifies second. It focuses on the failing node, actual evidence, expected behavior, and recent changes. |
| **Create a diagram** | You explicitly need Mermaid, SVG, HTML, JavaScript, an image, or a Word/PPT-ready diagram | Confirms the intended use, level of detail, output format, implementation method, and visual style before generation. |
| **Analyze existing Flows** | You want to understand, review, compare, trace, or document one or more Flows without changing them | Performs global, focused, or multi-Flow analysis and returns chat output by default. A Markdown report is optional. |

LLM prompt work is a cross-cutting node-level capability used across design, reference-based development, modification, debugging, and read-only Flow analysis.

### Typical inputs

```text
.md  .txt  .json  .log  .yml  .yaml
```

Valid JSON is helpful but not required. The Skill can work with copied Dify panel content, partial JSON, invalid JSON-like text, stack traces, empty outputs with error messages, model input/output, plugin output, and natural-language requirements.

<a id="quick-start"></a>

## 30-Second Quick Start

### 1. Prepare only what you already have

A case folder can be minimal:

```text
case/
├── flow.yml
└── debug.txt
```

You may also paste the requirement, Flow content, node inputs and outputs, prompt, or error text directly into chat. No fixed workspace structure is required.

### 2. Tell the agent what each item is for

```text
Use ./flow.yml as the source Flow and ./debug.txt as the error material.
First diagnose why the "Parse Invoice JSON" node fails.
Do not modify the source file yet.
```

### 3. Confirm only the deliverables you need

The agent may offer one or more of the following:

- analysis or modification advice in chat;
- a node-level input/output and binding table;
- replacement code for a Code node;
- a complete or partial LLM prompt;
- a modified copy of a Flow;
- a debug or Flow-analysis report;
- Mermaid, SVG, HTML, or another diagram format;
- a complete importable YAML.

Nothing needs to be generated all at once.

<details>
<summary><strong>More copyable prompt examples</strong></summary>

#### Design from scratch

```text
I want to build a supplier document review Flow.
Start with the overall node framework, key inputs and outputs, and major risks.
Do not generate a complete YAML yet.
```

#### Reference-based development

```text
Use the node structure in ./reference-flow.yml as a reference and redesign it
for the business fields in ./request.md.
First explain which parts are reusable and which are not.
```

#### Modify an existing Flow

```text
Analyze the upstream and downstream impact of the "Supplier Risk Assessment"
node in ./flow.yml. I need to change its output fields.
Provide a modification plan first and do not write files yet.
```

#### Analyze multiple Flows

```text
Analyze ./main-flow.yml and ./related-tool-flow.yml.
Explain the overall execution path and focus on Code nodes, LLM prompts,
conditions, iterations, and cross-Flow input/output contracts.
Do not modify files. Ask me afterward whether I want a Markdown report.
```

#### Organize an LLM prompt

```text
Use ./llm-prompt-material.md to reorganize the system prompt and user prompt
for this LLM node, and explain which upstream variables should be bound.
```

#### Create a diagram

```text
Create a node-level logic diagram from ./flow.yml for a PowerPoint presentation.
Confirm the level of detail and output format before generating files.
```

</details>

<a id="installation"></a>

## Installation

### Installation boundary

```text
DifyFlow-Helper/
├── difyflow-helper/        # ✅ Install this directory as the Skill root
├── user-kit/               # ❌ Optional materials; do not install as a Skill
├── README.md               # ❌ Repository documentation
└── README_CN.md            # ❌ Repository documentation
```

After installation, the Skill root should directly contain:

```text
SKILL.md
references/
assets/
scripts/
docs/
```

If you must open another nested `difyflow-helper/` directory before seeing `SKILL.md`, the wrong directory was selected as the Skill root.

### Option A: ask an agent to install it

Copy this prompt and replace the repository URL if necessary:

```text
Install DifyFlow-Helper from this GitHub repository:
https://github.com/allergen1022/DifyFlow-Helper

Requirements:
1. Install only the difyflow-helper/ directory and treat it as the Skill root.
2. Do not install the repository root.
3. Do not install user-kit/ as a Skill.
4. Verify that SKILL.md, references/, assets/, scripts/, and docs/ are directly
   under the installed Skill root.
5. Follow the official installation instructions for the current agent, CLI,
   IDE, or environment.
6. Report the actual installation path and verification result.
```

### Option B: install manually

1. Clone or download this repository.
2. Check the Skill installation instructions for your agent, CLI, or IDE.
3. Add or copy the repository's `difyflow-helper/` directory as the Skill root.
4. Verify that `SKILL.md` is directly under the installed Skill root.

Repository-specific installation notes are available in [`difyflow-helper/docs/INSTALL.md`](./difyflow-helper/docs/INSTALL.md).

### Compatibility

- **Primary target:** Codex CLI
- **Secondary target:** Claude Code
- **Other agents:** best-effort compatibility without weakening the core safety behavior

### Is Python required?

No. Installing and using the Skill itself does not require Python.

Python is required only when you choose to run the optional helper scripts locally. YAML-reading helpers may also require `PyYAML`. The scripts cannot override the Skill's confirmation, source-protection, verification, or security rules.

## How It Works

```text
The user describes a task or provides raw materials
                         │
                         ▼
        The agent identifies the relevant scenario
                         │
                         ▼
          Only relevant rules and files are read
                         │
                         ▼
       Existing logic, evidence, and impact are analyzed
                         │
                         ▼
            A plan or diagnosis is explained
                         │
                         ▼
             The user confirms scope and output
                         │
                         ▼
       Files are created or a copy is modified safely
```

### Core operating principles

| Principle | Behavior |
|---|---|
| **Analyze before acting** | Understand the request and existing materials before generating or rewriting files. |
| **Diagnose before modifying** | Runtime evidence and root-cause analysis take priority when errors are present. |
| **Confirm before side effects** | Complete YAML, modified files, reports, prompt artifacts, diagrams, plugins, credentials, and Git operations require confirmation where applicable. |
| **Protect source Flows** | Source `.yml` and `.yaml` files are read-only by default; modified copies should normally go under `generate/yml/`. |
| **Explain at node level** | Use node names as primary locators and explain bindings, variables, types, shapes, UI settings, and downstream consumers. |
| **Verify current behavior** | Exact current Dify DSL, import/export, plugin, and structured-output claims should be checked against reliable current sources when they matter. |
| **Do not invent missing dependencies** | Missing nested Flows, Tool Flows, plugins, or contracts are identified as missing rather than fabricated. |
| **Keep secrets private** | Keys, tokens, cookies, authorization headers, credentials, signed URLs, and unnecessary private data are redacted or replaced with placeholders. |

## Repository Structure

```text
DifyFlow-Helper/
├── difyflow-helper/                # The only installable Agent Skill
│   ├── SKILL.md                    # Entry point and top-level boundaries
│   ├── references/                 # Routing, safety, debug, I/O, diagram rules
│   ├── assets/                     # Agent references and report templates
│   ├── scripts/                    # Optional read-only helper scripts
│   └── docs/                       # Installation and agent-facing guidance
├── user-kit/                       # Optional material-preparation package
│   ├── templates/
│   ├── examples/
│   ├── reference-flows/
│   ├── diagram-kit/
│   ├── quick-start.md
│   ├── README.md
│   └── README_CN.md
├── README.md
├── README_CN.md
└── LICENSE
```

The behavioral rules live in [`difyflow-helper/SKILL.md`](./difyflow-helper/SKILL.md) and the files under [`difyflow-helper/references/`](./difyflow-helper/references/). Agent-facing usage guidance is available in [`difyflow-helper/docs/AGENT_GUIDE.md`](./difyflow-helper/docs/AGENT_GUIDE.md).

## Generated Artifacts

Users do not need to create `generate/` in advance. It is created under the current case or project only after file output is requested or confirmed.

```text
case/
├── flow.yml
├── debug.txt
└── generate/
    ├── yml/                         # New or modified Flow copies
    ├── reports/                     # Debug, analysis, and modification reports
    ├── prompts/                     # Prompts and JSON output specifications
    ├── diagrams/
    │   ├── mermaid/
    │   ├── javascript/
    │   ├── svg/
    │   ├── html/
    │   └── images/
    └── code/                        # Requested standalone code files
```

Example output paths:

```text
generate/yml/invoice-check.modified.yml
generate/reports/invoice-check-debug-report.md
generate/reports/customer-support-multi-flow-analysis-report.md
generate/prompts/supplier-review-system-prompt.md
generate/prompts/supplier-review-json-output-spec.md
generate/diagrams/mermaid/invoice-check-logic.mmd
generate/diagrams/html/invoice-check-diagram.html
generate/code/json-normalizer.js
```

Generated content is never written into the installed Skill directory or into `user-kit/`. If chat-only output is requested, `generate/` is not created.

## Node-Level Output

When relevant, DifyFlow Helper can explain:

| Area | Output |
|---|---|
| **Node identification** | Node name as the primary locator, with node ID as a secondary reference |
| **Input bindings** | Dify parameter names, source nodes, source variables, and data types |
| **Output definitions** | Output variables, data shape, and downstream consumers |
| **Dify UI actions** | What should be bound, selected, or changed in the UI |
| **Code nodes** | Complete replacement code, expected inputs, returned outputs, type/null guards, dependencies, and placeholders |
| **LLM nodes** | System prompt, user prompt, variables, context, JSON fields, structured-output assumptions, and parser impact |
| **External dependencies** | Plugins, APIs, authorization, nested Tool Flows, and missing Flow dependencies |
| **Flow analysis** | Global execution path, focused node analysis, conditions, loops, iterations, and multi-Flow contracts |

## LLM Prompts and JSON Output

The Skill can help with:

- separating and organizing system and user prompts;
- mapping prompt variables to upstream nodes and outputs;
- identifying whether context comes from retrieval, an upstream node, or a direct variable;
- designing JSON fields and documenting downstream consumers;
- diagnosing invalid JSON, missing fields, and parser failures;
- reviewing an existing prompt without rewriting it;
- distinguishing native Structured Output / JSON Schema support from prompt-only constraints when the environment is uncertain;
- writing confirmed prompt files, output specifications, or JSON Schema drafts under `generate/prompts/`.

A partial prompt request does not automatically authorize full prompt replacement.

<a id="user-kit"></a>

## User Kit

[`user-kit/`](./user-kit/) is an optional material-preparation package. It is **not** an Agent Skill and does not need to be installed.

Use it when you are unsure what to provide or want reusable, sanitized examples:

| Need | Entry point |
|---|---|
| Overview | [`user-kit/README.md`](./user-kit/README.md) |
| Chinese guide | [`user-kit/README_CN.md`](./user-kit/README_CN.md) |
| Scenario-based quick start | [`user-kit/quick-start.md`](./user-kit/quick-start.md) |
| Lightweight templates | [`user-kit/templates/`](./user-kit/templates/) |
| Filled, sanitized examples | [`user-kit/examples/`](./user-kit/examples/) |
| Shared reference Flow guidance | [`user-kit/reference-flows/`](./user-kit/reference-flows/) |
| Diagram styles and implementation references | [`user-kit/diagram-kit/`](./user-kit/diagram-kit/) |

Templates are optional starting points, not mandatory forms. Private business Flows, production logs, credentials, customer data, and private prompts should remain in your own case or project folder.

<a id="optional"></a>

## Optional Helper Scripts

The Skill includes a small set of optional, read-only Python helpers:

| Script | Purpose |
|---|---|
| `inspect_dify_yaml.py` | Produce a high-level summary of a Flow |
| `extract_node_index.py` | Extract node names, types, and IDs |
| `extract_node_io.py` | Extract potential node input/output configuration clues |
| `scan_secrets.py` | Scan for suspected sensitive values and return redacted findings |
| `generate_mermaid_from_flow.py` | Generate a basic Mermaid draft after an explicit diagram request |

Python 3.10+ is recommended for local script use. YAML-reading scripts require `PyYAML`. See [`difyflow-helper/scripts/SCRIPT_INDEX.md`](./difyflow-helper/scripts/SCRIPT_INDEX.md).

<a id="safety"></a>

## Safety and Confirmation

DifyFlow Helper separates low-risk analysis from actions that create side effects.

### Explicit confirmation is required before actions such as

- generating a complete importable Dify YAML/YML/DSL;
- directly modifying or overwriting a source Flow;
- applying a Flow change based on a debugging conclusion;
- installing or configuring a plugin;
- using real API keys, tokens, credentials, or authorization values;
- creating large file artifacts when chat output would otherwise be sufficient;
- creating a formal Flow-analysis report when chat output would otherwise be sufficient;
- replacing a complete prompt when only a partial change was requested;
- writing long prompt or JSON specification artifacts to files;
- choosing an unconfirmed diagram format or implementation path;
- running Git operations such as `add`, `commit`, `push`, `reset`, `checkout`, `rebase`, or `merge`.

### Additional boundaries

- **Current Dify behavior:** exact DSL fields, import/export structure, plugin configuration, and model structured-output behavior should be verified when current accuracy matters.
- **Offline or unavailable verification:** drafts may still be produced, but they must be labeled unverified and not presented as guaranteed current-import-compatible output.
- **Scene 6 is read-only:** Flow-analysis findings are not approved modifications or confirmed runtime errors.
- **Diagrams are opt-in:** ordinary analysis does not automatically generate diagrams.
- **Reference Flows are not standards:** examples and placeholders are not guaranteed to match the current official Dify import format.
- **Chat first:** concise analysis, tables, code snippets, and debugging conclusions are normally returned in chat instead of being turned into files unnecessarily.

<a id="limitations"></a>

## What This Project Is Not

DifyFlow Helper is not:

- an official Dify product or an official specification of the Dify DSL;
- an automatic deployment, publishing, or one-click production tool;
- a script that silently rewrites source Flows;
- a form-driven workflow-management system;
- a storage location for production Flows, customer data, private prompts, or runtime logs;
- a replacement for Dify, model capabilities, plugin environments, testing, or human review.

The Skill can organize incomplete materials, but it does not present assumptions as facts. Generated Flows, code, prompts, and diagrams should be reviewed against your actual Dify environment, models, plugins, and business data.

## Contributing

Contributions are welcome, especially for:

- routing, confirmation, debugging, YAML safety, node I/O, LLM prompt, and diagram rules;
- improved sanitized templates and examples;
- safe reference Flows and diagram style references;
- robustness and documentation of read-only helper scripts.

Please do not commit real credentials, production logs, signed URLs, customer data, private business data, or private prompts. Do not place case runtime artifacts inside `difyflow-helper/` or `user-kit/`, and do not turn `user-kit/` into another Skill.

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Built for controlled, transparent, and safer Dify Flow work.

</div>
