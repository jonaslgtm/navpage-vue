# 导航页面项目说明文档

## 项目概述
这是一个基于 Vue 3 开发的现代化导航页面项目，集成了网站导航和实时热搜功能。项目采用 Vite 作为构建工具，使用 Vue 3 的 Composition API 进行开发。

## 技术栈
- Vue 3
- Vite
- JavaScript
- CSS

## 项目结构
```
navpage-vue/
├── src/                    # 源代码目录
│   ├── api/               # API 接口封装
│   │   └── index.js       # API 请求方法
│   ├── components/        # 组件目录
│   │   ├── NavPage.vue    # 主导航页面组件
│   │   ├── NavPage.html   # 导航页面模板
│   │   └── NavPage.css    # 导航页面样式
│   ├── assets/           # 静态资源
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── public/               # 公共资源目录
├── dist/                # 构建输出目录
└── index.html           # HTML 模板
```

## 核心功能

### 1. 网站导航功能
- 支持多分类展示
- 分类快速切换
- 响应式布局设计
- 实时数据更新

### 2. 热搜榜功能
- 实时获取微博热搜数据
- 自动定时刷新（每10分钟）
- 错误处理和备用数据展示
- 点击跳转到相关话题

### 3. 数据管理
- 使用 Vue 3 的响应式系统
- 统一的数据获取接口
- 完善的错误处理机制

## API 接口
项目使用两个主要 API：
1. 导航数据 API：`https://hao123.web025.cn/api.php`
2. 热搜数据 API：`https://zj.v.api.aa1.cn/api/weibo-rs/`

## 组件说明

### NavPage.vue
主导航页面组件，包含以下功能：
- 网站分类展示和切换
- 热搜榜数据展示
- 日期时间显示
- 响应式数据管理

## 开发说明
1. 项目使用 Vite 作为开发服务器和构建工具
2. 采用 Vue 3 的 Composition API 进行开发
3. 使用 ES6+ 语法特性
4. 支持热更新和快速开发

## 部署说明
1. 构建命令：`npm run build`
2. 开发命令：`npm run dev`
3. 预览命令：`npm run preview`

## 注意事项
1. 确保 API 接口可用性
2. 注意热搜数据的刷新频率
3. 关注错误处理和用户体验
4. 保持代码的可维护性和可扩展性 