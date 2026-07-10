#!/usr/bin/env python3
"""Find likely secrets in text files and print redacted findings only."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


KEY_VALUE = re.compile(
    r"(?i)(api[_-]?key|access[_-]?token|secret|password|authorization|cookie)\s*[:=]\s*['\"]?([^\s,'\"}]+)"
)
BEARER = re.compile(r"(?i)\bBearer\s+([A-Za-z0-9._~+/=-]{12,})")
SIGNED_URL = re.compile(r"(?i)https?://[^\s]+(?:X-Amz-Signature|Signature|token)=[^\s]+")


def redact(value: str) -> str:
    if len(value) <= 6:
        return "<redacted>"
    return f"{value[:2]}…{value[-2:]} (redacted)"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", nargs="+", type=Path)
    args = parser.parse_args()
    findings = 0
    for path in args.files:
        if not path.is_file():
            print(f"SKIP\t{path}\tnot a file")
            continue
        try:
            lines = path.read_text(encoding="utf-8-sig", errors="replace").splitlines()
        except OSError as exc:
            print(f"SKIP\t{path}\t{exc}")
            continue
        for number, line in enumerate(lines, 1):
            for match in KEY_VALUE.finditer(line):
                findings += 1
                print(f"LIKELY_SECRET\t{path}:{number}\t{match.group(1)}={redact(match.group(2))}")
            for match in BEARER.finditer(line):
                findings += 1
                print(f"LIKELY_SECRET\t{path}:{number}\tauthorization={redact(match.group(1))}")
            if SIGNED_URL.search(line):
                findings += 1
                print(f"LIKELY_PRIVATE_URL\t{path}:{number}\t<redacted signed URL>")
    print(f"Findings: {findings}")
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
