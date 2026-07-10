# DifyFlow-Helper User Kit

`user-kit/` is a lightweight material kit for preparing Dify Flow work. It is not an Agent Skill and should not be installed as one.

The real skill package is the sibling directory:

```text
difyflow-helper/
```

Use `user-kit/` as a reference package. Copy only the files you need into your own project or case folder, or simply use them as examples when writing prompts for the agent.

---

## 1. Simplest usage

You do not need to complete every template.

Start with the files you already have:

```text
D:/case/
├── flow.yml
└── llm-prompt-material.md
```

Or for debugging:

```text
D:/case/
├── flow.yml
└── debug.txt
```

Or for diagram generation:

```text
D:/case/
├── flow.yml
└── diagram-request.md
```

Or for Flow analysis:

```text
D:/case/
├── flow.yml
└── flow-analysis-request.md     # optional
```

Then tell the agent what each file is for, and specify the file path.

Example:

```text
Please use ./flow.yml as the source Flow and ./llm-prompt-material.md as the LLM node prompt material. Help me reorganize the system prompt and user prompt.
```

For pure Flow analysis, the request file is optional. You can also say:

```text
Analyze ./main-flow.yml and ./related-tool-flow.yml. Explain the overall execution path and focus on Code nodes, LLM prompts, conditions, iteration, bindings, tools, and cross-Flow input/output contracts. Do not modify files. Ask me after the chat analysis whether I want a Markdown report.
```

---

## 2. About `generate/`

`generate/` is not something users need to create manually at the beginning.

It is the output folder that the agent may create under the current case folder **after the user asks for or confirms file output**.

Before agent output:

```text
D:/case/
├── flow.yml
└── llm-prompt-material.md
```

After the user confirms generated files:

```text
D:/case/
├── flow.yml
├── llm-prompt-material.md
└── generate/
    ├── yml/
    ├── reports/
    ├── prompts/
    ├── diagrams/
    └── code/
```

Typical generated output locations:

```text
generate/yml/
generate/reports/
generate/prompts/
generate/diagrams/
generate/code/
```

The agent should not create generated files inside `user-kit/` or inside the installed `difyflow-helper/` skill.

---

## 3. What is inside `user-kit/`

```text
user-kit/
├── templates/
├── examples/
├── reference-flows/
├── diagram-kit/
├── quick-start.md
├── README.md
└── README_CN.md
```

### `templates/`

Lightweight files that users can copy into their own case folder.

Current templates include:

```text
templates/new-flow-request.md
templates/reference-flow-request.md
templates/modify-flow-request.md
templates/debug-material.md
templates/diagram-request.md
templates/llm-prompt-material.md
templates/flow-analysis-request.md
```

These are optional material templates, not strict forms. You may leave fields blank, add your own sections, or paste raw text. For Flow analysis, leaving the focus blank means the agent should perform global analysis.

### `examples/`

Sanitized examples written by the author.

They show how a filled request or material file may look. They are not required project structures.

Flow analysis example:

```text
examples/flow-analysis/request.md
```

### `reference-flows/`

An optional shared reference Flow library.

Use it for reusable, sanitized, team-level or author-maintained reference Flows.

For private or case-specific reference Flows, prefer the current case folder:

```text
D:/case/
├── request.md
└── reference-flow.yml
```

When asking the agent to use a reference Flow, state the path clearly:

```text
Please refer to ./reference-flow.yml for the node structure, but redesign the business fields according to ./request.md.
```

### `diagram-kit/`

Reusable diagram guidance and style references.

Use it when you want to specify diagram style, output format, or method.

Examples:

```text
diagram-kit/style-notes/default-style.md
diagram-kit/style-notes/ppt-style.md
diagram-kit/mermaid/overview-diagram.md
diagram-kit/javascript/svg-diagram-basic.md
```

You can copy a style file into your case folder, or simply reference its path in your prompt.

Note: Diagram scene is distinct from the other scenes. For specific usage, please refer to user-kit/quick-start.md and user-kit/examples/diagram/README.md.

---

## 4. Supported material types

The agent should be able to work with:

```text
.md
.txt
.json
.log
.yml
.yaml
```

It should also accept:

- pasted Dify panel content,
- partial or invalid JSON,
- raw error text,
- model input/output,
- plugin/tool output,
- Node.js or Python errors,
- natural-language requirements,
- LLM system prompt and user prompt text,
- context descriptions and expected JSON output requirements.

Valid JSON is helpful but not required.

---

## 5. Common case folder examples

### New Flow

```text
case/
└── new-flow-request.md
```

### Reference-based development

```text
case/
├── reference-flow.yml
└── reference-flow-request.md
```

### Modify existing Flow

```text
case/
├── flow.yml
└── modify-flow-request.md
```

### Debug an error

```text
case/
├── flow.yml
└── debug-material.md
```

Or simply:

```text
case/
├── flow.yml
└── debug.txt
```

### Organize or modify an LLM node prompt

```text
case/
├── flow.yml
└── llm-prompt-material.md
```

### Diagram generation

```text
case/
├── flow.yml
├── diagram-request.md
└── default-style.md
```

### Analyze one or more existing Flows

Single Flow:

```text
case/
├── flow.yml
└── flow-analysis-request.md     # optional
```

Several related Flows:

```text
case/
├── main-flow.yml
├── related-tool-flow.yml
└── flow-analysis-request.md     # optional
```

You may provide an optional focus such as Code nodes, LLM prompts, conditions, iteration, loops, node I/O bindings, tools, plugins, nested Flows, or cross-Flow relationships. If no focus is provided, the agent should perform global analysis. Chat output is the default. A Markdown report is written under `generate/reports/` only after request or confirmation.

`default-style.md` may be copied from:

```text
user-kit/diagram-kit/style-notes/default-style.md
```

---

## 6. LLM prompt materials

Use `templates/llm-prompt-material.md` when you want the agent to help with:

- organizing a Dify LLM node prompt,
- splitting system prompt and user prompt,
- improving prompt variables,
- checking context usage,
- designing JSON output,
- drafting JSON Schema requirements,
- creating prompt artifacts under `generate/prompts/` after confirmation.

JSON Schema support may depend on the Dify environment and the selected model. If this is uncertain, ask the agent to verify current Dify behavior or provide a prompt-only JSON fallback.

## 6.1 Flow analysis materials

Use `templates/flow-analysis-request.md` when you want the agent to analyze one Flow, several related Flows, or a specific focus area without modifying source files.

The template supports natural-language questions, optional primary Flow notes, optional relationship notes, and desired output choices. Reports are optional and should be created under the current case `generate/reports/` only after request or confirmation.

---

## 7. Security

Do not put real secrets or private production data in shared materials.

Remove or replace:

```text
API keys
access tokens
authorization headers
cookies
credentials
signed URLs
private bucket URLs
unnecessary personal data
private business data
private production prompts
```

Use placeholders such as:

```text
<REDACTED_TOKEN>
<REDACTED_API_KEY>
<REDACTED_SIGNED_URL>
<PRIVATE_FILE_URL_REDACTED>
<REDACTED_PRIVATE_PROMPT>
```

---

## 8. Final rule

Use `user-kit/` as a reference package.

Real work should happen in the user's own case folder.

Generated files should be created only after confirmation and should go under the current case folder's `generate/` directory.
