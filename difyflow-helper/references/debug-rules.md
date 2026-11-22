# Raw-First Debug Rules

Scene4 debugging is different from Scene6 Flow analysis. Use Scene4 when the user reports a failure, runtime evidence indicates a failure, or the user asks for root-cause diagnosis. Possible risks found during read-only analysis are not automatically confirmed runtime errors.

Scene6 may identify "requires runtime evidence" without treating a risk as a confirmed failure. If the user wants to investigate it, use Scene4. Apply a source change only when requested.

Accept `.md`, `.txt`, `.json`, `.log`, `.yml`, `.yaml`, pasted chat text, and Dify UI panel content. Do not require clean JSON or force the user to split node input, output, and errors.

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
