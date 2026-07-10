# DifyFlow-Helper 用户材料包

`user-kit/` 是帮助用户准备 Dify Flow 材料的轻量材料包。它不是 Agent Skill，也不应该作为 skill 安装。

真正需要安装到 agent 的 skill 是同级目录：

```text
difyflow-helper/
```

`user-kit/` 的使用方式是：按需参考、按需复制。用户只需要把当前任务需要的模板、示例或风格说明复制到自己的项目或 case 目录中，也可以只参考这些文件来写提示词或具体指导。

---

## 1. 最简单的使用方式

用户不需要完整填写所有模板。

一开始只需要准备已有材料即可：

```text
D:/case/
├── flow.yml
└── llm-prompt-material.md
```

如果是 debug，也可以更简单：

```text
D:/case/
├── flow.yml
└── debug.txt
```

如果是画图：

```text
D:/case/
├── flow.yml
└── diagram-request.md
```

如果是分析已有 Flow：

```text
D:/case/
├── flow.yml
└── flow-analysis-request.md     # 可选
```

然后在给 agent 的提示词里说明每个文件的用途，并指定文件路径。

例如：

```text
请把 ./flow.yml 作为源 Flow，把 ./llm-prompt-material.md 作为 LLM 节点 prompt 材料，帮我重新整理 system prompt 和 user prompt。
```

纯 Flow 分析不强制使用请求文件，也可以直接说：

```text
请分析 ./main-flow.yml 和 ./related-tool-flow.yml，说明整体执行路径，并重点看 Code 节点、LLM Prompt、条件判断、迭代、绑定、工具依赖和跨 Flow 输入输出契约。不要修改文件。聊天分析后再问我要不要生成 Markdown 报告。
```

---

## 2. 关于 `generate/`

`generate/` 不是用户一开始必须手动创建的目录。

它是 agent 在用户明确要求或确认生成文件后，才可能在当前 case 目录下创建的输出目录。

agent 输出前，用户 case 可能只有：

```text
D:/case/
├── flow.yml
└── llm-prompt-material.md
```

用户确认生成文件后，agent 才可能创建：

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

常见生成目录：

```text
generate/yml/
generate/reports/
generate/prompts/
generate/diagrams/
generate/code/
```

agent 不会把生成文件写进 `user-kit/`，也不会写进已安装的 `difyflow-helper/` skill 包。

---

## 3. `user-kit/` 里面有什么

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

这里是用户可以复制到自己 case 目录中填写的轻量材料模板。

当前模板包括：

```text
templates/new-flow-request.md
templates/reference-flow-request.md
templates/modify-flow-request.md
templates/debug-material.md
templates/diagram-request.md
templates/llm-prompt-material.md
templates/flow-analysis-request.md
```

这些模板不是严格表单，也不是固定 schema。用户可以留空、改标题、新增字段，或者直接粘贴原始文本。Flow 分析模板中的分析重点如果留空，表示让 Agent 做全局分析。

### `examples/`

这里是作者提供的脱敏示例。

它们用于告诉用户“可以怎么写”，不是用户必须复制的固定目录结构。

Flow 分析示例：

```text
examples/flow-analysis/request.md
```

### `reference-flows/`

这里是可选的共享参考 Flow 库。

适合放通用、脱敏、可复用、团队级或作者维护的参考 Flow。

如果是私有、客户相关、只服务当前任务的参考 Flow，更推荐放在当前 case 目录：

```text
D:/case/
├── request.md
└── reference-flow.yml
```

让 agent 使用参考 Flow 时，最好在提示词里明确路径和用途：

```text
请参考 ./reference-flow.yml 的节点结构，但按 ./request.md 的新业务字段重新设计。
```

### `diagram-kit/`

这里是可复用的绘图说明和风格参考。

当用户需要指定绘图风格、输出格式或生成方法时，可以参考这里。

例如：

```text
diagram-kit/style-notes/default-style.md
diagram-kit/style-notes/ppt-style.md
diagram-kit/mermaid/overview-diagram.md
diagram-kit/javascript/svg-diagram-basic.md
```

用户可以把某个风格文件复制到自己的 case 目录，也可以直接在提示词里引用路径。

注：绘图场景与其余场景有所区分，具体使用请查阅 user-kit/quick-start.md及user-kit/examples/diagram/README.md

---

## 4. 支持的材料类型

agent 应该能够处理：

```text
.md
.txt
.json
.log
.yml
.yaml
```

也应该支持：

- 从 Dify 面板复制出来的内容；
- 部分 JSON 或无效 JSON；
- 原始报错文本；
- 模型输入输出；
- 插件或工具输出；
- Node.js 或 Python 报错；
- 自然语言需求；
- LLM 节点的 system prompt 和 user prompt；
- context 上下文说明；
- 期望 JSON 输出要求。

合法 JSON 有帮助，但不是必须。

---

## 5. 常见 case 目录示例

### 新建 Flow

```text
case/
└── new-flow-request.md
```

### 基于参考 Flow 开发

```text
case/
├── reference-flow.yml
└── reference-flow-request.md
```

### 修改已有 Flow

```text
case/
├── flow.yml
└── modify-flow-request.md
```

### Debug 报错

```text
case/
├── flow.yml
└── debug-material.md
```

或者更简单：

```text
case/
├── flow.yml
└── debug.txt
```

### 整理或修改 LLM 节点 prompt

```text
case/
├── flow.yml
└── llm-prompt-material.md
```

### 画图

```text
case/
├── flow.yml
├── diagram-request.md
└── default-style.md
```

其中 `default-style.md` 可以从这里复制：

```text
user-kit/diagram-kit/style-notes/default-style.md
```

### 分析一个或多个已有 Flow

单个 Flow：

```text
case/
├── flow.yml
└── flow-analysis-request.md     # 可选
```

多个关联 Flow：

```text
case/
├── main-flow.yml
├── related-tool-flow.yml
└── flow-analysis-request.md     # 可选
```

用户可以指定分析重点，例如 Code 节点、LLM Prompt、条件判断、迭代、循环、节点输入输出绑定、工具、插件、嵌套 Flow 或跨 Flow 关系。如果没有指定重点，Agent 应做全局分析。默认先在聊天中输出；只有用户要求或确认后，才会在 `generate/reports/` 生成 Markdown 分析报告。

---

## 6. LLM prompt 材料

当用户需要 agent 处理下面这些任务时，可以使用：

```text
templates/llm-prompt-material.md
```

适用场景：

- 整理 Dify LLM 节点 prompt；
- 拆分 system prompt 和 user prompt；
- 优化 prompt 变量；
- 检查 context 使用；
- 设计 JSON 输出；
- 草拟 JSON Schema 要求；
- 在用户确认后，把 prompt 产物输出到 `generate/prompts/`。

JSON Schema 是否可用，可能取决于 Dify 当前环境和具体模型。用户不确定时，应让 agent 联网确认当前 Dify 行为，或先采用 prompt-only JSON fallback。

## 6.1 Flow 分析材料

当用户希望 Agent 在不修改源文件的前提下分析单个 Flow、多个关联 Flow 或某个重点区域时，可以使用：

```text
templates/flow-analysis-request.md
```

这个模板支持自然语言问题、主要 Flow、关联关系说明、可选分析重点和期望输出。报告不是默认产物，只有用户要求或确认后，才应写入当前 case 的 `generate/reports/`。

---

## 7. 安全与脱敏

不要把真实密钥或生产隐私数据放进共享材料。

分享前应删除或替换：

```text
API key
access token
authorization header
cookie
credential
signed URL
private bucket URL
不必要的个人数据
私有业务数据
私有生产 prompt
```

推荐占位符：

```text
<REDACTED_TOKEN>
<REDACTED_API_KEY>
<REDACTED_SIGNED_URL>
<PRIVATE_FILE_URL_REDACTED>
<REDACTED_PRIVATE_PROMPT>
```

---

## 8. 最终原则

`user-kit/` 是参考包，不是用户业务数据仓库。

真实工作应该发生在用户自己的 case 目录中。

生成文件应在用户确认后，由 agent 写入当前 case 目录下的 `generate/`。
