/* Cecil0o0 jiegithub@gmail.com */
'use strict';

var vdom = vnode(
  "div",
  { id: "q5", style: "border: 1px solid #04a6e9" },
  vnode("img", { src: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082\u2248", style: "width:100%;height:100px" }),
  "sdasdsa",
  vnode(
    "div",
    { style: "width: 100px;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff)", "class": "customClass" },
    "in div#q5"
  )
);

// 构建vnode模型
function vnode(type, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return { type: type, props: props, children: children };
}

console.log(vdom);
