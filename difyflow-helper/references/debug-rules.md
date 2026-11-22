# Raw-First Debug Rules

Scene4 debugging is different from Scene6 Flow analysis. Use Scene4 when the user reports a failure, runtime evidence indicates a failure, or the user asks for root-cause diagnosis. Possible risks found during read-only analysis are not automatically confirmed runtime errors.

Scene6 may identify "requires runtime evidence" without treating a risk as a confirmed failure. If the user wants to investigate it, use Scene4. Apply a source change only when requested.

When a debug fix is requested, make the smallest possible diff directly in the source file, limited to the diagnosed cause. Do not regenerate or reformat unrelated Flow content. If the user asks to keep the source unchanged, place the fixed copy under `generate/`.

Accept `.md`, `.txt`, `.json`, `.log`, `.yml`, `.yaml`, pasted chat text, and Dify UI panel content. Do not require clean JSON or force the user to split node input, output, and errors.

## Focused Code and Prompt Work

For a request focused on one or more Code nodes or LLM prompts, extract only the relevant content from the supplied Flow when that makes review or debugging easier. The optional scripts/extract_node_content.py can extract Code nodes, LLM System/User Prompts, or both from exported YAML structures it recognizes. Extraction is read-only; extracted text is a working view, not a replacement for the source Flow. If expected content is missing, inspect the original YAML and verify its structure rather than assuming the extraction is complete. Recheck node bindings and upstream/downstream context before diagnosing or changing behavior. Review extracted content for embedded secrets or private data before quoting or saving it.

This applies to focused debugging and maintenance of existing Flows, including work on a newly created Flow after its first implementation. It is optional; do not extract content when the supplied material already gives enough context.

## Optional Local Code Debugging

When a developer asks to reproduce a Code node locally, inspect values with breakpoints, or exercise code before placing it in Dify, a small local harness may call the node's function with representative values matching its configured input parameters. Follow the node's configured JavaScript or Python language and actual function signature. Keep local test entry points and fixtures separate from code intended to paste into Dify, and avoid committing secrets or private production data in fixtures.

Local execution checks only the code path and inputs exercised by the harness. It does not establish Dify sandbox, dependency, variable-binding, node, or end-to-end Flow behavior; use a Dify run for those claims. Do not create a local harness unless requested or clearly useful to the developer's stated task.

Accept empty output plus error text, `error_msg`, stack traces, Node.js/Python failures, tool invocation errors, mixed or escaped JSON, model IO, plugin/tool bodies, HTTP status/bodies, `exit status 1`, and signed/private URLs that require redaction.

Inspect the supplied material before asking for more. Ask one concise, bundled question only for missing evidence that materially affects diagnosis; do not require every item in the list below or re-ask for information already provided. The user may keep everything in one Markdown or text file.

An optional format is:

```text
# Debug Material
## Flow
## Failing Node
## Error
## Node Input
## Node Output
## Expected Output
## Recent Change
```

Preserve raw evidence before internal normalization. Normalize when possible into `failing_flow`, `failing_node`, `failing_node_type`, `node_input_raw`, `node_output_raw`, `error_message_raw`, `stacktrace_raw`, `expected_output`, `recent_change`, `parsed_error_type`, `likely_error_location`, and `missing_information`. Never present normalized content as the original.

An optional concise response shape:

```markdown
# Debug Summary

## Problem
## Evidence
## Likely Cause
## Suggested Fix
## Missing Information
## Next Step
```

Use `assets/report-templates/debug-report-classic.md` as an optional starting point when the user requests a report. Adapt it to the case rather than filling every section.

Before echoing evidence, redact keys, tokens, authorization headers, cookies, signed/private URLs, private OSS/S3/bucket links, long private documents, and unnecessary personal data. Keep a short diagnostic excerpt and explain redaction.

For `Expected property name`, `JSON.parse`, `Unexpected token`, `invalid JSON`, undefined-property errors, or `exit status 1`, check string/object confusion, escaped JSON, empty input, text mixed with JSON, malformed syntax, missing/wrong bindings, unexpected `null`, and array/object shape mismatch.
