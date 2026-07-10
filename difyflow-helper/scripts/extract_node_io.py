#!/usr/bin/env python3
"""Extract likely input/output-related fields from Dify nodes, read-only."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


IO_KEYS = {
    "variables", "variable_selector", "output", "outputs", "answer", "query_variable_selector",
    "input", "inputs", "result", "code", "prompt_template", "tool_parameters",
}


def load_nodes(path: Path) -> list:
    try:
        import yaml
    except ImportError as exc:
        raise SystemExit("PyYAML is required: install package 'pyyaml'") from exc
    with path.open("r", encoding="utf-8-sig") as handle:
        document = yaml.safe_load(handle)
    if not isinstance(document, dict):
        return []
    workflow = document.get("workflow", {})
    graph = workflow.get("graph", {}) if isinstance(workflow, dict) else {}
    if not graph and isinstance(document.get("graph"), dict):
        graph = document["graph"]
    nodes = graph.get("nodes", []) if isinstance(graph, dict) else []
    return nodes if isinstance(nodes, list) else []


def collect(value: object, path: str = "data") -> dict:
    found = {}
    if isinstance(value, dict):
        for key, child in value.items():
            child_path = f"{path}.{key}"
            if key in IO_KEYS or key.endswith("variable_selector"):
                found[child_path] = child
            elif isinstance(child, (dict, list)):
                found.update(collect(child, child_path))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            if isinstance(child, (dict, list)):
                found.update(collect(child, f"{path}[{index}]"))
    return found


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("yaml_file", type=Path)
    parser.add_argument("--node", help="Filter by exact node name or id")
    args = parser.parse_args()
    result = []
    for node in load_nodes(args.yaml_file):
        if not isinstance(node, dict):
            continue
        data = node.get("data", {}) if isinstance(node.get("data"), dict) else {}
        name = str(data.get("title") or data.get("name") or "(unnamed)")
        node_id = str(node.get("id", ""))
        if args.node and args.node not in {name, node_id}:
            continue
        result.append(
            {
                "name": name,
                "id": node_id,
                "type": data.get("type", "unknown"),
                "likely_io_fields": collect(data),
            }
        )
    print(json.dumps(result, ensure_ascii=False, indent=2, default=str))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
