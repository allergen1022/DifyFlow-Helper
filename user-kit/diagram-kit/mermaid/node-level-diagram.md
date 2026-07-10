# Mermaid Node-Level Diagram / Mermaid 节点级图

用于展示主要 Dify 节点、关键输入输出和依赖关系。 / Use to show major Dify nodes, important IO, and dependencies.

```mermaid
flowchart LR
  Start[Start / 开始] --> Normalize[Normalize Input / 规范输入]
  Normalize -- invoice_data: object --> LLM[Classify / 分类]
  LLM -- result: object --> End[End / 结束]
```

不要默认塞入每个变量；只有用户要求变量级图时才展开。 / Do not include every variable by default; expand only for an explicitly requested variable-level diagram.
