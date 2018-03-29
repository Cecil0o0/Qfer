const vdom = (
  <div id="q5" style="border: 1px solid #04a6e9">
    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082≈" style="width:100%;height:100px"/>
    sdasdsa
      <div style="width: 100px;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff)" class="customClass">
          in div#q5
      </div>
  </div>
)

// 构建vnode模型
function vnode(type, props, ...children) {
  return { type, props, children }
}

// 简单createElement方法
function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type)
  node.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}

document.body.appendChild(createElement(vdom))
