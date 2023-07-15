# MediaHub（进行中）

视频、图片、pdf 等的管理网站，支持播放和查看，可以发表博文、集成 AI 生图等功能，可作为个人的资料管理网站

<p>

## 技术栈

- react、TailWind CSS、react-query、react-router、react-redux 等

后端：koa

- [地址](https://github.com/cyf-super/mediaHub-backend)

<p>

## 使用

```
// 安装依赖
yarn insatll

// run
yarn dev
```

若需要使用 tailwind css 更改 ui，还需要：

```
yarn build:css
```

编译项目中用到的`tailwind css`，输出文件为`index.css`

若需要实时编译`tailwind css`，则加上`--watch`

```
yarn build:css --watch
```
