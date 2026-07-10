# Flow Analysis Rules

## Purpose

Scene6: Flow Analysis is for analyzing, explaining, reviewing, inspecting, comparing, or documenting one or more existing Dify Flows without modifying them.

Use it when the user wants to understand existing logic rather than build a new Flow, change a Flow, debug a reported failure, or create a diagram.

## Trigger conditions

Route to Scene6 when:

- one or more existing Flows are provided or referenced;
- the main intent is analysis, explanation, review, inspection, comparison, tracing, or documentation;
- no primary request asks for new development, modification, debugging, or diagram output.

Typical requests include:

```text
Analyze this Flow.
Explain these related Flows.
Review the Code nodes.
Analyze the LLM prompts and bindings.
Trace the cross-Flow input/output contract.
```

Users do not need to say "Scene6".

## Analysis-only boundary

Scene6 is read-only by default.

Do not:

- modify source Flow files;
- normalize or rewrite YAML in place;
- rewrite Code nodes;
- rewrite prompts;
- change bindings;
- generate modified Flow files;
- configure plugins or credentials;
- create diagrams;
- treat possible risks as confirmed runtime errors.

If the user later asks for a change, route to Scene3. If the user reports a failure or requests root-cause diagnosis, route to Scene4. If the user asks for a diagram, route to Scene5. If the user wants to use the analyzed Flow to build a new Flow, route to Scene2.

## Global analysis mode

Use global analysis when the user asks to analyze a Flow without specifying a focus. Do not force the user to fill a checklist first.

Cover the important available areas, proportional to Flow complexity:

- apparent purpose and Flow type when observable;
- entry inputs and end outputs;
- main execution path;
- node inventory and roles;
- control flow;
- data flow and variable bindings;
- important Code nodes;
- important LLM nodes and prompts;
- conditions, iteration, and loops;
- plugins, APIs, tools, knowledge sources, and external dependencies;
- nested or related Flows;
- output contracts;
- risks, uncertainty, missing evidence, and unresolved dependencies.

Do not claim business purpose as fact when it is inferred from names or prompts.

## Focused analysis mode

Use focused analysis when the user names a target area, such as Code nodes, LLM prompts, conditions, iteration, loops, bindings, tools, plugins, nested Flows, output contracts, or a specific node.

Focused analysis must:

- honor the requested focus;
- read enough upstream and downstream context to avoid misleading conclusions;
- avoid unrelated exhaustive analysis unless it reveals a material dependency;
- state which surrounding nodes were included and why;
- distinguish direct evidence from inference.

## Multi-Flow analysis mode

Use multi-Flow analysis when several related Flows are provided.

Identify each Flow by path or user label. Determine the primary Flow when possible. Analyze each Flow independently, then explain caller/callee, tool, nested-Flow, handoff, shared schema, shared variable, or output-contract relationships where evidence exists.

Separate confirmed relationships from inferred relationships. If a related Flow is missing, say so and do not invent its content or output contract. Ask one targeted question only when the relationship cannot be determined and the uncertainty materially changes the analysis.

## Overall structure analysis

For global analysis, cover:

- Flow name or file name;
- Flow type when observable;
- apparent purpose;
- entry inputs;
- end outputs;
- major stages;
- primary execution path;
- branch points;
- repeated sections;
- external dependencies;
- nested Flow dependencies;
- important output contracts.

## Node and topology analysis

Use node names as primary locators and node IDs as secondary locators.

Use compact tables when helpful:

| Node | Type | Main role | Main inputs | Main outputs | Downstream use |
|---|---|---|---|---|---|

Do not dump every raw YAML field into the analysis.

## Data flow and I/O binding analysis

Analyze:

- input variables;
- source nodes and source variable names;
- expected data types;
- transformations;
- output variables;
- downstream consumers;
- missing or ambiguous bindings;
- schema changes across nodes.

For multiple related Flows, include cross-Flow data contracts when observable.

## Code node analysis

When a Code node is in scope, analyze the existing code without replacing it.

Cover as applicable:

- programming language;
- expected input variables;
- main processing responsibility;
- major control flow;
- return structure;
- output variables;
- type assumptions;
- null or empty-value handling;
- error handling;
- third-party dependencies;
- environment assumptions;
- potential side effects;
- downstream consumers;
- risks and unclear behavior.

If code is missing or truncated, say so and limit conclusions.

## LLM node and prompt analysis

When an LLM node is in scope, analyze:

- model configuration when visible;
- System Prompt;
- User Prompt;
- prompt variables and source bindings;
- context source;
- retrieval or knowledge inputs;
- expected response format;
- JSON or structured-output requirements;
- JSON Schema configuration when present;
- downstream parsing and field consumers;
- prompt conflicts, missing variables, hidden assumptions, and output stability risks.

Do not rewrite prompts in Scene6 unless the user asks to move into modification. Do not assume JSON Schema or native structured output support without current verification when exact support matters.

## Condition analysis

For condition nodes, analyze:

- input variable and source binding;
- operator and comparison value;
- branch labels and branch destinations;
- branch coverage;
- default or fallback behavior;
- overlapping conditions;
- provably unreachable branches;
- missing-value behavior;
- type mismatch risk.

Do not call a branch unreachable unless local evidence supports it.

## Iteration and loop analysis

For iteration, loop, or repeated processing, analyze as observable:

- source collection;
- item and index variables;
- body nodes;
- variables carried into the body;
- intermediate outputs;
- aggregation behavior;
- exit or completion behavior;
- error behavior;
- concurrency behavior when explicitly configured;
- downstream consumers.

Exact claims about current Dify iteration, loop, concurrency, or failure semantics require current verification when local configuration is insufficient.

## Plugin, API, tool, and nested-Flow analysis

Analyze:

- dependency name;
- purpose;
- configured inputs;
- expected outputs;
- authentication placeholders;
- downstream use;
- missing configuration;
- missing referenced Flow;
- environment-specific assumptions.

Never echo full secrets, tokens, cookies, authorization headers, private URLs, or signed URLs. Never invent a missing tool or nested Flow contract.

## Evidence, inference, uncertainty, and missing materials

Use clear labels:

```text
Confirmed from the provided Flow
Likely based on local structure
Requires runtime evidence
Requires the related Flow
Requires current Dify verification
Unknown
```

Use these labels especially for runtime behavior, plugin behavior, model behavior, JSON parsing, iteration behavior, missing nested Flows, environment variables, credentials, and external API contracts.

## Chat output behavior

Return useful analysis in chat by default. Keep it concise enough to read and complete enough to answer the request.

Recommended sections:

```markdown
## Analysis Scope
## Flow Overview
## Main Execution Path
## Focus Findings
## Key Node and Data Relationships
## Risks, Missing Evidence, and Uncertainty
## Suggested Next Step
```

Use only the headings that improve clarity.

## Report confirmation behavior

After chat analysis, ask:

```text
Would you like me to write this as a Markdown analysis report under generate/reports/?
```

Do not ask if the user requested chat-only output or already requested a report file.

An explicit initial request such as "Analyze this Flow and write a Markdown analysis report" counts as confirmation for creating a new report under the standard safe output path, unless the destination is ambiguous, the file would overwrite an existing file, the user asks for a path outside the current case or project, or sensitive content requires additional scope clarification.

## Report output path and naming

Write confirmed reports only under the current case:

```text
generate/reports/
```

Use lowercase kebab-case where practical:

```text
generate/reports/<flow-name>-analysis-report.md
generate/reports/<flow-name>-<focus>-analysis-report.md
generate/reports/<case-name>-multi-flow-analysis-report.md
```

Create missing directories only after confirmation. Do not overwrite existing reports without explicit confirmation. Always state the exact relative path.

## Scene handoffs

- Scene6 to Scene3: user asks to modify, rewrite, optimize, repair, or edit.
- Scene6 to Scene4: user reports a failure, provides runtime failure evidence, or asks for root-cause diagnosis.
- Scene6 to Scene5: user asks for Mermaid, JavaScript, SVG, HTML, image, or diagram output.
- Scene6 to Scene2: user asks to use the analyzed Flow as reference for a new Flow.

Do not perform the next scene's side effects without its normal confirmation requirements.

## Web verification boundary

Local structural analysis normally does not require web verification.

Verify current behavior when making exact claims about current Dify DSL fields, node semantics, iteration or loop behavior, concurrency behavior, model structured output, plugin/tool behavior, or import compatibility.

Label conclusions as local observation, local inference, externally verified, or unknown.

## Security and redaction

Do not include full API keys, tokens, cookies, authorization headers, signed URLs, private bucket URLs, unnecessary personal data, or private business content in analysis or reports. Use placeholders or summaries.

Do not treat recommendations as approved changes.
