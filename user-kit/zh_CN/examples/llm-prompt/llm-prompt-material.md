# LLM Prompt 材料示例

## 节点

Classify Supplier Document

## 变量

- query：用户请求
- document_text：提取后的文档内容

## 期望输出

返回包含 risk_level 和 reason 的 JSON。

## 处理方式

审查当前 Prompt，并提出分离后的 System Prompt 和 User Prompt。
