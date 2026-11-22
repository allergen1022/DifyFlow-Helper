# 快速开始

只准备当前已有的材料即可。模板是可选的，原始文本也可以直接粘贴给 Agent。

## 新建或修改 Flow

准备 `new-flow-request.md`、`reference-flow-request.md` 或 `modify-flow-request.md`，并在请求中写明相关文件路径。

## 调试

准备 `debug-material.md`，或直接提供 `.txt`、`.json`、`.log`、错误信息、节点输入和输出。内容不要求是合法 JSON。

## Prompt 处理

准备 `llm-prompt-material.md`。需要检查变量绑定或节点上下文时，同时提供 Flow 文件。

## Flow 分析

准备 `flow-analysis-request.md`，或者直接说明要分析的一个或多个 Flow。默认只在聊天中分析，不修改源文件。

## 绘图

准备 `diagram-request.md`，按需参考 `diagram-kit/` 中的格式、方法和样式说明。只有明确要求绘图时才生成图。

## 输出目录

用户确认后，生成文件写入当前 case 的：

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
