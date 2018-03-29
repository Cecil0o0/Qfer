
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
  <div id="q5" style="border: 1px dashed #f00">
    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082≈" style="width:100%;height:400px;transition:all 2s ease;"/>
    sdasdsa
    <div style="width: 100%;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff);transition: all 2s ease;" class="customClass">
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
  updateProps($el, node.props)
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
    // 增
    $parent.appendChild(createElement(newNode))
  } else if (!newNode) {
    // 删
    $parent.removeChild($parent.childNodes[index])
  } else if (isChange(newNode, oldNode)) {
    // 查
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  } else if (newNode.type) {
    // 改
    updateProps($parent.childNodes[index], newNode.props, oldNode.props)
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

// handle props

function setProp($el, name, value) {
  if (typeof value === 'boolean') {
    handleBoolProp($el, name, value)
  } else {
    $el.setAttribute(name, value)
  }
}

function handleBoolProp($el, name, value) {
  if (!!value) {
    $el.setAttribute(name, value)
    $el[name] = !!value
  } else {
    $el[name] = !!value
  }
}

function removeProp ($el, name, value) {
  if (typeof name === 'boolean') {
    $el[name] = false
  }
  $el.removeAttribute(name, value)
}

function updateProp ($el, name, newValue, oldValue) {
  if (!newValue && oldValue) {
    removeProp($el, name, oldValue)
  } else if (!oldValue || newValue !== oldValue) {
    setProp($el, name, newValue)
  }
}

function updateProps ($el, newProps, oldProps = {}) {
  let _props = Object.assign({}, newProps, oldProps)
  Object.keys(_props).forEach(key => {
    updateProp($el, key, newProps[key], oldProps[key])
  })
}


console.log(vdom)
console.log(vdom1)
let content = document.querySelector('#content')
updateElement(content, vdom, null, 0)

setTimeout(() => {
  updateElement(content, vdom1, vdom, 0)
}, 2000)
