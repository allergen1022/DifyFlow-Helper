# Quick Start / 快速开始

中文：只准备你已经有的材料。你也可以不创建文件，直接在聊天中粘贴需求、Flow、输入输出和报错。

English: Prepare only what you already have. You may skip files and paste requirements, Flows, IO, and errors directly into chat.

## 1. 新建 Flow / New Flow

```text
case/
└── new-flow-request.md
```

复制 `templates/new-flow-request.md`，或直接描述业务目标、输入和预期输出。完整可导入 YAML 通常需要再次确认。

Copy `templates/new-flow-request.md`, or describe the goal, input, and expected output directly. Complete importable YAML normally requires confirmation.

## 2. 参考已有 Flow 开发 / Reference-based Development

```text
case/
├── reference-flow.yml
└── reference-flow-request.md
```

私有 Flow 放在当前 case；只有经过脱敏并计划共享的 Flow 才放到 `user-kit/reference-flows/`。

Keep private Flows in the current case. Use `user-kit/reference-flows/` only for intentionally shared, sanitized references.

## 3. 修改已有 Flow / Modify Existing Flow

```text
case/
├── flow.yml
└── modify-flow-request.md
```

写出目标节点名称和修改目标。Agent 默认先给修改方案，直接修改或生成文件前会请求确认。

State the target node name and desired change. The agent normally provides a plan first and asks before editing or generating files.

## 4. Debug 报错 / Debug an Error

```text
case/
├── flow.yml
└── debug-material.md
```

原始文本也可以：

Raw text is also valid:

```text
case/
├── flow.yml
└── debug-raw.txt
```

不要求有效 JSON。可粘贴 Dify 输入、空输出、`error_msg`、stack trace、插件/工具报错或混合文本。

Valid JSON is not required. Paste Dify input, empty output, `error_msg`, stack traces, plugin/tool failures, or mixed text.

如有标准json，也可以提供debug-structured.json 文件：

If there is a standard JSON file, please also provide the debug-structured.json file:

```text
case/
├── flow.yml
└── debug-structured.json
```

具体debug材料可以参考user-kit/examples/debug。

For detailed debug materials, you can refer to user-kit/examples/debug.

## 5. 画图 / Diagram Generation

```text
case/
├── flow.yml
├── diagram-request.md
└── reference-style.md     # optional / 可选
```

说明用途（Word、PPT、Markdown、HTML、评审或交付）、细节层级和输出格式。Agent 只会在明确提出画图时生成图。
画图场景有些许区分，更具体的使用说明请参考user-kit/examples/diagram/README.md。

State the usage, detail level, and output format. The agent generates diagrams only when explicitly requested.
Diagram scene has some distinctions. For more detailed instructions, please refer to user-kit/examples/diagram/README.md.

## 6. 整理或修改 LLM 节点 Prompt / Organize or Modify an LLM Node Prompt

```text
case/
├── flow.yml                  # optional but useful / 可选但有助于理解节点
└── llm-prompt-material.md
```

也可以只提供原始 prompt：

You may also provide only a raw prompt:

```text
case/
└── prompt-raw.md
```

如果需要检查节点上下文或变量绑定，Flow YAML 会有帮助；如果只需重写 prompt，prompt 文件或聊天中粘贴的文本通常就足够。需要 JSON 输出时，请说明期望字段。如果希望 agent 生成 prompt 文件，确认后可写入当前 case 的 `generate/prompts/`。

Flow YAML helps when the agent needs node context or variable bindings. For prompt rewriting alone, a prompt file or text pasted into chat is usually enough. For JSON output, describe the expected fields. After confirmation, requested prompt files may be written under the current case `generate/prompts/`.

## 7. 分析一个或多个 Flow / Analyze One or More Flows

单个 Flow：

Single Flow:

```text
case/
├── flow.yml
└── flow-analysis-request.md     # optional / 可选
```

多个关联 Flow：

Multiple related Flows:

```text
case/
├── main-flow.yml
├── related-tool-flow.yml
└── flow-analysis-request.md     # optional / 可选
```

`flow-analysis-request.md` 是可选文件。用户也可以直接说“请分析这些 Flow / analyze these Flows”。如果没有指定重点，Agent 应做全局分析。

`flow-analysis-request.md` is optional. You can also directly say "analyze these Flows". If no focus is provided, the agent should perform global analysis.

可以重点分析 Code 节点、LLM Prompt、条件判断、迭代、循环、节点输入输出绑定、工具、插件、嵌套 Flow 或跨 Flow 关系。默认先在聊天中输出；用户要求或确认后，才可以在当前 case 的 `generate/reports/` 生成 Markdown 分析报告。

You may focus on Code nodes, LLM prompts, conditions, iteration, loops, node I/O bindings, tools, plugins, nested Flows, or cross-Flow relationships. Chat output is the default. A Markdown report may be generated under the current case `generate/reports/` only after request or confirmation.

## 生成文件 / Generated Files

确认后的输出通常位于当前 case 的 `generate/`：

Confirmed artifacts normally go under the current case `generate/`:

```text
generate/yml/<case-name>.modified.yml
generate/reports/<case-name>-debug-report.md
generate/reports/<case-name>-flow-analysis-report.md
generate/prompts/<case-name>-system-prompt.md
generate/prompts/<case-name>-user-prompt.md
generate/prompts/<case-name>-full-prompt.md
generate/prompts/<case-name>-json-output-spec.md
generate/diagrams/<case-name>.mmd
generate/code/<case-name>.js
```

`generate/prompts/` 用于用户要求或确认后生成的 system prompt、user prompt、完整 prompt、修改计划、JSON 输出规范或 JSON Schema 草案；它是当前 case 的运行时输出约定，不是本仓库中的目录。

`generate/prompts/` is for confirmed system prompts, user prompts, full prompts, change plans, JSON output specifications, or JSON Schema drafts. It is a runtime convention for the current case, not a directory in this repository.

分享前请脱敏密钥、token、cookie、授权头、签名/私有 URL 和不必要的个人数据。

Redact keys, tokens, cookies, authorization headers, signed/private URLs, and unnecessary personal data before sharing.

注：generate/ 是 agent 在用户确认生成文件后，在用户当前目录下自动创建的输出目录，不需要用户手动提前创建。

Note: "generate/" is the output directory that the agent automatically creates in the user's current directory after the user confirms the generation of the file. The user does not need to create it manually in advance.
