
const vdom = (
  <div id="q5" style="border: 1px solid #04a6e9">
    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082≈" style="width:100%;height:100px"/>
    sdasdsa
    <div style="width: 100px;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff)" class="customClass">
        in div#q5
    </div>
  </div>
)


const vdom1 = (
  <div id="q5" style="border: 1px solid #04a6e9">
    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082≈" style="width:100%;height:100px"/>
    sdasdsa
    <div style="width: 100px;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff)" class="customClass">
        out div#q5
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


/**
 *
 * @param {*} $parent
 * @param {VNode} newNode
 * @param {VNode} oldNode
 * @param {*} index
 */
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode))
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index])
  } else if (isChange(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  } else if (newNode.type) {
    let newChildsLength = newNode.children.length
    let oldChildsLength = oldNode.children.length
    for (var i = 0; i < newChildsLength || i < oldChildsLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

function isChange(newNode, oldNode) {
  return !newNode ||
      !oldNode ||
      newNode.type !== oldNode.type ||
      (typeof newNode === 'string' && newNode !== oldNode)
}

console.log(vdom)
let content = document.querySelector('#content')
updateElement(content, vdom, null, 0)

setTimeout(() => {
  updateElement(content, vdom1, vdom, 0)
}, 2000)
