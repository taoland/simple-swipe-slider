# simple swipe slider
a simple swipe slider basic on jquery,run in mobile(include weixin) and PC

## 文件说明：
### 1.主文件：
  index.html 所有javascript都写在页面底部
  style.css 样式文件
### 2.去除jquery依赖的版本：
  index-no-jquery.html
### 3.延伸版，一个带缩略图的gallery，大图和缩略图上下都可联动：
  touch-gallery.html
  touch-gallery.css
### 4.跟随版，元素跟随touch或鼠标事件：
  follow-touch.html
  *follow-touch2.html 小方块跟随touch事件的demo

## 测试环境：
### PC：
chrome 47、firefox 40、IE10+
### mobile:
魅蓝note自带浏览器及微信6.3.8、iphone5(ios 9.2)自带浏览器及微信6.3.8

## update log
### Ver 1.2.0 2016/06/16
  更新了元素跟随touch或鼠标事件

### Ver 1.1.0 2016/05/20
  添加了不依赖jquery的版本(index-no-jquery.html)，动画效果(html结构也)和jquery版不一样，样式直接写在html里
  删除handleTouchEvent里不必要的mousemove

### Ver 1.0.0 2015/12/21
  功能：本版本只包括垂直的上下划动翻页，有页码

