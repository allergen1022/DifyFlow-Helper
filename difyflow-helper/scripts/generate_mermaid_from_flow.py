#!/usr/bin/env python3
"""Generate a basic Mermaid graph from Dify nodes and edges."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def load_graph(path: Path) -> dict:
    try:
        import yaml
    except ImportError as exc:
        raise SystemExit("PyYAML is required: install package 'pyyaml'") from exc
    with path.open("r", encoding="utf-8-sig") as handle:
        document = yaml.safe_load(handle)
    if not isinstance(document, dict):
        return {}
    workflow = document.get("workflow", {})
    graph = workflow.get("graph", {}) if isinstance(workflow, dict) else {}
    if not graph and isinstance(document.get("graph"), dict):
        graph = document["graph"]
    return graph if isinstance(graph, dict) else {}


def mermaid_id(raw: object, index: int) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9_]", "_", str(raw or ""))
    if not cleaned or cleaned[0].isdigit():
        cleaned = f"n_{cleaned}"
    return f"{cleaned}_{index}"


def quote_label(value: object) -> str:
    return str(value).replace("\\", "\\\\").replace('"', "'").replace("\n", " ")


def build(graph: dict, direction: str) -> str:
    nodes = graph.get("nodes", []) if isinstance(graph.get("nodes", []), list) else []
    edges = graph.get("edges", []) if isinstance(graph.get("edges", []), list) else []
    aliases = {}
    lines = [f"flowchart {direction}"]
    for index, node in enumerate(nodes):
        if not isinstance(node, dict):
            continue
        raw_id = node.get("id")
        alias = mermaid_id(raw_id, index)
        aliases[str(raw_id)] = alias
        data = node.get("data", {}) if isinstance(node.get("data"), dict) else {}
        label = data.get("title") or data.get("name") or raw_id or f"Node {index + 1}"
        lines.append(f'    {alias}["{quote_label(label)}"]')
    for edge in edges:
        if not isinstance(edge, dict):
            continue
        source = aliases.get(str(edge.get("source")))
        target = aliases.get(str(edge.get("target")))
        if source and target:
            lines.append(f"    {source} --> {target}")
    return "\n".join(lines) + "\n"


def is_under_generate(path: Path) -> bool:
    return "generate" in {part.lower() for part in path.resolve().parts}


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate Mermaid only after the user requests or confirms diagram output."
    )
    parser.add_argument("yaml_file", type=Path)
    parser.add_argument("--direction", choices=["TD", "TB", "BT", "LR", "RL"], default="TD")
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional new .mmd path under the current case generate/ folder; never overwrites",
    )
    args = parser.parse_args()
    content = build(load_graph(args.yaml_file), args.direction)
    if args.output:
        if args.output.suffix.lower() != ".mmd":
            raise SystemExit("Output must use the .mmd extension")
        if not is_under_generate(args.output):
            raise SystemExit("Output must be under the current case generate/ folder")
        if args.output.exists():
            raise SystemExit(f"Refusing to overwrite existing file: {args.output}")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(content, encoding="utf-8")
        print(args.output)
    else:
        print(content, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
