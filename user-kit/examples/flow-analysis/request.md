# Flow 分析需求 / Flow Analysis Request

> 示例说明 / Example note: This is a synthetic, sanitized example. It does not include production data, real URLs, secrets, complete production prompts, or importable sample YAML.

## 1. Flow 文件 / Flow Files

```text
./main-customer-routing-flow.yml
./customer-profile-tool-flow.yml
```

## 2. 主要 Flow / Primary Flow

```text
Primary Flow:
./main-customer-routing-flow.yml
```

## 3. 关联 Flow 与关系 / Related Flows and Relationships

中文：`main-customer-routing-flow.yml` 是主流程。它看起来会调用 `customer-profile-tool-flow.yml` 获取客户画像或标签信息，但我不确定具体输入输出字段是否完全一致。  
English: `main-customer-routing-flow.yml` is the main Flow. It appears to call `customer-profile-tool-flow.yml` to fetch customer profile or tag information, but I am not sure whether the input and output fields match exactly.

## 4. 分析重点 / Analysis Focus

中文：整体上请做全局分析，但额外关注以下部分。  
English: Please provide mostly global analysis, with extra focus on the following areas.

```text
- Code node: "Normalize Customer Profile"
- LLM node: "Generate Routing Reason"
- Condition node: "Is High Priority Customer"
- Nested/tool Flow interface between the main Flow and customer-profile-tool-flow.yml
```

## 5. 想重点查看的内容 / Areas to Review

```text
- Whether the Code node output fields are used consistently downstream.
- Whether the LLM node prompt variables match upstream node outputs.
- Whether the high-priority condition has a clear fallback path.
- Whether the nested/tool Flow input/output contract is clear from the provided files.
```

## 6. 具体问题 / Questions

```text
1. What is the apparent overall execution path of the main Flow?
2. Which nodes provide the final routing decision and explanation?
3. Are there any unclear bindings or missing related-Flow contracts?
4. Which findings are confirmed from the files and which are only inferred?
```

## 7. 期望输出 / Desired Output

```text
[ ] Chat analysis only
[x] Ask after chat analysis whether to create a report
[ ] Markdown analysis report
```

中文：请先在聊天中输出分析，不要直接创建文件。分析后再问我要不要生成 Markdown 报告。  
English: Please provide the analysis in chat first. Do not create files directly. Ask me after the analysis whether I want a Markdown report.

## 8. 补充说明 / Notes

中文：示例 Flow 中的字段名、节点名和业务说明都是虚构的。真实项目中我会把敏感信息替换成占位符。  
English: The field names, node names, and business descriptions in this example are synthetic. In a real project, I would replace sensitive information with placeholders.

## 9. 脱敏提醒 / Sanitization Reminder

```text
No real API keys, tokens, authorization headers, cookies, signed URLs, private file URLs, customer identifiers, or production prompts are included.
```
