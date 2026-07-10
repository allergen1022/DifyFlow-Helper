# Modify Flow Example / 修改 Flow 示例

## 源 Flow 文件 / Source Flow File
`source-flow.yml`

## 目标节点 / Target Node
`Normalize Invoice Input`

## 想修改什么 / Requested Change
兼容上游返回的 JSON object 和 JSON string，并统一输出 `invoice_data` object。 / Accept either a JSON object or JSON string and normalize to an `invoice_data` object.

## 为什么要修改 / Reason
部分输入触发 `JSON.parse` 报错。 / Some inputs trigger a `JSON.parse` error.

## 相关输入 / Relevant Input
已脱敏的 object 或 escaped JSON string。 / Sanitized object or escaped JSON string.

## 是否只要修改方案，还是要生成修改后的文件 / Plan Only or Modified File?
先给方案和完整替换代码，确认后再生成文件。 / Provide the plan and full replacement code first; generate a file only after confirmation.
