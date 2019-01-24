#vue 基本知识分享

##目录结构
- 页面：src/views
- 组件：src/components
- 公共组件：src/common (建议这里面用来存放各个页面中可复用的公共组件)
- 静态资源：src/assets（图片、公用scss、icon、js、lang）
- 路由：src/router (各个页面对应的路由)
- 过滤器：filter/index(页面中用到的全局过滤器)
- 公共方法：util/tool/index(一些公共的方法，包括读取cookie 值等等)
- mock 数据 src/mock(本地数据测试使用，后期接口数据有了可以使用线上数据)
- 翻译配置:src/i18n 
- 全局变量: src/store

##编译命令
- npm i[下载依赖项]:npm i
- mock[本地数据]:npm run mock
- dev[接口数据]:npm run dev
- build[预发/上线]，npm run build (打包上线)

##注意事项

- 端口：8080(默认8080,可自行配置)
- 样式布局 使用sass ,自适应布局单位为rem, 具体使用方法,以750 视觉稿为例 宽高分别为 300和300 的元素, 则 可以用 px2rem(300) px2rem(300)表示，具体用法参考mix.sxss。 

## 开发命名规范 

###views 下的文件夹命名

####views 下面的文件夹代表着模块的名字

- 由名词组成（car、order、cart）

- 单词只能有一个（good: car order cart）（bad: carInfo carpage）

- 尽量是名词（good: car）（bad: greet good）

- 以小写开头（good: car）（bad: Car）

###views 下的 vue 文件命名

####views 下面的 vue 文件代表着页面的名字

- 放在模块文件夹之下

- 只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home

- 尽量是名词
 
- 大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）

- 名字至少两个单词（good: CarDetail）（bad: Car）

- 常用结尾单词有（Detail、Edit、List、Info、Report）

- 以 Item 结尾的代表着组件（CarListItem、CarInfoItem）

###vue 方法命名

####vue 方法建议放置顺序
- components

- props

- data

- created

- mounted

- activited

- update

- beforeRouteUpdate

- methods

- filter

- computed

- watch

###method 自定义方法命名

- 动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）

- ajax 方法以 get、post 开头，以 data 结尾（good：getListData、postFormData）（bad：takeData、confirmData、getList、postForm）

- 事件方法以 on 开头（onTypeChange、onUsernameInput）

- init、refresh 单词除外

- 尽量使用常用单词开头（set、get、open、close、jump）

- 驼峰命名（good: getListData）（bad: get_list_data、getlistData）

###data props 方法注意点

- 使用 data 里的变量时请先在 data 里面初始化

- props 指定类型，也就是 type

- props 改变父组件数据 基础类型用 $emit ，复杂类型直接改

- ajax 请求数据用上 isLoading、isError 变量

- 不命名多余数据，现在是详情页、你的数据是 ajax 请求的，那就直接声明一个对象叫 d，而不是每个字段都声明

- 表单数据请包裹一层 form

###生命周期方法注意点

- 不在 mounted、created 之类的方法写逻辑，取 ajax 数据，

- 在 created 里面监听 Bus 事件

### 单文件注意 如果使用scss 或 less 时 加上type 类型
- <style scoped lang="scss" type="text/scss"></style>
 






