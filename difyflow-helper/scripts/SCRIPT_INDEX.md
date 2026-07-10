# Optional Script Index

The skill works without these helpers. Run each with `--help` before use. Scripts never override confirmation, web-verification, source-preservation, secret, Git, or current-case output rules.

- `inspect_dify_yaml.py`: print a read-only high-level Flow summary.
- `extract_node_index.py`: list node names, ids, and types read-only.
- `extract_node_io.py`: report likely node input/output configuration read-only.
- `scan_secrets.py`: scan text/YAML/config files and print redacted findings only.
- `generate_mermaid_from_flow.py`: generate a basic Mermaid graph only after diagram output is requested or confirmed. It prints to chat/stdout by default; confirmed file output must be under the current case `generate/` folder and never overwrite an existing file.

Use Python 3.10+ where possible. YAML-reading scripts require `PyYAML`.
