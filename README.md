# 学生信息管理系统


## 项目规则
1. 使用uniapp框架
2. UI优先使用uni-ui组件库，其次使用element-plus组件库
3. 管理状态使用pinia
4. 发送请求使用uni.request
5. 存储数据使用uni.storage
6. 使用`@`指定`src`目录

## 项目结构说明

### 根目录文件
- `package.json`: 项目依赖配置文件
- `vite.config.js`: Vite构建工具配置文件
- `pages.json`: 页面路由配置文件
- `manifest.json`: 应用配置文件
- `index.html`: 项目入口HTML文件

### 源代码目录 (src/)
- `main.js`: 项目入口文件
- `App.vue`: 应用根组件
- `uni.scss`: 全局样式文件
- `api/`: 接口目录
- `components/`: 公共组件目录
- `pages/`: 页面目录
- `static/`: 静态资源目录
- `store/`: 状态管理目录
- `utils/`: 工具函数目录
  - `request.js`: 网络请求封装
  - `storage.js`: 本地存储封装


### 页面目录 (src/pages/)
- `home/`: 首页模块
- `login/`: 登录模块
- `profile/`: 个人资料模块
- `honor/`: 荣誉模块

## 技术栈
- 基于uni-app框架开发
- 使用Vite作为构建工具
- 采用Vue.js作为前端框架

## 开发环境
- Node.js
- pnpm包管理器


## 公共组件规范

* **组件目录**：根据pages目录结构，在components目录下创建对应的组件目录， 例如pages/auth/login.vue对应的组件目录为components/auth/login/
* **组件文件**：组件文件命名规范为：首字母大写，例如：LoginHeader.vue
* **组件结构**：组件结构清晰，易于维护。
* **组件功能**：组件功能单一，易于复用，如果能复用，请尽量复用，不要重复造轮子。
* **组件样式**：组件样式统一管理，避免样式冲突。


## UI 与样式规范

* **统一主题**：使用 uni-ui 和 element-plus 提供的主题定制功能，统一颜色、字体、间距等风格，便于维护和风格统一。
* **样式组织**：将全局样式放置于 `App.vue` 中，页面级样式放置于各自的页面文件中，避免样式冲突。


## 状态管理（Pinia）

* **模块化管理**：将不同功能的状态分模块管理，便于维护和扩展。

* **目录结构**：
  * `src/store/user/index.js`：用户模块
  

## 网络请求封装

* **封装请求方法**：在 `utils/request.js` 中封装统一的请求方法，处理请求拦截、响应拦截、错误处理等逻辑。
* **环境配置**：根据开发、测试、生产环境配置不同的请求地址，使用环境变量进行管理。
* **错误处理**：统一处理请求错误，提供用户友好的错误提示。
* **请求头**：请求头 Authorization 需要包含bearer token，token在storage中管理
* **响应数据**：响应数据固定返回{code,message,data}格式，code为200时为成功，其他为失败，data为数据，message为提示信息

## 存储管理（Storage）

* **封装存储方法**：在 `utils/storage.js` 中封装统一的存储方法，基于uni.storage实现。
* **功能特性**：
  * 支持设置数据过期时间
  * 自动处理JSON序列化和反序列化
  * 提供token相关的便捷方法
* **使用规范**：
  * 使用setStorage存储数据
  * 使用getStorage获取数据
  * 使用removeStorage删除数据
  * 使用clearStorage清空所有数据
