# Security and Git Rules

- Never expose real secrets or store user runtime files in this skill.
- Do not print full signed/private URLs; redact them while retaining diagnostic meaning.
- Redact credentials, authorization headers, cookies, private bucket links, unnecessary documents, and unrelated personal data.
- Prefer modified copies over source overwrites.
- Secret-scanning helpers must be read-only and redact findings.
- Do not run Git operations unless explicitly requested.

## API keys and sensitive values

- Use a protected secret-storage mechanism supported by the target Dify version and integration. Do not assume that ordinary variables, hidden inputs, environment variables, prompts, Code node source, or exported YAML encrypt or mask values.
- Verify how the target handles access, masking, logs, runtime output, and exports before describing a value as protected. Keep access to stored secrets limited to what the integration requires.
- Use placeholders in generated YAML, prompts, and code. Do not request or reproduce a real key unless the task truly requires it and the user explicitly authorizes its use.
- When reviewing user-provided YAML, YML, DSL, or configuration files, look for likely credentials. If found, warn using only the file path and credential category; never echo the value. If a live key appears to have been exposed, recommend revoking or rotating it. Preserve the user's source file unless they request an edit.
- Keep secret values out of node outputs, prompts, logs, and traces. Pass a secret only to the configuration field that needs it, and verify masking behavior for the target Dify version and node type when relevant.
- Leave secret values out of DSL or app-package exports by default. If the target version offers an option to include secrets and the user explicitly requests it, warn that the artifact may contain plaintext secrets, then treat it as sensitive and verify its contents before sharing or storing it.
- The existing `scripts/scan_secrets.py` helper can scan text and YAML while redacting likely findings.

