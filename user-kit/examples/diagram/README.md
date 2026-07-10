# Diagram Example Guide / 绘图示例使用说明

## 0. 前提 / Pre-Note

该 md 文件中的内容仅作为给用户的指导，实际项目不需要复制或使用该文件。  
The content in this MD file is provided merely as a guideline for users. The actual project does not require the copying or use of this file.

---

## 1. 本目录的作用

当前目录：

```text
user-kit/examples/diagram/
```

主要用于展示“用户可以如何描述绘图需求”。

其中：

```text
diagram-request.md
```

是一个已经填写好的绘图需求示例：

- 图要用于什么场景；
- 需要什么细节层级；
- 来源 Flow 或逻辑材料在哪里；
- 想要 Mermaid、JS/SVG、PNG、HTML 还是纯文本大纲；
- 是否有字体、字号、颜色、布局偏好。

```text
style-notes.md
```

是一个已经填写好的风格偏好示例，用来告诉用户：

- 如果用户有自己的图形风格要求，可以如何描述；
- 例如用于 PPT、Word、交付文档或内部评审时，应该如何说明字号、颜色、布局和复杂度要求。

这两个文件都是**示范文件**，不是强制模板，也不是必须复制到真实项目中的文件。

---

## 2. 和 `user-kit/diagram-kit/` 的区别

```text
user-kit/examples/diagram/
```

是给用户的**示范案例**。

```text
user-kit/diagram-kit/
```

是可复用的**绘图参考工具包**。

简单理解：

```text
examples/diagram/
= 如何描述需求

diagram-kit/
= 选择或参考具体的绘图风格、绘图方法、Mermaid/JS/HTML 方案
```

实际项目中，通常不需要复制整个 `examples/diagram/` 目录。

用户可以参考这里的示例，然后在自己的 case 目录中创建或填写：

```text
diagram-request.md
```

如果需要指定风格，再从 `user-kit/diagram-kit/style-notes/` 中选择合适的风格说明，或者自己新建一个风格说明文件。

---

## 3. 推荐的实际使用方式

### 3.1 最简单用法

如果用户只想让 agent 根据 Flow 画一张图，可以在自己的 case 目录中准备：

```text
case/
├── flow.yml
└── diagram-request.md
```

然后对 agent 说：

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成流程图。
```

---

### 3.2 指定默认风格

如果用户没有特殊风格要求，可以直接参考默认风格：

```text
user-kit/diagram-kit/style-notes/default-style.md
```

可以复制到 case 目录：

```text
case/
├── flow.yml
├── diagram-request.md
└── default-style.md
```

然后对 agent 说：

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成图，风格参考 ./default-style.md。
```

也可以不复制，直接在提示词中指定路径：

```text
请根据 ./flow.yml 生成图，风格参考 user-kit/diagram-kit/style-notes/default-style.md。
```

---

### 3.3 指定 Word / PPT / HTML 风格

如果图要用于特定场景，可以选择对应的 style note。

例如：

```text
user-kit/diagram-kit/style-notes/word-style.md
user-kit/diagram-kit/style-notes/ppt-style.md
user-kit/diagram-kit/style-notes/html-style.md
```

推荐用法：

```text
case/
├── flow.yml
├── diagram-request.md
└── ppt-style.md
```

提示词示例：

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成适合 PPT 使用的图，风格参考 ./ppt-style.md。
```

---

## 4. Mermaid 和 JavaScript 示例怎么用

`user-kit/diagram-kit/mermaid/` 适合用于：

- Markdown 文档；
- 技术说明；
- 快速评审；
- 可编辑的文本流程图。

例如可以参考：

```text
user-kit/diagram-kit/mermaid/overview-diagram.md
user-kit/diagram-kit/mermaid/node-level-diagram.md
```

如果有 Mermaid 示例文件，也可以参考：

```text
user-kit/diagram-kit/mermaid/mermaid-example/
```

`user-kit/diagram-kit/javascript/` 适合用于：

- 需要更精确布局的图；
- 需要导出 SVG/PNG 的图；
- 需要放进 Word/PPT 的图；
- 需要更强视觉控制的图。

例如可以参考：

```text
user-kit/diagram-kit/javascript/svg-diagram-basic.md
user-kit/diagram-kit/javascript/ppt-style-diagram.md
```

如果有 JS 示例文件，也可以参考：

```text
user-kit/diagram-kit/javascript/js-example/
```

---

## 5. 是否必须复制 `diagram-kit/`

不必须。

`diagram-kit/` 是参考包，不是运行时必需目录。

用户可以按需选择。

### 只写需求

```text
case/
├── flow.yml
└── diagram-request.md
```

### 复制一个风格文件

```text
case/
├── flow.yml
├── diagram-request.md
└── default-style.md
```

### 复制某个 Mermaid 或 JS 示例

```text
case/
├── flow.yml
├── diagram-request.md
├── default-style.md
└── basic-svg-diagram.js
```

### 不复制，只在提示词里引用路径

```text
请参考 user-kit/diagram-kit/style-notes/default-style.md 的风格，根据 ./flow.yml 生成图。
```

---

## 6. 关于 `style-notes.md`

当前目录中的：

```text
user-kit/examples/diagram/style-notes.md
```

只是一个**示范写法**。

它不是必须文件。

实际项目中，用户可以：

- 不提供任何 style notes；
- 复制 `user-kit/diagram-kit/style-notes/default-style.md`；
- 复制 `word-style.md`、`ppt-style.md` 或 `html-style.md`；
- 自己新建一个 `style-notes.md`；
- 直接在提示词里描述风格要求。

如果用户没有指定任何 style，agent 应根据 skill 的默认规则给出清晰、可读、不过度装饰的默认图形风格。后续用户可以继续让 agent 调整。

---

## 7. 建议给 agent 的提示词写法

### 只给需求

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成一张流程图。
```

### 指定默认风格

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成流程图，风格参考 ./default-style.md。
```

### 指定 Mermaid

```text
请根据 ./flow.yml 生成 Mermaid 流程图，优先参考 user-kit/diagram-kit/mermaid/overview-diagram.md 的风格。
```

### 指定 JS/SVG

```text
请根据 ./flow.yml 生成适合放进 PPT 的 JS/SVG 图，风格参考 ./ppt-style.md，示例参考 user-kit/diagram-kit/javascript/ppt-style-diagram.md。
```

### 指定输出到文件（不强制）

```text
请根据 ./flow.yml 和 ./diagram-request.md 生成图文件。确认后请输出到当前 case 的 generate/diagrams/ 目录下。
```
