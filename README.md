# 音乐门户网站前端设计（模仿QQ音乐）

> 技术栈：vue+vue-router+vue-resource+stylus+webpack+百度API (暂时不使用vuex)

## 1.Vue.js
```
轻量级MVVM框架，非常适合中小型网站快速开发。
```
[vue.js 教程](https://cn.vuejs.org/v2/guide/) 中文教程非常友好，看完基本上可以投入开发。

## 2.vue-router
```
路由控制，SPA开发利器。模块切换也可以使用vue-router
```

[Vue.js Router](https://router.vuejs.org/zh-cn/) 官方文档，美滋滋。

## 3.vue-resource
```
非常小巧的网络请求插件，使用了ES6的Promise用于异步处理。
```

[csdn的一篇介绍Vue-resource博客](http://blog.csdn.net/u013778905/article/details/54235906)	，网上的博客大同小异，较常使用到的get、post、jsonp等都比较方便。

## 4.stylus
```
css预处理器，控制缩进的风格，可能相对来说less更加容易上手。stylus够用了
```

[张鑫旭老师的stylus教程](http://www.zhangxinxu.com/jq/stylus/) 个人就是看这个文档入门的，简洁清晰。

## 5.webpack
```
构建工具，打包构建非常棒。
```

[webpack中文文档](https://doc.webpack-china.org/concepts/) 中文文档，全面但是可能有点晦涩。
[简书的-入门webpack看这篇就够了](https://www.jianshu.com/p/42e11515c10f) 很不错的文章。要注意版本是否适合，貌似webpack3.X的部分语法不一样。

## 6.vue-cli
```
脚手架，快速的构建vue+webpack+stylus的架子
```

`cnpm install -g vue-cli`
安装vue-cli

`vue --version`
检查是否安装

`vue init webpack project_name`
创建指定的项目，创建完毕之后打开文件运行 _cnpm install_ 就行
~~vue init webpack-simple project_name~~ 比较麻烦，似乎这么创建引入其他loader需要自己配置。

## 7.百度API
```
百度自己整理就行了，虽然接口不多，但是个人开发着玩够用了。
```