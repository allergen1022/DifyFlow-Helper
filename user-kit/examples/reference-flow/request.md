# Reference Flow Example / 参考 Flow 示例

## 新场景目标 / New Target Scenario
基于文档分类流程创建供应商风险材料分类 Flow。 / Build a supplier-risk document classifier from a document-classification Flow.

## 参考 Flow 文件 / Reference Flow File
`reference-flow.yml`

## 哪些逻辑想复用 / Reusable Logic
文件读取、文本清洗、LLM 分类和结构化输出。 / File reading, text cleanup, LLM classification, and structured output.

## 哪些地方需要改变 / Required Changes
类别改为低/中/高风险，并增加原因字段。 / Change categories to low/medium/high risk and add a reason field.

## 想要 agent 输出什么 / Desired Agent Output
复用分析、节点映射和提示词修改建议。 / Reuse analysis, node mapping, and prompt-change recommendations.
