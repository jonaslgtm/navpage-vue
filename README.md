# navpage-vue

这是一个基于 Vue.js 构建的导航页面项目。

## 功能特性

*   **分类导航**：将不同类型的网站进行分类展示，方便用户快速找到所需站点。
*   **网站卡片展示**：以卡片形式美观地展示各个网站的图标和名称。
*   **动态日期时间**：实时显示当前的日期和时间。
*   **热搜榜**：集成热搜功能，展示当前热门搜索内容（通常通过API获取）。
*   **响应式设计**：适配不同设备屏幕，提供良好的用户体验。

## 项目结构

```
navpage-vue/
├── public/
│   └── vite.svg        # 项目图标
├── src/
│   ├── assets/         # 静态资源 (如图片)
│   ├── components/
│   │   └── NavPage.vue # 主要导航页面组件
│   ├── App.vue         # Vue 应用根组件
│   └── main.js         # Vue 应用入口文件
├── .gitignore          # Git忽略配置
├── index.html          # HTML 入口文件
├── package-lock.json   # 依赖版本锁定文件
├── package.json        # 项目依赖和脚本配置
├── README.md           # 项目说明文档
└── vite.config.js      # Vite 配置文件
```

## 如何运行

1.  **安装依赖**

    在项目根目录下打开终端，运行以下命令安装项目所需的依赖：

    ```bash
    npm install
    ```

2.  **启动开发服务器**

    安装完依赖后，运行以下命令启动本地开发服务器：

    ```bash
    npm run dev
    ```

    服务启动后，通常可以在浏览器中通过 `http://localhost:5173` (或其他指定的端口) 访问。

3.  **构建生产版本**

    如果需要将项目打包用于生产环境，运行以下命令：

    ```bash
    npm run build
    ```

    构建完成后，会在 `dist` 目录下生成静态文件，可以将这些文件部署到服务器上。

## 技术栈

*   [Vue.js](https://vuejs.org/) ^3.5.13
*   [Vite](https://vitejs.dev/) ^6.3.5

## 贡献

欢迎提交 Pull Request 或 Issue 来改进此项目。
