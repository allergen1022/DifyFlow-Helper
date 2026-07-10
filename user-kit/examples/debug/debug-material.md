# Debug Material Example(md) / Debug 材料示例（md）

## 0. 前提需知 / Pre-Notes
该debug材料为md标准格式，部分内容需支持md语法填写，如代码节点。 / This debug material is in the md standard format. Some parts require filling in with md syntax, such as code nodes.

## 1. Flow 文件 / Flow File
`invoice-check.yml`

## 2. 报错节点 / Failing Node
`Parse Invoice JSON`

## 3. 节点类型 / Node Type
Code / JavaScript

## 4. 报错信息 / Error Message

```text
SyntaxError: Unexpected token '`', "```json"... is not valid JSON
exit status 1
```

## 5. 节点输入 / Node Input

````text
model_output = ```json
{"invoice_no":"INV-DEMO-001","total":128.50}
```
````

## 6. 节点输出 / Node Output

```text

```

## 7. 期望输出 / Expected Output
返回 `invoice_data` object。 / Return an `invoice_data` object.

## 8. 最近改动 / Recent Change
LLM 提示词改为 Markdown fenced JSON。 / The LLM prompt was changed to fenced JSON.

## 9. 补充说明 / Notes
问题只发生在带代码围栏的输出。 / The issue occurs only with fenced output.

## 10. 脱敏提醒 / Sanitization Reminder
示例不包含真实发票、URL 或凭据。 / This example contains no real invoices, URLs, or credentials.
