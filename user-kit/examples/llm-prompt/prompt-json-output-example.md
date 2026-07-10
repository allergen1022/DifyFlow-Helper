# JSON Output Prompt Example / JSON 输出 Prompt 示例

## 期望字段 / Desired Fields

- `reason`: string, required, at most 100 words
- `result`: string, required, allowed values: `Y` or `N`

## 示例输出 / Example Output

```json
{
  "reason": "The invoice total matches the purchase order amount.",
  "result": "Y"
}
```

## 配置说明 / Configuration Note

JSON Schema 支持取决于当前 Dify 版本和所选模型，不能假设所有环境都支持。需要时应由 agent 确认。

JSON Schema support depends on the current Dify version and selected model; it must not be assumed for every environment. The agent should confirm support when needed.

如果尚未确认 JSON Schema 支持，可以要求 agent 设计 prompt-only JSON constraints，例如仅输出 JSON、不使用 Markdown fences、不输出 JSON 之外的说明，并建议下游增加校验和错误处理。

If JSON Schema support is unconfirmed, ask the agent for prompt-only JSON constraints such as JSON-only output, no Markdown fences, and no text outside JSON, plus downstream validation and error handling.
