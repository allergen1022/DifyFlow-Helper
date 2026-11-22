# Web Verification Rules

Verify current information using official Dify documentation, official repository documentation, or other primary sources before:

- generating complete importable Flow YAML/YML/DSL;
- making final Dify import/export or exact node-schema claims;
- making final claims about LLM node DSL fields, prompt YAML fields, context or retrieval binding behavior, structured output or JSON Schema availability, selected-model native structured-output support, exact UI configuration steps, or structured-output parsing errors;
- finalizing current plugin, tool, API integration, or MCP installation/configuration details, including custom parameters;
- diagnosing an ambiguous Dify-specific error when local evidence is insufficient;
- treating `assets/reference-flows/` or official examples as current importable baselines.

Scene6 local structural analysis normally does not require browsing. Simple node inventories, local graph tracing, data-binding review, and prompt text analysis can be performed from provided materials.

For Scene6, verify current behavior before making exact claims about current Dify DSL fields, node semantics, iteration or loop behavior, concurrency behavior, model structured output, plugin/tool behavior, or import compatibility. Label each important conclusion as local observation, local inference, externally verified, or unknown.

High-level analysis, local YAML reading, draft prompts, prompt-change plans, and non-final design suggestions usually do not require browsing unless uncertainty remains. Label LLM implementation drafts as not fully verified when current Dify import or configuration details have not been checked.

If verification is unavailable, state that the result is an unverified draft or local-structure-based suggestion, not a verified current importable Flow.

For external tools, plugins, APIs, and MCP servers, consult both the relevant official provider/server documentation and Dify documentation for the target version. Verify that each requested parameter is supported at both integration points. If either contract is unavailable, ask for the official specification or mark the configuration unresolved; do not infer fields from similar integrations.
