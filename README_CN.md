# DifyFlow-Helper-Skill

[English](./README.md) | **简体中文**

> 一个面向 Dify Flow / Workflow / Chatflow 的 Agent Skill，帮助 Agent 在新建、参考开发、修改、Debug、已有 Flow 分析、LLM Prompt 整理和架构图输出等任务中，先理解材料、分析影响，再根据用户确认执行修改或生成文件。

DifyFlow-Helper 不是面向某一种固定角色的工具。普通用户、产品经理、交付人员、开发者和维护人员，都可以直接用自然语言描述目标，也可以把已有的 Flow、报错、节点输入输出、Prompt、分析问题或参考材料交给 Agent。

它希望让 Agent 在处理 Dify Flow 时更加可控、清晰和安全：

- **先分析，再行动**：先判断任务场景、读取相关材料，按需解释已有 Flow 逻辑并给出方案，不盲目生成或改写文件。
- **先诊断，再修改**：出现节点失败、输出异常或运行报错时，Debug 优先于直接修改 Flow。
- **先确认，再产生副作用**：完整 YAML、修改版 Flow、报告、图表和 Prompt 文件等，均在用户确认后生成。
- **节点级说明更清楚**：说明节点名称、输入绑定、输出变量、数据格式、下游影响以及 Dify UI 中的设置方式。
- **接受原始材料**：不强迫用户填写复杂表单；`.md`、`.txt`、`.json`、`.log`、`.yml`、`.yaml`、Dify 面板复制内容和混合报错文本都可以直接使用。
- **生成内容不污染 Skill**：确认后的文件产物写入用户当前 case / project 的 `generate/`，不会写进已安装的 Skill 或 `user-kit/`。

> **Skill 原则：**让 Agent 成为一个会分析、会追问、会确认、会保护源文件的 Dify Flow 助手，而不是一个无确认地改写 YAML 的脚本。

---

## 目录

- [项目定位](#项目定位)
- [它可以做什么](#它可以做什么)
- [30 秒快速开始](#30-秒快速开始)
- [需要准备材料时先看 user-kit](#需要准备材料时先看-user-kit)
- [仓库内容](#仓库内容)
- [安装](#安装)
- [`generate/` 如何产生](#generate-如何产生)
- [节点级输出能力](#节点级输出能力)
- [LLM Prompt 与 JSON 输出](#llm-prompt-与-json-输出)
- [可选辅助脚本](#可选辅助脚本)
- [安全与确认机制](#安全与确认机制)
- [这个项目不是什么](#这个项目不是什么)
- [贡献](#贡献)
- [License](#license)

---

## 项目定位

DifyFlow-Helper 的核心是 `difyflow-helper/`：一个安装给 Agent 使用的 Skill。

它负责指导 Agent 如何处理 Dify Flow / Workflow / Chatflow 的设计、参考开发、修改、Debug、只读 Flow 分析、节点输入输出、代码节点、LLM Prompt、插件或授权风险，以及用户明确提出的逻辑图或架构图任务。

项目同时提供可选的 `user-kit/`，帮助用户准备需求、Flow、报错、Prompt 和绘图材料。`user-kit/` 不是 Skill，也不需要安装。

你不需要先判断自己属于“产品”“交付”还是“开发”角色。只要正在处理 Dify Flow，就可以直接描述目标并提供手头已有的材料。

典型使用者包括：

- 从零设计 Dify Flow 的普通用户；
- 希望基于旧 Flow 或相似场景复用逻辑的产品或交付人员；
- 需要修改节点、Prompt、代码或变量绑定的开发者；
- 正在排查节点失败、输出异常、JSON 解析失败或插件调用失败的维护人员；
- 想理解、评审、对比或沉淀一个或多个已有 Flow 且暂时不修改文件的用户；
- 需要把 Flow 整理成 Mermaid、SVG、HTML、Word / PPT 可用图的团队成员。

---

## 它可以做什么

DifyFlow-Helper 覆盖六类主要场景。用户不需要记住场景编号，也不需要预先选择角色；Agent 会根据自然语言和已有材料判断任务类型。

| 场景 | 适合什么需求 | Agent 如何处理 |
|---|---|---|
| **1. 从零设计新 Flow** | 有业务目标，但没有现成 Flow 或可复用逻辑 | 先澄清或推断目标，询问是否需要总体节点框架，说明节点职责、输入输出、风险和建议；只有用户确认后，才考虑生成完整可导入 YAML |
| **2. 参考已有 Flow 开发** | 有旧 Flow、相似场景或可复用逻辑，希望开发新 Flow | 读取用户指定的参考材料，判断哪些逻辑可以复用、哪些必须调整，再由用户选择需要总体框架、局部节点、代码、Prompt 还是完整 YAML |
| **3. 修改已有 Flow** | 需要修改已有 Flow 的节点、代码、变量绑定、Prompt 或输出结构 | 定位目标节点，追踪上游输入与下游消费者；默认先给修改方案，直接编辑或生成修改版文件前再次确认 |
| **4. 排查 Flow 报错** | Flow 跑不起来、节点失败、输出异常、`JSON.parse`、`error_msg`、插件或工具调用失败 | **先诊断，后修改**。聚焦失败 Flow、失败节点、报错信息、实际输入输出、预期输出和最近改动；定位原因后再询问是否修复或生成报告 |
| **5. 绘制逻辑或架构图** | 明确需要 Mermaid、JavaScript、SVG、HTML、图片或 Word / PPT 可用图 | 仅在用户明确提出绘图时启用；先确认用途、细节层级、实现方式和风格，再生成对应内容或文件 |
| **6. 分析一个或多个已有 Flow** | 想理解、评审、对比、追踪或文档化已有 Flow 逻辑，但暂时不修改它 | 未指定重点时做全局分析；也可重点分析 Code 节点、LLM Prompt、条件判断、迭代、循环、变量绑定、工具、插件、嵌套 Flow 或跨 Flow 输入输出契约。默认先在聊天中输出，用户要求或确认后才生成 Markdown 分析报告 |

LLM 节点 Prompt 是跨场景的节点级能力，不是额外的主场景。它贯穿新建、参考开发、修改、Debug 和只读 Flow 分析。详情见 [LLM Prompt 与 JSON 输出](#llm-prompt-与-json-输出)。

---

## 30 秒快速开始

### 1. 准备你已经有的材料

用户 case 可以非常简单，不需要创建固定 workspace：

```text
case/
├── flow.yml
└── debug.txt
```

也可以不创建任何文件，直接在聊天中粘贴需求、Flow 内容、节点输入输出、Prompt 或报错文本。

支持的常见材料类型：

```text
.md  .txt  .json  .log  .yml  .yaml
```

有效 JSON 有帮助，但不是前提。Dify 面板复制内容、部分 JSON、无效 JSON-like 文本、Stack Trace、空输出加报错信息都可以直接提供。

### 2. 用一句话告诉 Agent 每份材料的用途

仅仅需要指明具体路径。

Debug：

```text
请把 ./flow.yml 作为源 Flow，./debug.txt 作为报错材料。先诊断“解析发票 JSON”节点为什么失败，不要直接修改源文件。
```

修改已有 Flow：

```text
请分析 ./flow.yml 中“供应商风险判断”节点的上下游影响。我要调整输出字段，先给修改方案，不要直接写文件。
```

从零设计：

```text
我想做一个供应商材料审核 Flow。先帮我设计整体节点框架、关键输入输出和风险，暂时不要生成完整 YAML。
```

参考开发：

```text
请参考 ./reference-flow.yml 的节点结构，并根据 ./request.md 的新业务字段重新设计。先说明哪些逻辑可以复用，哪些不能复用。
```

Flow 分析：

```text
请分析 ./main-flow.yml 和 ./related-tool-flow.yml，说明整体执行路径，并重点看 Code 节点、LLM Prompt、条件判断和跨 Flow 输入输出契约。不要修改任何文件。分析完成后再问我要不要生成 Markdown 报告。
```

整理 LLM Prompt：

```text
请根据 ./llm-prompt-material.md 整理这个 LLM 节点的 system prompt 和 user prompt，并说明变量应该从哪些节点绑定。
```

绘图：

```text
请根据 ./flow.yml 画一张适合放进 PPT 的节点级逻辑图。先确认图的层级和输出格式，再生成文件。
```

### 3. 根据分析确认真正需要的交付物

Agent 可能会询问你需要：

- 只在聊天中查看总体框架或修改建议；
- 节点级输入输出与绑定表；
- 完整 Code 节点代码；
- 完整或局部 LLM Prompt；
- 修改后的 Flow 副本；
- Debug 报告；
- Flow 分析报告；
- Mermaid、SVG、HTML 或其他图形文件；
- 完整可导入 YAML。

你只需确认当前真正需要的内容，不需要一次生成全部交付物。

---

## 需要准备材料时先看 `user-kit`

`user-kit/` 是可选的用户材料包，**不是 Agent Skill，不需要安装**。

当你不知道应该向 Agent 提供什么材料时，建议先阅读：

- 中文说明：[`user-kit/README_CN.md`](./user-kit/README_CN.md)
- English guide: [`user-kit/README.md`](./user-kit/README.md)
- 按场景快速准备材料：[`user-kit/quick-start.md`](./user-kit/quick-start.md)

`user-kit/` 提供轻量模板、已填写示例、参考 Flow 说明和绘图风格参考。你可以只复制其中一个需要的文件到自己的 case，也可以完全不使用模板，直接在聊天中提供原始材料。

常用入口：

| 你想做什么 | 查看 |
|---|---|
| 复制轻量材料模板 | [`user-kit/templates/`](./user-kit/templates/) |
| 查看已填写的脱敏示例 | [`user-kit/examples/`](./user-kit/examples/) |
| Flow 分析模板和示例 | [`user-kit/templates/flow-analysis-request.md`](./user-kit/templates/flow-analysis-request.md), [`user-kit/examples/flow-analysis/request.md`](./user-kit/examples/flow-analysis/request.md) |
| 维护共享参考 Flow | [`user-kit/reference-flows/`](./user-kit/reference-flows/) |
| 查看绘图风格和实现参考 | [`user-kit/diagram-kit/`](./user-kit/diagram-kit/) |

私有、客户相关或只属于单个 case 的 Flow、日志和 Prompt 应保留在用户自己的 case / project 中，不应提交到 `user-kit/`。

---

## 仓库内容

开源仓库根目录包含以下四项：

```text
DifyFlow-Helper/
├── difyflow-helper/        # 唯一可安装的 Agent Skill
├── user-kit/               # 可选用户材料包，不安装为 Skill
├── README.md               # 英文仓库说明
└── README_CN.md            # 中文仓库说明
```

其中只有两个功能目录：

| 目录 | 是否安装为 Skill | 作用 |
|---|---:|---|
| [`difyflow-helper/`](./difyflow-helper/) | **是** | 真正的 Agent Skill，包含 Skill 入口、场景路由、确认规则、Debug 规则、YAML 安全规则、节点 IO 规则、绘图规则、安全规则、可选脚本和安装说明 |
| [`user-kit/`](./user-kit/) | **否** | 可选用户材料包，包含轻量模板、脱敏示例、参考 Flow 说明、LLM Prompt 材料和绘图风格参考 |

### `difyflow-helper/`：唯一需要安装的 Skill

```text
difyflow-helper/
├── SKILL.md              # Skill 入口与最高层行为边界
├── references/           # 场景路由、确认、Debug、YAML、节点 IO、绘图和安全规则
├── assets/               # Agent 使用的参考材料与可选报告模板
├── scripts/              # 可选的只读分析与基础 Mermaid 辅助脚本
└── docs/                 # 安装说明与 Agent 使用指南
```

它主要负责：

- 根据请求自动路由六类场景，报错场景优先进入 Debug；
- 接受自然语言和不规整的原始材料，不强迫用户填写表单；
- 将源 `.yml` / `.yaml` 默认视为只读文件；
- 用节点名称优先定位，节点 ID 作为辅助；
- 说明节点输入、来源绑定、数据类型、输出变量和下游消费者；
- 为 Code 节点提供必要的完整替换代码、输入输出、类型保护和依赖说明；
- 处理 LLM Prompt、变量、Context、JSON 输出和下游解析关系；
- 分析单个或多个已有 Flow，包括全局分析、重点节点分析和跨 Flow 输入输出契约；
- 在涉及当前 Dify 标准或不确定行为时进行联网核验；
- 对密钥、Token、授权头、Cookie、签名 URL 和私有数据采取占位或脱敏策略；
- 将已确认的文件产物写入用户当前 case，而不是 Skill 安装目录。

详细行为规则见 [`difyflow-helper/SKILL.md`](./difyflow-helper/SKILL.md)，Agent 操作说明见 [`difyflow-helper/docs/AGENT_GUIDE.md`](./difyflow-helper/docs/AGENT_GUIDE.md)。

### `user-kit/`：可选材料包

`user-kit/` 不包含 Agent 的核心行为规则，也不需要安装。它的用途是让普通用户、产品、交付和开发更容易准备需求、Flow、报错、输入输出、Prompt 和绘图材料。

首次使用建议从 [`user-kit/README_CN.md`](./user-kit/README_CN.md) 和 [`user-kit/quick-start.md`](./user-kit/quick-start.md) 开始。

---

## 安装

### 安装边界

> **只安装 `difyflow-helper/` 目录。不要把仓库根目录或 `user-kit/` 当作 Skill 安装。**

```text
DifyFlow-Helper/
├── difyflow-helper/        # ✅ 作为 Skill 安装
├── user-kit/               # ❌ 不作为 Skill 安装
├── README.md               # ❌ 仓库说明
└── README_CN.md            # ❌ 仓库说明
```

安装成功后，已安装的 Skill 根目录中应当直接包含：

```text
SKILL.md
references/
assets/
scripts/
docs/
```

如果安装后还需要再进入一层 `difyflow-helper/` 才能看到 `SKILL.md`，通常说明选错了 Skill 根目录。

当前兼容目标：

- **主要目标：** Codex CLI；
- **次要目标：** Claude Code；
- **其他 Agent：** 尽力兼容，但不以牺牲 Codex CLI / Claude Code 的核心可用性为代价。

不同 Agent、CLI、IDE 或版本的 Skill 安装位置和命令可能不同，请以对应产品当前的官方说明为准。

### 方式 A：交给 Agent 安装

可以把仓库地址交给 Agent，并明确告诉它只安装 `difyflow-helper/`。

可直接复制下面的提示词：

```text
请从下面的 GitHub 仓库安装 DifyFlow-Helper：

<在这里粘贴 GitHub 仓库地址>

安装要求：
1. 只安装仓库中的 difyflow-helper/ 目录，并将它作为 Skill 根目录。
2. 不要安装仓库根目录 DifyFlow-Helper/。
3. 不要把 user-kit/ 当作 Skill 安装。
4. 安装后检查：已安装的 Skill 根目录下应直接包含 SKILL.md、references/、assets/、scripts/ 和 docs/。
5. 具体安装位置、复制方式或配置方式，请按照你当前环境对应的官方 Skill 安装说明执行。
6. 完成后告诉我实际安装路径和检查结果。
```

更短的版本：

```text
请安装这个仓库中的 difyflow-helper/ 目录作为 Agent Skill。不要安装仓库根目录，也不要安装 user-kit/。安装后确认 SKILL.md 直接位于已安装的 Skill 根目录中，并告诉我安装路径。
```

### 方式 B：手动安装

1. Clone 或下载本仓库。
2. 查看你当前 Agent、CLI 或 IDE 对 Skill 的安装说明。
3. 添加或复制 Skill 时，选择仓库中的 `difyflow-helper/` 目录作为 Skill 根目录。
4. 不要选择仓库根目录 `DifyFlow-Helper/`，也不要选择 `user-kit/`。
5. 安装后检查：`SKILL.md` 是否直接位于已安装的 Skill 根目录下。

仓库内的安装边界说明见 [`difyflow-helper/docs/INSTALL.md`](./difyflow-helper/docs/INSTALL.md)。

### 是否需要 Python 环境？

安装和使用 `difyflow-helper` Skill 本身，**不要求用户提前安装 Python**。

本项目的 `scripts/` 包含少量可选 Python 辅助脚本，用于只读分析 Flow YAML、提取节点信息、扫描疑似密钥或生成基础 Mermaid 草图。它们是辅助工具，不是 Skill 正常工作的前置条件。

- 只安装和使用 Skill：不需要 Python；
- 让 Agent 阅读、分析、规划、Debug 或整理 Prompt：不需要 Python；
- 本地运行 `scripts/*.py`：需要 Python 环境；
- 运行 YAML 解析脚本时，可能还需要 `PyYAML`。

辅助脚本不能绕过 Skill 的安全规则。源 Flow 默认只读，直接修改、覆盖文件或生成完整可导入 YAML 前仍需用户确认。

---

## `generate/` 如何产生

`generate/` **不需要用户提前创建，也不是仓库内预置的工作目录**。

当用户明确要求或确认文件输出后，Agent 才会在用户当前 case / project 下按需创建 `generate/` 及对应子目录：

```text
case/
├── flow.yml
├── debug.txt
└── generate/                     # 用户确认文件输出后，由 Agent 按需创建
    ├── yml/                      # 新生成或修改后的 Flow 文件
    ├── reports/                  # Debug 报告、分析报告、修改计划
    ├── prompts/                  # System/User Prompt、JSON 输出说明等
    ├── diagrams/
    │   ├── mermaid/
    │   ├── javascript/
    │   ├── svg/
    │   ├── html/
    │   └── images/
    └── code/                     # 用户明确要求的独立代码文件
```

典型路径：

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

Agent 写入或建议写入文件后，应明确告知具体相对路径。生成内容不会写入已安装的 `difyflow-helper/`，也不会写入 `user-kit/`。

如果用户只要求在聊天中输出，则不会创建 `generate/`。

---

## 节点级输出能力

当任务涉及节点设计、修改、Debug 或只读 Flow 分析时，Skill 会在有必要时说明：

| 内容 | 说明 |
|---|---|
| 节点定位 | 节点名称优先，节点 ID 作为辅助 |
| 输入绑定 | Dify 中的参数名、来源节点、来源变量和数据类型 |
| 输出定义 | 输出变量、数据形态以及下游使用节点 |
| 操作说明 | 用户应在 Dify UI 中绑定或修改什么 |
| Code 节点 | 完整替换代码、输入、返回值、空值或类型保护和第三方依赖 |
| LLM 节点 | System Prompt、User Prompt、变量、Context、JSON 字段和下游解析影响 |
| 外部依赖 | 插件、API、授权、嵌套 Tool Flow 或缺失 Flow 的依赖说明 |
| Flow 分析 | 全局 Flow 解释、重点 Code/LLM/条件/迭代分析，以及多 Flow 输入输出契约 |

如果当前 Flow 调用了未提供的嵌套 Flow 或 Tool Flow，Agent 会明确指出缺失依赖，而不会编造其输出结构。

---

## LLM Prompt 与 JSON 输出

LLM 节点 Prompt 是 DifyFlow-Helper 的节点级能力之一，而不是单独的主场景。

在新建、参考开发、修改或 Debug 过程中，Skill 可以协助：

- 区分和整理 System Prompt、User Prompt；
- 说明 Prompt 变量应从哪个节点、哪个变量绑定；
- 分析 Context 来自检索节点、上游节点还是 Prompt 变量；
- 设计 JSON 输出字段及下游消费方式；
- 排查 LLM 输出不是合法 JSON、字段缺失或下游解析失败等问题；
- 在只读分析中检查已有 LLM Prompt 和变量绑定，不自动改写；
- 在当前 Dify 环境能力不明确时，区分原生 Structured Output / JSON Schema 与 Prompt-only JSON 约束；
- 经用户确认后，将较长的 Prompt、Prompt 修改方案、JSON 输出说明或 JSON Schema 草案写入 `generate/prompts/`。

如果用户只要求局部修改 Prompt，Agent 不应默认替换完整 Prompt；如需完整替换或文件化输出，应先请求确认。

---

## 可选辅助脚本

Skill 包含少量 Python 辅助脚本，但核心工作不依赖脚本。这些脚本默认只读，不能绕过确认、安全或联网核验规则。

| 脚本 | 用途 |
|---|---|
| `inspect_dify_yaml.py` | 输出 Flow 的高层摘要 |
| `extract_node_index.py` | 提取节点名称、类型和 ID |
| `extract_node_io.py` | 提取可能的节点输入输出配置线索 |
| `scan_secrets.py` | 扫描疑似敏感信息并仅输出脱敏结果 |
| `generate_mermaid_from_flow.py` | 在明确需要绘图时生成基础 Mermaid |

脚本建议使用 Python 3.10+；读取 YAML 的脚本需要 `PyYAML`。具体说明见 [`difyflow-helper/scripts/SCRIPT_INDEX.md`](./difyflow-helper/scripts/SCRIPT_INDEX.md)。

---

## 安全与确认机制

Dify Flow 的生成和修改可能影响源文件、插件、凭据、节点绑定和下游行为。DifyFlow-Helper 将低风险分析与有副作用的执行分开：

```text
用户描述需求或提供材料
        ↓
Agent 判断场景，只读取相关内容
        ↓
分析问题、补齐必要信息、给出方案或框架
        ↓
用户确认需要的交付物和操作范围
        ↓
Agent 才生成文件、修改副本或执行其他已确认动作
```

以下操作需要用户明确确认：

- 生成完整、可导入的 Dify YAML / YML / DSL；
- 直接修改源 Flow 或覆盖已有文件；
- 根据 Debug 结论修改 Flow；
- 安装或配置插件；
- 使用真实 API Key、Token、凭据或授权值；
- 创建本可在聊天中完成的大型文件产物；
- 创建本可在聊天中完成的 Markdown Flow 分析报告；
- 执行 Git 操作；
- 用户只要求局部修改时，替换完整 Prompt；
- 输出较长 Prompt、JSON 输出规范或 JSON Schema 草案到文件；
- 选择用户尚未确认的图形输出格式或实现路径。

其他关键边界：

- **源文件保护**：源 YAML / YML 默认只读；确认修改后也优先在 `generate/yml/` 写入副本。
- **当前标准核验**：完整可导入 YAML、精确 DSL 字段、当前插件配置、模型结构化输出能力和不确定的 Dify 专属行为，需要基于当前可靠来源核验。
- **无法联网时**：仍可进行本地结构分析和提供草案，但必须标明“未核验”，不能声称符合当前可导入标准。
- **敏感信息**：不回显真实密钥、Token、Cookie、授权头、完整签名 URL 或不必要的私有数据。
- **插件与凭据**：使用占位符；安装插件、配置真实环境或使用真实凭据前必须确认。
- **Git**：除非用户明确要求，否则不执行 `git add`、`commit`、`push`、`reset`、`checkout`、`rebase`、`merge` 等操作。
- **绘图**：普通分析不会自动生成图，只有用户明确提出绘图需求时才启用。
- **Flow 分析**：Scene6 默认只读。它可以指出风险和缺失证据，但这些发现不等于已确认的修改授权或运行时错误，除非用户明确转入修改或 Debug。
- **参考 Flow**：仓库中的参考或占位 Flow 不代表当前 Dify 官方导入格式，不能未经核验直接当作生产基线。

短分析、小型表格、代码片段和简短 Debug 结论默认直接在聊天中给出，不会为了形式完整而强制创建文件。

---

## 这个项目不是什么

DifyFlow-Helper 明确不是：

- Dify 官方工具或官方 DSL 标准说明；
- 自动部署、自动发布或一键上线工具；
- 无确认地改写用户源 Flow 的脚本；
- 强制用户填写复杂表单的工作流管理系统；
- 大型 Dify 示例仓库；
- 用户业务 Flow、客户数据、生产日志或私有 Prompt 的存储目录；
- 替代 Dify 平台、模型能力、插件环境和用户业务判断的系统。

它可以在材料不完整时先帮助梳理问题，但不会把推测当成事实。最终生成的 Flow、代码、Prompt 和图表仍应由用户结合自己的 Dify 环境、模型、插件与业务数据进行检查。

---

## 贡献

欢迎围绕以下方向改进项目：

- 补充或优化 `difyflow-helper/references/` 中的行为规则；
- 增强 Flow 分析、Debug、节点 IO、LLM Prompt、JSON 输出和绘图场景说明；
- 改进 `user-kit/templates/` 和 `user-kit/examples/` 的材料示例；
- 补充脱敏后的参考 Flow 或图形风格参考；
- 改进只读辅助脚本的健壮性和使用说明。

贡献时请遵守这些边界：

- 不提交真实 API Key、Token、Cookie、授权头、签名 URL、生产日志或私有业务数据；
- 不把用户 case 运行时产物放进 `difyflow-helper/` 或 `user-kit/`；
- 不把 `user-kit/` 变成另一个 Skill；
- 不把项目改成强制 workspace 或强制表单系统；
- 涉及当前 Dify 行为、DSL 字段、插件配置或模型结构化输出能力的说明，应尽量基于当前可靠来源核验。

---

## License

本项目采用 [MIT License](./LICENSE)。
