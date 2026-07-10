# LLM Prompt Material / LLM 节点 Prompt 材料

这是可选的轻量材料模板，不是严格的 prompt engineering 表单。未知内容可留空。

This is an optional lightweight material template, not a strict prompt-engineering form. Leave unknown items blank.

## 1. Flow 文件 / Flow File

- 文件名 / File name:
- 仅重写 prompt 时可不提供；检查变量绑定或节点上下文时建议提供。 / Optional for prompt rewriting; useful for inspecting bindings or node context.

## 2. LLM 节点名称 / LLM Node Name

- 节点名称（优先）/ Node name (preferred):
- 节点 ID（可选）/ Node ID (optional):

## 3. 当前 System Prompt / Current System Prompt

只有一个 prompt 区域或内容未知时可留空。 / Leave blank if there is only one prompt area or the content is unknown.

```text

```

## 4. 当前 User Prompt / Current User Prompt

可直接粘贴包含变量的原始 prompt。 / Paste raw prompt text, including variables.

```text

```

## 5. Prompt 变量 / Prompt Variables

精确 Dify 变量路径有帮助，但不是必填。 / Exact Dify variable paths help but are optional.

- `query`: from Start node user input
- `documents`: from Knowledge Retrieval node result
- `context`: from previous node / conversation context

## 6. Context 上下文 / Context

说明检索结果或上游节点内容如何注入；不知道可留空。 / Describe retrieved or upstream content and how it is injected; leave blank if unknown.

## 7. 期望输出 / Expected Output

描述 LLM 应生成的内容。 / Describe what the LLM should produce.

## 8. 是否需要 JSON 输出 / JSON Output Needed?

- Yes / No / Not sure:
- Why JSON is needed:

## 9. JSON Schema 或字段要求 / JSON Schema or Field Requirements

可粘贴已有 JSON Schema，或只列出期望字段。Dify/model 是否支持 JSON Schema 需由 agent 在必要时确认；不支持或不确定时，agent 可设计 prompt-only JSON fallback。

Paste an existing JSON Schema or list expected fields. The agent should confirm Dify/model support when needed; if unsupported or uncertain, it can design a prompt-only JSON fallback.

- `reason`: string, explanation within 100 words
- `result`: string, allowed values: `Y` / `N`

## 10. 想让 agent 怎么处理 / Desired Agent Action

- [ ] 只帮我审查当前 prompt / Review only
- [ ] 帮我重写完整 system prompt 和 user prompt / Rewrite full system and user prompts
- [ ] 只修改某一段 / Modify selected part only
- [ ] 帮我设计 JSON 输出要求 / Design JSON output requirement
- [ ] 帮我生成可复制到 Dify 的 prompt 文件 / Generate prompt files for Dify

## 11. 补充说明 / Notes


## 12. 脱敏提醒 / Sanitization Reminder

不要提供 API key、access token、authorization header、cookie、凭据、私有 bucket URL、签名 URL、不必要的个人/私有数据，或 prompt 设计不需要的私有文档。请使用 `<REDACTED_PRIVATE_CONTEXT>`、`<REDACTED_SIGNED_URL>`、`<REDACTED_CUSTOMER_DATA>` 或 `<REDACTED_INTERNAL_POLICY>`。

Do not include API keys, access tokens, authorization headers, cookies, credentials, private bucket URLs, signed URLs, unnecessary personal/private data, or private documents not needed for prompt design. Use the placeholders above.
