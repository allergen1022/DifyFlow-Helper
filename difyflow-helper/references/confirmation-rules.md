# Confirmation Rules

Require explicit confirmation before:

- generating complete importable Dify YAML, YML, or DSL;
- editing a source Flow or applying a debug-driven change;
- overwriting any existing file;
- installing or configuring a plugin;
- using a real key, token, credential, or authorization value;
- running Git operations;
- writing a large artifact when chat is sufficient;
- creating reports, prompt artifacts, diagrams, or standalone code files when the user has not requested them;
- assuming JSON Schema structured output when support is uncertain.

Read-only analysis and chat output do not require confirmation. A direct request to create a new artifact counts as confirmation for the requested output and standard generate/ path unless the path is ambiguous or an existing file would be overwritten.

Never generate diagrams without an explicit diagram request.
