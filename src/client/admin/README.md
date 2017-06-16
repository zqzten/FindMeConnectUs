# FMCUClient - Admin
这是 FindMeConnectUs 前端的个人管理部分。

## 文件目录
* `build` webpack 相关配置文件目录
    * `build.js` 生产环境结构代码
    * `check-version.js` 检查 node、npm 等版本
    * `dev-client.js` 热加载相关代码
    * `dev-server.js` 本地服务器
    * `utils.js` 构建工具
    * `webpack.base.conf.js` webpack 基本配置
    * `webpack.dev.conf.js` webpack 开发环境配置
    * `webpack.prod.conf.js` webpack 生产环境配置
* `config` 开发环境配置文件目录
    * `dev.env.js` 开发环境变量
    * `index.js` 项目基本配置
    * `prod.env.js` 生产环境变量
* `src` 源代码目录
    * `container` 容器目录
    * `router` 路由目录，负责定位组件
    * `components` 组件目录
    * `views` 细化的视图目录
    * `webgl` 模型渲染目录
    * `App.vue` 默认组件，入口文件
    * `main.js` 程序入口文件，引用、加载各种组件
* `static` 静态资源目录
* `index.html` 入口文件
* `package.json` npm 配置文件

## 构建命令
```shell
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
