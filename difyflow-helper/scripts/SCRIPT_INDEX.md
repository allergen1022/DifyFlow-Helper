# Optional Script Index

The skill works without these helpers. Run each with `--help` before use. Scripts never override user authorization, web-verification, source-preservation, secret, Git, or `generate/` output rules.

- `inspect_dify_yaml.py`: print a read-only high-level Flow summary.
- `extract_node_index.py`: list node names, ids, and types read-only.
- `extract_node_io.py`: report likely node input/output configuration read-only.
- `scan_secrets.py`: scan text/YAML/config files and print redacted findings only.
- `generate_mermaid_from_flow.py`: generate a basic Mermaid graph for a requested diagram. It prints to chat/stdout by default; file output must be under the current workspace's `generate/` folder and never overwrites an existing file.

Use Python 3.10+ where possible. YAML-reading scripts require `PyYAML`.
