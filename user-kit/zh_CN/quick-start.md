# 快速开始

只准备当前已有的材料即可。模板是可选的，原始文本也可以直接粘贴给 Agent。

## 新建或修改 Flow

准备 `new-flow-request.md`、`reference-flow-request.md` 或 `modify-flow-request.md`，并在请求中写明相关文件路径。新建应用时，已知的话注明应用类型；如果类型会影响设计，就先确定类型。若 Flow 需要直接导入，已知的话提供目标 Dify 版本。Agent 会核对最新官方 DSL 资料，并说明已核实的 Dify/DSL 及所需集成版本；导入前请再与目标环境核对。

## 调试

准备 `debug-material.md`，或直接提供 `.txt`、`.json`、`.log`、错误信息、节点输入和输出。内容不要求是合法 JSON。聚焦某个 Code 节点或 Prompt 时，可以从导出的 Flow 中提取相关内容，但仍需检查源 Flow 的变量绑定。

## Prompt 处理

准备 `llm-prompt-material.md`。需要检查变量绑定或节点上下文时，同时提供 Flow 文件。

## Flow 分析

准备 `flow-analysis-request.md`，或者直接说明要分析的一个或多个 Flow。默认只在聊天中分析，不修改源文件。

## 绘图

准备 `diagram-request.md`，按需参考 `diagram-kit/` 中的格式、方法和样式说明。只有明确要求绘图时才生成图。

## 输出目录

全新文件写入当前 case 的 `generate/` 目录。修改或 Debug 默认对源文件做最小差异修改；若需保留源文件，请要求在 `generate/` 中生成副本。只有需要输出新文件时才创建该目录：

```text
generate/yml/
generate/reports/
generate/prompts/
generate/diagrams/mermaid/
generate/diagrams/javascript/
generate/diagrams/svg/
generate/diagrams/html/
generate/diagrams/images/
generate/code/
```

不要把业务数据或生成文件写入 `user-kit/` 或已安装的 `difyflow-helper/`。
