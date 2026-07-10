# LLM Prompt Material / LLM 节点 Prompt 材料

## 1. Flow 文件 / Flow File

- `supplier-review.yml`

## 2. LLM 节点名称 / LLM Node Name

- 节点名称 / Node name: `Supplier Compliance Review`
- 节点 ID / Node ID: unknown

## 3. 当前 System Prompt / Current System Prompt

```text
You review supplier documents against the provided compliance rules. Use only the supplied context and do not invent missing facts.
```

## 4. 当前 User Prompt / Current User Prompt

```text
Review {{supplier_document}} against {{compliance_rules}} and return the decision with a short reason.
```

## 5. Prompt 变量 / Prompt Variables

- `supplier_document`: from Document Extractor output
- `compliance_rules`: from Knowledge Retrieval result

## 6. Context 上下文 / Context

检索节点返回已脱敏的规则片段；不确定它是 context input 还是 prompt variable。 / The retrieval node returns sanitized rule excerpts; whether it is a context input or prompt variable is unknown.

## 7. 期望输出 / Expected Output

合规判断和不超过 100 词的原因。 / A compliance decision and a reason of at most 100 words.

## 8. 是否需要 JSON 输出 / JSON Output Needed?

- Yes
- Why JSON is needed: downstream Condition node reads `result`.

## 9. JSON Schema 或字段要求 / JSON Schema or Field Requirements

- `reason`: string, max 100 words
- `result`: string, `Y` or `N`
- JSON Schema support: not confirmed for the current Dify/model environment

## 10. 想让 agent 怎么处理 / Desired Agent Action

- [x] 帮我重写完整 system prompt 和 user prompt / Rewrite full system and user prompts
- [x] 帮我设计 JSON 输出要求 / Design JSON output requirement

## 11. 补充说明 / Notes

If native JSON Schema support cannot be confirmed, provide prompt-only JSON constraints and parsing safeguards.

## 12. 脱敏提醒 / Sanitization Reminder

示例内容已脱敏；真实规则使用 `<REDACTED_INTERNAL_POLICY>`。 / This example is sanitized; real rules use `<REDACTED_INTERNAL_POLICY>`.
