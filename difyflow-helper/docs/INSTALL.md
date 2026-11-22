# Installation

Install only the `difyflow-helper/` directory as the Agent Skill. It is the actual skill package because it contains `SKILL.md` and the resources that file references. A repository URL is only the source location; it does not mean the whole repository is the skill.

The installable root is `difyflow-helper/`, with `SKILL.md` directly inside it. Do not install the repository root or the optional `user-kit/` directory as the skill. Repository documentation such as `README.md` and `README_CN.md` is not part of the skill package.

## Compatibility

This package follows the Agent Skill convention with `SKILL.md` as its entry point. Use it with an agent that supports this format, and check that agent's current documentation for installation details.

Installation paths and commands may change by agent and version. Select the `difyflow-helper/` directory itself as the skill root.

The installed package contains reusable agent instructions, references, assets, and optional helpers only. It contains no user Flow, debug evidence, report, generated artifact, or other runtime data. The skill can be used without running its helper scripts.
