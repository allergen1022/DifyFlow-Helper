#!/usr/bin/env python3
"""List Dify Flow node names, ids, and types without modifying the YAML."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


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


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("yaml_file", type=Path)
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of a table")
    args = parser.parse_args()
    rows = []
    for node in load_nodes(args.yaml_file):
        if not isinstance(node, dict):
            continue
        data = node.get("data", {}) if isinstance(node.get("data"), dict) else {}
        rows.append(
            {
                "name": data.get("title") or data.get("name") or "(unnamed)",
                "id": node.get("id"),
                "type": data.get("type", "unknown"),
            }
        )
    if args.json:
        print(json.dumps(rows, ensure_ascii=False, indent=2, default=str))
    else:
        print("NAME\tTYPE\tID")
        for row in rows:
            print(f"{row['name']}\t{row['type']}\t{row['id']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
