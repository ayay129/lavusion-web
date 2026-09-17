# lavusion-web

览悟找图新版官网。

## 设计方向

- Apple 式简约与克制，但不仿 Apple 官网
- 真实产品界面优先于装饰性视觉
- 首页快速说明：本地图库中的相似图片 / 人物 / 局部内容搜索
- Local-first：图片不上传，索引、模型、搜索均在本地完成
- 少卡片、少渐变、少装饰；用排版、留白和产品演示建立品牌感

## 项目结构

```text
lavusion-web/
├── index.html
├── pricing.html
├── docs.html
├── privacy.html
│
├── css/
│   ├── common.css      # 全站公共：基础样式 / Header / Footer / 响应式
│   ├── home.css        # 首页：Hero / 下载 / 功能区 / Local-first / 指标
│   ├── pricing.css     # 价格页
│   ├── docs.css        # 使用文档页
│   └── privacy.css     # 隐私政策页
│
├── js/
│   ├── common.js       # 全站公共：Header / 移动导航 / reveal
│   ├── home.js         # 首页下载下拉
│   ├── pricing.js      # 月付 / 季付 / 年付切换
│   └── docs.js         # 文档目录与章节定位
│
└── assets/
    ├── images/         # 图片资源占位
    └── videos/         # 视频资源占位
```

## 页面

- `index.html`：产品首页
- `pricing.html`：套餐与价格
- `docs.html`：使用文档
- `privacy.html`：隐私政策

HTML 内已按 Header、Hero、Features、Footer 等主要模块添加注释，方便直接定位代码。

## 部署

当前为零依赖静态站，可直接托管至 Cloudflare Pages。

## 下一步

- 用真实览悟找图截图替换 Hero CSS 模拟窗口
- 增加产品演示视频
- 接入真实 macOS / Windows 下载地址
- 增加英文版 `/en/`
