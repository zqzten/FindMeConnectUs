# FindMeConnectUs
A web-based 3D multiplayer game.

## 文件目录
* `doc` [文档](https://github.com/AkikoZ/FindMeConnectUs/tree/master/doc)
* `src` 工程源文件
    * `client` 前端部分
        * `admin` [个人管理部分](https://github.com/AkikoZ/FindMeConnectUs/tree/master/src/client/admin)
        * `entrance` [游戏入口部分](https://github.com/AkikoZ/FindMeConnectUs/tree/master/src/client/entrance)
        * `main` [游戏过程部分](https://github.com/AkikoZ/FindMeConnectUs/tree/master/src/client/main)
    * `server` 后端部分

## TODO

### 游戏入口与个人管理部分

#### 登录系统
- [x] 页面构建
- [x] 背景特效的 three.js 实现
- [x] 登录和注册的弹窗效果
- [ ] 登录和注册的逻辑验证部分

#### 个人信息系统
- [x] 主体框架搭建
- [x] 人物模型确认
- [x] 用户个人信息页面
- [x] 用户好友界面
- [x] 游戏记录界面
- [ ] 与后台的数据交互
- [ ] 组队游戏功能的开发
- [ ] 信息页面的旋转 3D 模型
- [ ] 其他突然想到的好功能

#### 匹配系统
- [x] 匹配系统的入口
- [ ] 匹配系统的逻辑
- [ ] 匹配系统的界面设计
- [ ] 与逻辑后台的交互

### 游戏过程部分

#### 迷宫系统
- [x] 迷宫框架的构建与生成
- [x] 将玩家随机放置于迷宫中
- [ ] 迷宫的连通性（门）

#### 房间系统
- [ ] 房间内的物品生成

#### 线索系统
- [ ] 线索的设计与展示

#### 交互系统
- [x] 玩家的运动模块
- [ ] 私有物品栏
- [ ] 物品操作
- [ ] 判定系统

#### 评分系统
- [ ] 计分与排行榜
