# LLM Prompt 材料示例

## 节点

Classify Product Description

## 变量

- query：用户请求
- product_description：待分类的商品描述
- category_list：可选商品类别

## 期望输出

返回包含 product_category 和 reason 的 JSON。

## 处理方式

审查当前 Prompt，并提出分离后的 System Prompt 和 User Prompt。
