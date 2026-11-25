<div align="center">

**简体中文** · [English](./README.md)

<img src="./assets/logo-robot-2-redraw.svg" width="112" height="112" alt="DifyFlow Helper 流程标记">

# DifyFlow Helper

**面向 Dify 应用构建、理解、调试与修改的实用 Agent Skill。**

从一段需求、一个现有 Flow 或一次运行报错出发，逐步得到清晰的设计、基于证据的诊断和范围明确的修改。

<p>
  <img src="https://img.shields.io/badge/Agent_Skill-Dify-168A76?style=flat-square" alt="Dify Agent Skill">
  <img src="https://img.shields.io/badge/Apps-Workflow_%7C_Chatflow_%7C_Agent-245A50?style=flat-square" alt="Workflow、Chatflow 与 Agent 应用">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-E1B454?style=flat-square" alt="MIT License"></a>
</p>

[能做什么](#能做什么) · [快速开始](#快速开始) · [安装](#安装) · [工作方式](#工作方式) · [附加资源](#附加资源)

</div>

---

## 能做什么

DifyFlow Helper 为 Agent 提供一套聚焦的 Dify 应用工作方式。你可以给它一段目标、Flow 导出文件、节点问题，或一次失败运行的原始证据。Agent 根据你提供的材料梳理相关逻辑与影响，并按照你的请求范围完成工作。

| 工作内容 | Skill 可以协助的事 |
|---|---|
| **设计或搭建** | 根据应用类型、输入、输出和预期行为梳理新应用。支持 Workflow、Chatflow、独立 Agent 应用及目标 Dify 部署支持的其他应用类型；按需提供节点方案、代码、Prompt 或完整 YAML。 |
| **参考已有 Flow** | 区分可复用结构与特定场景逻辑，只迁移适合当前目标的部分。 |
| **修改现有应用** | 追踪节点输入、变量绑定、输出和下游使用关系，再进行范围明确的修改。 |
| **排查运行问题** | 接收原始日志、面板内容、节点输入输出、堆栈或报错文本；先诊断问题，再决定是否修改 Flow。 |
| **理解或比较 Flow** | 说明执行路径、节点职责、条件、循环、Prompt、依赖和跨 Flow 契约；只读分析不会改动源文件。 |
| **准备交付物** | 按需整理开发文档、报告、Prompt 文件、代码文件或图表。 |

新建应用时，如果应用类型会改变设计，就先明确类型再往下设计。已有应用则尽量从请求或源文件识别类型。Workflow 和 Chatflow 的节点画布可以共用部分分析方法；其他应用类型按其自身配置界面和当前文档处理。

在节点层面，Skill 可以追踪配置输入对应的来源变量，说明输出结构和下游使用关系，并梳理 Prompt 变量绑定。涉及原生结构化输出支持时，会与仅靠 Prompt 约束的做法区分；需要精确结论时先核对当前 Dify 行为。

### 语义判断与确定性处理

在 Workflow 和 Chatflow 中，LLM 节点负责理解含义，例如解读自然语言、按意图分类或生成自然语言内容；Code 或原生逻辑节点负责精确计算、固定映射、校验和数据整形。一个任务两者都需要时，明确分工，并只传递完成任务所需的上下文。

### 聚焦代码与 Prompt

处理特定 Code 节点或 LLM Prompt 时，可使用可选脚本从导出的 Flow 中提取相关内容。提取结果只是只读工作视图，仍需结合源 Flow 检查变量绑定和上下游关系。开发者也可以选择用代表性输入在本地运行节点代码并设置断点，遵循节点配置的 JavaScript 或 Python 函数签名。本地检查不能证明代码在 Dify 运行环境中的行为。

## 快速开始

把需求和已有材料直接贴进对话，或告诉 Agent 文件路径即可。不需要先整理固定目录或填写完整表单。

```text
使用 ./flow.yml 作为源 Flow，./run-log.txt 作为失败证据。
排查“解析结果”代码节点为什么返回空对象，说明判断依据和可能原因。
先不要修改 Flow。
```

新建应用时，如果已确定类型，可以直接写明；如果类型不清楚且会影响设计，Agent 会先解决这个选择。

```text
我需要一个 Dify Workflow，用于规范化输入记录并判断文本含义。
请先给出节点职责、输入、输出和主要风险。
语义判断放在 LLM 步骤，精确的数据规范化由代码处理。
```

其他常见请求：

```text
修改 ./flow.yml 中的“规范化结果”节点，让它返回新增字段。
先追踪该节点的绑定和下游使用关系，再只做这项修改。
```

```text
比较 ./main.yml 和 ./called-flow.yml，说明它们的调用关系、输入输出契约
以及缺少的信息。不要修改文件。
```

## 安装

作为 Agent Skill 安装时，**只安装 [`difyflow-helper/`](./difyflow-helper/)**。这个目录才是真正的 Skill，包含 `SKILL.md` 及其使用的参考规则、资源、脚本和指引。从本仓库安装时，将该目录选为 Skill 根目录；不要把仓库根目录或 `user-kit/` 当作 Skill 安装。

本 Skill 使用通用 `SKILL.md` 格式，可通过以下工具各自的技能加载方式使用：

- **编码智能体：** Codex、Claude Code、OpenCode、ZCode 等支持 Agent Skills 格式的工具。
- **智能体运行框架（Harness）：** Pi（提供编码智能体命令行工具）、DeepSeek Harness（需启用本地技能文件系统插件）等支持 Agent Skills 格式的框架或运行时。
- **个人与办公助手：** Hermes Agent、OpenClaw、WorkBuddy（手动上传）等支持 Agent Skills 格式的助手。

安装完成后，所选 Skill 根目录下应直接看到 `SKILL.md`。从仓库或本地目录添加 Skill 的具体步骤，请遵循所用 Agent 当前的官方说明；包边界见[安装说明](./difyflow-helper/docs/INSTALL.md)。

Skill 本身不依赖 Python。只有在本地运行可选辅助脚本时才需要 Python；读取 YAML 的脚本可能还需要 `PyYAML`。

## 工作方式

- **从请求和已有证据开始。** 可以提供原始文本或不完整材料，不需要填写固定表单。
- **按任务读取规则。** 入口 Skill 会根据新建、修改、调试、分析、绘图等任务读取相关参考资料。
- **依据可靠来源判断。** 以现有 Flow 配置和运行证据为基础；涉及精确 Dify 行为或集成参数时，按需核对官方文档。
- **控制修改范围。** 修改和调试默认直接改源文件，并将差异限制在明确要求的部分。`generate/` 只存放全新产物；用户要求保留源文件时，修改后的副本也放在这里。只有需要输出文件时才创建该目录，安装 Skill 时不创建它。
- **交付形式从简。** 分析、方案、代码片段和简洁结论默认在聊天中返回；用户需要时再生成报告、开发文档或图表。清晰的请求已授权按范围执行；只有缺失选择会实质影响结果时才进一步确认。

### 工具、插件、API 与 MCP

用户请求接入外部工具但没有指定参数策略时，先确认使用文档默认值还是添加任务所需的额外参数。用户要求自定义参数后，根据服务提供方与目标 Dify 的官方文档核对，不凭空编造配置。

对于要直接导入的 Flow，核对 Dify/DSL 官方版本资料并说明采用的版本依据。涉及插件、工具、API 或 MCP 时，也说明已核实的集成版本与兼容性；尚未确认的版本需在导入或使用前与目标环境核对。

### 敏感信息

使用目标 Dify 版本和集成实际支持的受保护密钥存储方式。不能仅凭值放在环境变量、隐藏输入、Prompt、Code 节点或导出文件中，就认为它已加密。检查 YAML 或配置文件时，Skill 会留意疑似凭据，并在不复述敏感值的情况下提示用户。

## 附加资源

### 可选辅助脚本

脚本可以检查导出 YAML、列出节点、提取可能的 I/O 配置信息、提取 Code 和 LLM Prompt 内容、扫描疑似密钥并脱敏显示结果，以及生成 Mermaid 图表草稿。使用 Skill 不依赖这些脚本；脚本结果也不能替代对原始 Flow 的检查。

脚本清单和用法见 [SCRIPT_INDEX.md](./difyflow-helper/scripts/SCRIPT_INDEX.md)。

用户需要开发文档时，Skill 可参考内置的中英文风格示例并按任务调整，不把它们当作固定模板。图表可按用途选择 Mermaid、SVG、HTML 或 JavaScript 等形式。

### User Kit

[`user-kit/`](./user-kit/) 是独立的可选材料包，包含中英文模板、示例、参考 Flow 和图表参考，不属于 Skill 安装内容。按需选用即可，也可以直接提供自己的文件或聊天材料。

- [English materials](./user-kit/en_US/)
- [简体中文材料](./user-kit/zh_CN/)

### 文档

- [Agent 使用指引](./difyflow-helper/docs/AGENT_GUIDE.md)
- [安装说明](./difyflow-helper/docs/INSTALL.md)
- [Skill 入口](./difyflow-helper/SKILL.md)

## 项目边界

DifyFlow Helper 是独立的社区 Skill，不是 Dify 官方产品，也不保证草稿适用于所有 Dify 版本。它不会自动部署应用，也不会悄悄重写源 Flow。可导入 YAML、集成配置、代码和 Prompt 应结合目标环境复核，并按需实际测试。

参考示例和 User Kit 都只是辅助材料，不是必需输入，也不是权威 Dify 规范。真实凭据、生产日志、客户信息、私有 Prompt 和特定项目的 Flow 数据应保存在自己的工作区，不要提交到本仓库。

## 许可证

本项目采用 [MIT License](./LICENSE)。
