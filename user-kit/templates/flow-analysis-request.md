# Flow 分析需求 / Flow Analysis Request

> 中文：这是一个轻量模板，不是严格表单。除 Flow 路径或粘贴内容需要可识别外，其余字段都可以留空、删除、改名或直接写原始说明。  
> English: This is a lightweight template, not a strict form. Except for identifiable Flow paths or pasted Flow content, every field is optional.

## 1. Flow 文件 / Flow Files

中文：列出一个或多个 Flow 文件路径，或直接粘贴 Flow 内容。  
English: List one or more Flow file paths, or paste Flow content directly.

```text
./flow.yml
./main-flow.yml
./related-tool-flow.yml
```

## 2. 主要 Flow / Primary Flow

中文：如果有多个 Flow，请说明哪个是主要 Flow；不确定可以留空。  
English: If several Flows are provided, identify the primary Flow if known. Leave blank if unsure.

```text
Primary Flow:
```

## 3. 关联 Flow 与关系 / Related Flows and Relationships

中文：简要说明这些 Flow 之间可能的调用、工具、嵌套、交接或数据传递关系。  
English: Briefly describe possible calling, tool, nested, handoff, or data-transfer relationships.

```text
Relationship notes:
```

## 4. 分析重点 / Analysis Focus

中文：留空表示做全局分析。也可以指定一个或多个重点。  
English: Leave blank for global analysis. You may also specify one or more focus areas.

可选重点 / Possible focus areas:

```text
overall logic
node chain
node I/O and bindings
Code nodes
LLM prompts
conditions
iteration or loops
plugins, APIs, or tools
nested or related Flows
cross-Flow contracts
risks and maintainability
```

## 5. 想重点查看的内容 / Areas to Review

中文：如果有具体节点、变量、分支、输出字段或依赖，请写在这里。  
English: List specific nodes, variables, branches, output fields, or dependencies if any.

```text
Nodes / Variables / Dependencies:
```

## 6. 具体问题 / Questions

中文：写下你希望 Agent 回答的问题。可以是自然语言。  
English: Write the questions you want the agent to answer. Natural language is fine.

```text
Questions:
```

## 7. 期望输出 / Desired Output

中文：选择或改写下面的输出偏好。默认建议先在聊天中分析。  
English: Choose or rewrite the desired output. Chat analysis first is usually recommended.

```text
[ ] Chat analysis only
[ ] Ask after chat analysis whether to create a report
[ ] Markdown analysis report
```

确认后的分析报告通常写入 / Confirmed analysis reports normally go to:

```text
generate/reports/
```

## 8. 补充说明 / Notes

中文：可以粘贴原始说明、Dify 面板内容、节点配置片段、Prompt 片段或其他上下文。  
English: Paste raw notes, Dify panel content, node configuration snippets, prompt snippets, or other context.

```text
Notes:
```

## 9. 脱敏提醒 / Sanitization Reminder

中文：提交前请删除或替换真实密钥、Token、Cookie、授权头、签名 URL、私有文件链接、客户数据、生产日志和不必要的个人信息。  
English: Before sharing, remove or replace real keys, tokens, cookies, authorization headers, signed URLs, private file links, customer data, production logs, and unnecessary personal data.

推荐占位符 / Suggested placeholders:

```text
<REDACTED_API_KEY>
<REDACTED_TOKEN>
<REDACTED_AUTH_HEADER>
<REDACTED_SIGNED_URL>
<PRIVATE_FILE_URL_REDACTED>
<PRIVATE_DATA_REDACTED>
```
