# 自己搭的 webpack + vue

## 使用方法
```
// 1  下载库
git clone git@github.com:MichealXie/webpack-config.git
// 2 进入文件目录
cd webpack-config
// 3 安装依赖
npm install
// 4 开始吧 (≧∇≦)/
npm run dev 
```
## 已完成:
	+ vue 全家桶
	+ vue 内使用 stylus
	+ js代码分离, css 单独另算
	+ dev 热加载
	+ postcss   autoprefixer/ cssNext/ px2viewport/ postcss-import/ cssnano
	+ tree-shaking   => "js": uglify, "css": webpack-css-treeshaking-plugin
	+ ts
	+ 实现 prod 与 dev 模式分离, 提高开发体验
	+ 配合 vue-router 实现懒加载 => 对有首屏的 webApp 体验非常好

# what's next
	+ 能否再提高速度?


# 待修复
 - [x] em... css 好像没有分离成单独的文件  
 - [ ] em... TS 与 vuex 好像不是很和谐