# PC端文章管理系统
该项目旨在为用户提供一个简单易用的文章管理系统，该系统具集成Ant Design组件库，提供丰富的UI组件和样式，使用Redux进行全局状态管理，使用SCSS进行样式管理和优化，使用axios进行HTTP请求处理，使用echarts进行图像可视化

接口文档：https://apifox.com/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/api-31967347

# 快照0 项目初始化
## 主要内容
安装依赖项目，进行项目框架搭建

## 操作
1. 项目初始化 `npx create-react-app react-bill-test`
2. 安装SCSS `npm i sass -D`
3. 安装路由 `npm i react-router-dom`
并初始化路由
4. 安装antd组件库 `npm i antd --save`
https://ant-design.antgroup.com/components/overview-cn
5. 安装craco `npm i -D @craco/craco`
并进行@的配置
6. 安装Redux `npm i @reduxjs/toolkit react-redux`
https://cn.redux.js.org/tutorials/quick-start
7. 安装时间处理 `npm i dayjs`
https://dayjs.fenxianglu.cn/category/parse.html
8. 安装class类名处理 `npm i classnames`
9. 安装axios `npm i axios`
https://www.axios-http.cn/docs/example
10. 安装echarts图像可视化 `npm i echarts`
https://echarts.apache.org/handbook/zh/get-started
11. 项目结构配置：

| 文件夹 | 描述 |
| --- | --- |
| apis | 接口 |
| assets | 静态资源 |
| components | 通用组件 |
| pages| 页面级组件 |
| router | 路由Router |
| store | Redux状态 |
| utils | 工具函数 |

# 快照1 登录页面
## 主要内容
登录界面静态页面与动态功能

## 操作
1. 登录界面静态页面搭建
2. 登录表单验证
规则：失去焦点校验，非空校验，手机号格式校验
3. 封装request工具模块
src\utils\request.js
4. 在store中创建存放token的配置
5. dispatch请求登录
6. 登录成功后跳转到layout页面
7. token本地持久化
8. 在Axios请求拦截器中注入token
9. 用token控制路由权限
src\components\AuthRoute.js

# 快照2 布局页面
## 主要内容
布局页面静态页面与动态功能

## 操作
1. 布局页面静态页面搭建
2. 引入样式重置 `npm i normalize.css`
3. 二级路由配置
4. 左侧tab切换改变二级路由
5. 路由变化改变左侧tab选中状态
6. 渲染用户name
7. 退出登录,清除用户信息,跳转登录页
8. 处理Token失效（401）
9. 将接口封装在apis目录下

# 快照3 文章发布页面
## 主要内容
发布文章页面静态页面与动态功能

## 操作
1. 发布文章页面静态页面搭建
2. 安装富文本编辑器 `npm i react-quill`
3. 频道选择器获取列表
4. 封面上传功能
5. 发布文章功能