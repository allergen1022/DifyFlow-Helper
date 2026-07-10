# New Flow Example / 新建 Flow 示例

## 业务目标 / Business Goal
从上传的发票文本中提取供应商、发票号、日期和总金额。 / Extract supplier, invoice number, date, and total from uploaded invoice text.

## 用户输入 / User Input
OCR 后的文本。 / OCR text.

## 期望输出 / Expected Output
包含四个字段的 JSON object，并标记缺失字段。 / A JSON object with four fields and missing-field indicators.

## 想要 agent 输出什么 / Desired Agent Output
先给整体节点方案和 IO 表，不生成完整 YAML。 / Provide the node plan and IO table first; do not generate full YAML.

## 补充说明 / Notes
不使用真实发票或凭据。 / Use no real invoice data or credentials.
