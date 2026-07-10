# Raw Prompt Example / 原始 Prompt 示例

下面这种未整理内容也可以直接交给 agent。 / Messy prompt text like this can be given directly to the agent.

```text
old prompt v2? supplier check / 供应商审核

system maybe:
you are compliance reviewer, use rules from {{context}}, don't guess

用户输入 {{query}}
document = {{supplier_document}}

need JSON because next node checks result
return result Y/N and reason, reason short, no markdown maybe

TODO: context comes from retrieval? exact binding unknown
旧备注：如果资料不全，也先返回 N？这个规则需要确认。

Private policy text: <REDACTED_INTERNAL_POLICY>
Customer data: <REDACTED_CUSTOMER_DATA>
file link: <REDACTED_SIGNED_URL>
```
