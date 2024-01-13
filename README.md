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
