#!/usr/bin/env python3
"""Print a read-only high-level summary of a Dify YAML/YML file."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path


def load_yaml(path: Path):
    try:
        import yaml
    except ImportError as exc:
        raise SystemExit("PyYAML is required: install package 'pyyaml'") from exc
    with path.open("r", encoding="utf-8-sig") as handle:
        return yaml.safe_load(handle)


def get_graph(document: object) -> dict:
    if not isinstance(document, dict):
        return {}
    workflow = document.get("workflow")
    if isinstance(workflow, dict) and isinstance(workflow.get("graph"), dict):
        return workflow["graph"]
    graph = document.get("graph")
    return graph if isinstance(graph, dict) else {}


def node_data(node: object) -> dict:
    if not isinstance(node, dict):
        return {}
    data = node.get("data")
    return data if isinstance(data, dict) else node


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("yaml_file", type=Path)
    args = parser.parse_args()
    document = load_yaml(args.yaml_file)
    graph = get_graph(document)
    nodes = graph.get("nodes", []) if isinstance(graph.get("nodes", []), list) else []
    edges = graph.get("edges", []) if isinstance(graph.get("edges", []), list) else []
    types = Counter(str(node_data(node).get("type", "unknown")) for node in nodes)
    app = document.get("app", {}) if isinstance(document, dict) else {}
    result = {
        "file": str(args.yaml_file),
        "app_name": app.get("name") if isinstance(app, dict) else None,
        "mode": app.get("mode") if isinstance(app, dict) else None,
        "version": document.get("version") if isinstance(document, dict) else None,
        "top_level_keys": sorted(document) if isinstance(document, dict) else [],
        "node_count": len(nodes),
        "edge_count": len(edges),
        "node_types": dict(sorted(types.items())),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2, default=str))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
