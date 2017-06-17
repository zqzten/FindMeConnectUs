# FMCUServer
This is the server part of FindMeConnectUs.

## Catalog
* `controllers` 控制器目录
    * `api.js` RESTful API 业务逻辑
* `models` 数据库模型定义目录
* `app.js` Koa 应用启动文件
* `controller.js` 扫描并注册控制器
* `db.js` 定义数据库模型规范
* `model.js` 扫描并导入数据库模型
* `package.json` npm 配置文件
* `rest.js` 支持 RSET 的 Koa 中间件
* `socket.js` Socket.IO 事件处理逻辑
* `util.js` 数据库交互封装

## Setup

### Prerequisites
* MySQL Community Server v5.6.35
* Node.js v8.0.0 with npm v5.0.0

### Database
1. Start your MySQL server
2. Create an empty MySQL database (UTF-8 collation recommended)
3. Create a file named `config.js` within this dir and input the following content
```javascript
const config = {
    dialect: "mysql",
    database: "findmeconnectus", // your newly created database name
    username: "root",            // name of your MySQL user
    password: "root",            // password of the user
    host: "localhost",           // where your MySQL server runs
    port: 3306                   // the port your MySQL server listens
};

module.exports = config;
```

### Commands
```shell
# install dependencies
npm install

# start server at localhost:3000
npm run start
```
