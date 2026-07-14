<div align="center">

**简体中文** · [English](./README.md)

# 🧩 DifyFlow Helper

**一个面向 Dify Workflow / Chatflow 设计、分析、排错与安全修改的 Agent Skill。**

**先分析，再行动 · 先诊断，再修改 · 先确认，再写入**
<p>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/allergen1022/DifyFlow-Helper?style=flat-square&label=LICENSE&labelColor=24292f&color=2f81f7" alt="License">
  </a>
  <img src="https://img.shields.io/badge/Codex_CLI-主要支持-2ea44f?style=flat-square&labelColor=1f2328" alt="Codex CLI 主要支持">
  <img src="https://img.shields.io/badge/Claude_Code-兼容支持-d97757?style=flat-square&labelColor=1f2328" alt="Claude Code 兼容支持">
  <img src="https://img.shields.io/badge/Dify-Workflow_%26_Chatflow-6c63ff?style=flat-square&labelColor=1f2328" alt="Dify Workflow 和 Chatflow">
  <img src="https://img.shields.io/badge/Python-可选-3776ab?style=flat-square&labelColor=1f2328" alt="Python 可选">
</p>


[快速开始](#quick-start) · [安装](#installation) · [核心能力](#capabilities) · [安全机制](#safety) · [可选项](#optional) · [限制](#limitations) · [用户材料包](#user-kit)

</div>

---

DifyFlow Helper 让 Agent 成为一个可控的 Dify Flow / Workflow / Chatflow 助手，而不是一个未经确认就改写 YAML 的自动化脚本。

你可以提供业务需求、已有 Flow、运行报错、节点输入输出、LLM Prompt 或原始调试材料。它会先判断任务类型，只读取相关材料，在节点层面解释影响并提出方案，确认后才创建或修改文件。

```text
需求 / Flow / 报错 / Prompt / 原始材料
                    │
                    ▼
            DifyFlow Helper
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
     分析逻辑      定位问题      设计方案
       │            │            │
       └────────────┼────────────┘
                    ▼
              解释影响与方案
                    ▼
                用户确认
                    ▼
      YAML · 代码 · Prompt · 报告 · 图表
```

> [!IMPORTANT]
> 只安装 [`difyflow-helper/`](./difyflow-helper/) 目录作为 Agent Skill。仓库根目录和 [`user-kit/`](./user-kit/) 都不是 Skill 根目录。

<a id="capabilities"></a>

## 它可以做什么

DifyFlow Helper 覆盖六类主要场景。你不需要预先选择角色，也不需要记住场景编号；Agent 会根据需求和已有材料自动判断任务类型。

| 场景 | 适合什么需求 | 默认处理方式 |
|---|---|---|
| **从零设计新 Flow** | 有业务目标，但没有现成 Flow | 先澄清目标，设计节点框架，说明职责、输入输出、风险与建议，再考虑是否需要完整 YAML。 |
| **参考已有 Flow 开发** | 有旧 Flow、相似场景或可复用逻辑 | 区分可复用结构与必须调整的业务部分，再由你选择需要总体框架、局部节点、代码、Prompt 或完整 Flow。 |
| **修改已有 Flow** | 需要调整节点、代码、变量绑定、Prompt 或输出字段 | 定位目标节点，追踪上游输入和下游消费者，默认先给修改方案，再写文件。 |
| **排查 Flow 报错** | 节点失败、输出异常、JSON 解析失败、插件或工具调用失败 | 先诊断，后修改；优先分析失败节点、实际证据、预期行为和最近改动。 |
| **绘制逻辑或架构图** | 明确需要 Mermaid、SVG、HTML、JavaScript、图片或 Word/PPT 可用图 | 先确认用途、细节层级、输出格式、实现方式和视觉风格，再生成。 |
| **分析已有 Flow** | 想理解、评审、对比、追踪或文档化一个或多个 Flow，但不修改 | 支持全局分析、重点分析和多 Flow 分析；默认在聊天中输出，Markdown 报告为可选项。 |

LLM Prompt 是贯穿设计、参考开发、修改、Debug 和只读 Flow 分析的节点级能力，不是额外的主场景。

### 可直接使用的材料

```text
.md  .txt  .json  .log  .yml  .yaml
```

有效 JSON 有帮助，但不是前提。Dify 面板复制内容、部分 JSON、无效 JSON-like 文本、Stack Trace、空输出加报错、模型输入输出、插件返回值和自然语言需求都可以直接使用。

<a id="quick-start"></a>

## 30 秒快速开始

### 1. 只准备你已经有的材料

一个 case 文件夹可以非常简单：

```text
case/
├── flow.yml
└── debug.txt
```

也可以不创建文件，直接把需求、Flow 内容、节点输入输出、Prompt 或报错文本粘贴到聊天中。项目不要求固定 workspace 结构。

### 2. 用一句话说明每份材料的用途

```text
请把 ./flow.yml 作为源 Flow，./debug.txt 作为报错材料。
先诊断“解析发票 JSON”节点为什么失败，不要直接修改源文件。
```

### 3. 只确认当前真正需要的交付物

Agent 可能会提供以下选项：

- 聊天中的分析结论或修改建议；
- 节点级输入、输出和绑定表；
- Code 节点的完整替换代码；
- 完整或局部 LLM Prompt；
- 修改后的 Flow 副本；
- Debug 报告或 Flow 分析报告；
- Mermaid、SVG、HTML 或其他图表格式；
- 完整可导入 YAML。

不需要一次生成全部内容。

<details>
<summary><strong>更多可直接复制的示例提示词</strong></summary>

#### 从零设计

```text
我想做一个供应商材料审核 Flow。
先帮我设计整体节点框架、关键输入输出和主要风险，
暂时不要生成完整 YAML。
```

#### 参考开发

```text
请参考 ./reference-flow.yml 的节点结构，
并根据 ./request.md 中的新业务字段重新设计。
先说明哪些逻辑可以复用，哪些不能复用。
```

#### 修改已有 Flow

```text
请分析 ./flow.yml 中“供应商风险判断”节点的上下游影响。
我要调整它的输出字段，先给修改方案，不要直接写文件。
```

#### 分析多个 Flow

```text
请分析 ./main-flow.yml 和 ./related-tool-flow.yml。
说明整体执行路径，并重点看 Code 节点、LLM Prompt、条件判断、
迭代以及跨 Flow 输入输出契约。不要修改文件。
分析后再问我要不要生成 Markdown 报告。
```

#### 整理 LLM Prompt

```text
请根据 ./llm-prompt-material.md 整理这个 LLM 节点的
system prompt 和 user prompt，并说明上游变量应该如何绑定。
```

#### 绘图

```text
请根据 ./flow.yml 画一张适合放进 PowerPoint 的节点级逻辑图。
先确认细节层级和输出格式，再生成文件。
```

</details>

<a id="installation"></a>

## 安装

### 安装边界

```text
DifyFlow-Helper/
├── difyflow-helper/        # ✅ 只安装这个目录作为 Skill 根目录
├── user-kit/               # ❌ 可选材料包，不安装为 Skill
├── README.md               # ❌ 仓库说明
└── README_CN.md            # ❌ 仓库说明
```

正确安装后，Skill 根目录应直接包含：

```text
SKILL.md
references/
assets/
scripts/
docs/
```

如果还需要再进入一层 `difyflow-helper/` 才能看到 `SKILL.md`，说明选择了错误的 Skill 根目录。

### 方式 A：让 Agent 帮你安装

直接复制下面的提示词：

```text
请从下面的 GitHub 仓库安装 DifyFlow-Helper：
https://github.com/allergen1022/DifyFlow-Helper

安装要求：
1. 只安装 difyflow-helper/ 目录，并把它作为 Skill 根目录。
2. 不要安装 DifyFlow-Helper 仓库根目录。
3. 不要把 user-kit/ 安装为 Skill。
4. 安装完成后，确认 SKILL.md、references/、assets/、scripts/、docs/
   直接位于已安装的 Skill 根目录下。
5. 根据当前 Agent、CLI、IDE 或环境的官方说明选择安装路径和方式。
6. 完成后报告实际安装路径和检查结果。
```

### 方式 B：手动安装

1. Clone 或下载本仓库。
2. 查看当前 Agent、CLI 或 IDE 的 Skill 安装说明。
3. 将仓库中的 `difyflow-helper/` 目录添加或复制为 Skill 根目录。
4. 确认 `SKILL.md` 直接位于安装后的 Skill 根目录。

更具体的仓库安装边界见 [`difyflow-helper/docs/INSTALL.md`](./difyflow-helper/docs/INSTALL.md)。

### 兼容目标

- **主要支持：**Codex CLI
- **兼容支持：**Claude Code
- **其他 Agent：**尽力兼容，但不会牺牲核心安全行为

### 是否需要 Python？

不需要。安装和使用 Skill 本身不依赖 Python。

只有在本地运行可选辅助脚本时才需要 Python；读取 YAML 的脚本可能还需要 `PyYAML`。辅助脚本不能绕过确认、源文件保护、在线核验或安全规则。

## 工作流程

```text
用户描述任务或提供原始材料
              │
              ▼
      Agent 判断相关场景
              │
              ▼
    只读取当前任务需要的规则与文件
              │
              ▼
   分析现有逻辑、实际证据和影响范围
              │
              ▼
        说明诊断结论或处理方案
              │
              ▼
       用户确认范围与交付物
              │
              ▼
     安全创建文件或修改源文件副本
```

### 核心原则

| 原则 | 具体行为 |
|---|---|
| **先分析，再行动** | 在生成或改写文件前，先理解需求和已有材料。 |
| **先诊断，再修改** | 出现报错时，优先基于运行证据定位根因。 |
| **先确认，再产生副作用** | 完整 YAML、修改文件、报告、Prompt 文件、图表、插件、凭据和 Git 操作等，在适用场景下需要确认。 |
| **保护源 Flow** | 源 `.yml` / `.yaml` 默认只读，修改版通常写入 `generate/yml/`。 |
| **节点级解释** | 以节点名称为主要定位方式，说明绑定、变量、类型、数据结构、Dify UI 设置和下游消费者。 |
| **核验当前行为** | 涉及准确的 Dify DSL、导入导出、插件或 Structured Output 行为时，按需核验当前可靠资料。 |
| **不编造缺失依赖** | 缺少嵌套 Flow、Tool Flow、插件或输入输出契约时，明确指出缺失，而不是猜测。 |
| **保护敏感信息** | Key、Token、Cookie、Authorization Header、Credential、签名 URL 和不必要的私有数据使用脱敏或占位符。 |

## 仓库结构

```text
DifyFlow-Helper/
├── difyflow-helper/                # 唯一需要安装的 Agent Skill
│   ├── SKILL.md                    # 入口与顶层行为边界
│   ├── references/                 # 路由、安全、Debug、I/O、绘图规则
│   ├── assets/                     # Agent 参考资料与报告模板
│   ├── scripts/                    # 可选只读辅助脚本
│   └── docs/                       # 安装与 Agent 使用说明
├── user-kit/                       # 可选的用户材料准备包
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

核心行为规则位于 [`difyflow-helper/SKILL.md`](./difyflow-helper/SKILL.md) 和 [`difyflow-helper/references/`](./difyflow-helper/references/)；面向 Agent 的使用说明见 [`difyflow-helper/docs/AGENT_GUIDE.md`](./difyflow-helper/docs/AGENT_GUIDE.md)。

## 生成文件如何保存

用户不需要提前创建 `generate/`。只有明确请求或确认文件输出后，Agent 才会在当前 case / project 下创建它。

```text
case/
├── flow.yml
├── debug.txt
└── generate/
    ├── yml/                         # 新建或修改后的 Flow 副本
    ├── reports/                     # Debug、分析与修改方案报告
    ├── prompts/                     # Prompt 与 JSON 输出规范
    ├── diagrams/
    │   ├── mermaid/
    │   ├── javascript/
    │   ├── svg/
    │   ├── html/
    │   └── images/
    └── code/                        # 用户明确要求的独立代码文件
```

示例路径：

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

生成内容不会写入已安装的 Skill 目录或 `user-kit/`。如果只需要聊天输出，则不会创建 `generate/`。

## 节点级输出能力

在相关任务中，DifyFlow Helper 可以说明：

| 范围 | 输出内容 |
|---|---|
| **节点定位** | 以节点名称为主要定位方式，节点 ID 作为辅助参考 |
| **输入绑定** | Dify 参数名、来源节点、来源变量和数据类型 |
| **输出定义** | 输出变量、数据结构和下游消费者 |
| **Dify UI 操作** | 在界面中需要绑定、选择或修改什么 |
| **Code 节点** | 完整替换代码、输入、返回值、类型/空值保护、依赖与占位符 |
| **LLM 节点** | System Prompt、User Prompt、变量、Context、JSON 字段、Structured Output 假设和下游解析影响 |
| **外部依赖** | 插件、API、授权、嵌套 Tool Flow 和缺失的 Flow 依赖 |
| **Flow 分析** | 全局执行路径、重点节点、条件、循环、迭代和多 Flow 输入输出契约 |

## LLM Prompt 与 JSON 输出

Skill 可以帮助：

- 拆分和整理 System Prompt 与 User Prompt；
- 将 Prompt 变量映射到上游节点和输出；
- 判断 Context 来自检索节点、上游节点还是直接变量；
- 设计 JSON 字段并说明下游消费者；
- 排查无效 JSON、字段缺失和下游解析失败；
- 在不改写的前提下分析现有 Prompt；
- 当环境不明确时，区分原生 Structured Output / JSON Schema 与仅依靠 Prompt 的 JSON 约束；
- 经确认后，将 Prompt、输出规范或 JSON Schema 草稿写入 `generate/prompts/`。

用户只要求局部修改时，不代表授权替换完整 Prompt。

<a id="user-kit"></a>

## 用户材料包 `user-kit`

[`user-kit/`](./user-kit/) 是可选的材料准备包，**不是 Agent Skill，也不需要安装**。

当你不知道该提供什么，或希望使用经过脱敏的示例时，可以从以下入口开始：

| 需求 | 入口 |
|---|---|
| 总体说明 | [`user-kit/README.md`](./user-kit/README.md) |
| 中文说明 | [`user-kit/README_CN.md`](./user-kit/README_CN.md) |
| 分场景快速开始 | [`user-kit/quick-start.md`](./user-kit/quick-start.md) |
| 轻量模板 | [`user-kit/templates/`](./user-kit/templates/) |
| 已填写的脱敏示例 | [`user-kit/examples/`](./user-kit/examples/) |
| 公共参考 Flow 指引 | [`user-kit/reference-flows/`](./user-kit/reference-flows/) |
| 图表风格与实现参考 | [`user-kit/diagram-kit/`](./user-kit/diagram-kit/) |

这些模板只是可选起点，不是必须填写的表单。私有业务 Flow、生产日志、凭据、客户数据和私有 Prompt 应保存在你自己的 case 或 project 中。

<a id="optional"></a>

## 可选辅助脚本

Skill 提供少量可选、只读的 Python 辅助脚本：

| 脚本 | 用途 |
|---|---|
| `inspect_dify_yaml.py` | 输出 Flow 的高层摘要 |
| `extract_node_index.py` | 提取节点名称、类型和 ID |
| `extract_node_io.py` | 提取潜在的节点输入输出配置线索 |
| `scan_secrets.py` | 扫描疑似敏感值并仅返回脱敏结果 |
| `generate_mermaid_from_flow.py` | 在用户明确要求绘图后生成基础 Mermaid 草稿 |

本地运行脚本建议使用 Python 3.10+；读取 YAML 的脚本需要 `PyYAML`。详情见 [`difyflow-helper/scripts/SCRIPT_INDEX.md`](./difyflow-helper/scripts/SCRIPT_INDEX.md)。

<a id="safety"></a>

## 安全与确认机制

DifyFlow Helper 会区分低风险分析和可能产生副作用的操作。

### 以下操作通常需要明确确认

- 生成完整可导入的 Dify YAML / YML / DSL；
- 直接修改或覆盖源 Flow；
- 根据 Debug 结论应用 Flow 修改；
- 安装或配置插件；
- 使用真实 API Key、Token、Credential 或 Authorization 值；
- 在聊天输出已经足够时创建大型文件产物；
- 在聊天分析已经足够时创建正式 Flow 分析报告；
- 用户只要求局部修改时替换完整 Prompt；
- 将长 Prompt 或 JSON 规范写入文件；
- 选择用户尚未确认的图表格式或实现方式；
- 执行 `git add`、`commit`、`push`、`reset`、`checkout`、`rebase`、`merge` 等 Git 操作。

### 其他边界

- **当前 Dify 行为：**涉及准确 DSL 字段、导入导出结构、插件配置和模型 Structured Output 行为时，应在必要时核验当前资料。
- **无法在线核验时：**仍可进行本地结构分析和草稿编写，但必须标记为“未核验草稿”，不能声称符合当前导入标准。
- **场景 6 只读：**Flow 分析发现的问题不等于已批准修改，也不等于已确认的运行错误。
- **绘图按需启用：**普通分析不会自动生成图表。
- **参考 Flow 不是标准：**仓库中的示例和占位 Flow 不保证符合当前官方 Dify 导入格式。
- **优先聊天输出：**简短分析、表格、代码片段和 Debug 结论通常直接在聊天中返回，不为了形式而创建文件。

<a id="limitations"></a>

## 这个项目不是什么

DifyFlow Helper 不是：

- Dify 官方产品或 Dify DSL 的官方规范；
- 自动部署、发布或一键上线工具；
- 无提示改写源 Flow 的脚本；
- 强制填写表单的工作流管理系统；
- 生产 Flow、客户数据、私有 Prompt 或运行日志的存储位置；
- 对 Dify 平台、模型能力、插件环境、测试和人工审核的替代品。

Skill 可以整理不完整材料，但不会把假设当作事实。生成的 Flow、代码、Prompt 和图表仍应结合实际 Dify 环境、模型、插件和业务数据进行复核。

## 贡献

欢迎对以下方向进行贡献：

- 路由、确认、Debug、YAML 安全、节点 I/O、LLM Prompt 和绘图规则；
- 更完善的脱敏模板与示例；
- 安全的参考 Flow 和图表风格参考；
- 只读辅助脚本的健壮性与文档。

请勿提交真实凭据、生产日志、签名 URL、客户数据、私有业务数据或私有 Prompt。不要把 case 运行产物放进 `difyflow-helper/` 或 `user-kit/`，也不要把 `user-kit/` 改造成第二个 Skill。

## License

本项目使用 [MIT License](./LICENSE)。

---

<div align="center">

让 Dify Flow 工作更可控、更透明、更安全。

</div>
