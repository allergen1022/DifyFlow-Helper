# Security and Git Rules

- Never expose real secrets or store user runtime files in this skill.
- Do not print full signed/private URLs; redact them while retaining diagnostic meaning.
- Redact credentials, authorization headers, cookies, private bucket links, unnecessary documents, and unrelated personal data.
- Prefer modified copies over source overwrites.
- Secret-scanning helpers must be read-only and redact findings.
- If the current or parent directory contains `.git`, do not run Git operations unless explicitly requested.

Forbidden without explicit request: `git add`, `commit`, `push`, `reset`, `checkout`, `rebase`, `merge`, and any other state-changing Git operation.
