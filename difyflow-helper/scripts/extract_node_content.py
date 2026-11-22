#!/usr/bin/env python3
"""Extract Code node bodies and/or LLM prompts from exported Dify YAML."""

from __future__ import annotations

import argparse
from pathlib import Path


def load_yaml(path: Path):
    try:
        import yaml
    except ImportError as exc:
        raise SystemExit("PyYAML is required: install package 'pyyaml'") from exc
    with path.open("r", encoding="utf-8-sig") as handle:
        return yaml.safe_load(handle)


def get_nodes(document: object) -> list:
    if not isinstance(document, dict):
        return []
    workflow = document.get("workflow")
    graph = workflow.get("graph") if isinstance(workflow, dict) else None
    if not isinstance(graph, dict) and isinstance(document.get("graph"), dict):
        graph = document["graph"]
    nodes = graph.get("nodes", []) if isinstance(graph, dict) else []
    return nodes if isinstance(nodes, list) else []


def node_data(node: object) -> dict:
    if not isinstance(node, dict):
        return {}
    data = node.get("data")
    return data if isinstance(data, dict) else node


def yaml_paths(path: Path) -> list[Path]:
    if path.is_file():
        return [path]
    if path.is_dir():
        return sorted([*path.glob("*.yml"), *path.glob("*.yaml")])
    raise SystemExit("Input path does not exist: " + str(path))


def prompt_text(data: dict, role: str) -> str:
    prompts = data.get("prompt_template", [])
    if not isinstance(prompts, list):
        return ""
    for prompt in prompts:
        if isinstance(prompt, dict) and prompt.get("role") == role:
            return str(prompt.get("text", ""))
    return ""


def fence(text: str, language: str) -> str:
    marker = chr(96) * 3
    return marker + language + "\n" + text.rstrip() + "\n" + marker + "\n"


def extract(path: Path, kind: str, node_filter: str | None) -> list[str]:
    sections = []
    matched_node = False
    for yaml_path in yaml_paths(path):
        file_sections = []
        for index, node in enumerate(get_nodes(load_yaml(yaml_path)), start=1):
            data = node_data(node)
            node_type = data.get("type")
            title = str(data.get("title") or str(node_type or "node") + "_" + str(index))
            node_id = str(node.get("id", "")) if isinstance(node, dict) else ""
            if node_filter and node_filter not in {title, node_id}:
                continue
            matched_node = True
            if kind in {"code", "all"} and node_type == "code":
                code = data.get("code")
                if code is not None:
                    language = str(data.get("code_language") or "text").lower()
                    if language == "python3":
                        language = "python"
                    if language not in {"javascript", "python"}:
                        language = "text"
                    file_sections.extend(["## " + title + " (Code)\n", fence(str(code), language)])
            if kind in {"prompts", "all"} and node_type == "llm":
                file_sections.append("## " + title + " (LLM)\n")
                for role in ("system", "user"):
                    heading = "### " + role.title() + " Prompt\n"
                    file_sections.extend([heading, fence(prompt_text(data, role), "text")])
        if file_sections:
            sections.extend(["# " + yaml_path.name + "\n", *file_sections])
    if node_filter and not matched_node:
        raise SystemExit("No node matched the exact name or id: " + node_filter)
    return sections


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("yaml_path", type=Path, help="Exported YAML file or directory")
    parser.add_argument("--kind", choices=("code", "prompts", "all"), default="all")
    parser.add_argument("--node", help="Filter by exact node name or id")
    args = parser.parse_args()
    print("\n".join(extract(args.yaml_path, args.kind, args.node)), end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
