---
category: Components
type: Views
title: Card
subtitle: 卡片
cols: 1
---

通用卡片容器。

## 何时使用

最基础的面板容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<Panel title="面板标题">面板内容</Panel>
```

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 容器标题 | React.Element   |  -  |
| extra    | 容器右上角的操作区域 | React.Element   | - |
| bordered | 是否有边框 | Boolean   |  true  |
| bodyStyle | 内容区域自定义样式 | Object   |  -  |
