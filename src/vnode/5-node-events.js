
const vdom = (
  <div id="q5" style="border: 1px solid #04a6e9" onclick={() => { alert('clicked') }}>
    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3781974299,1261286502&fm=173&app=25&f=JPEG?w=218&h=146&s=1CF06580DB720E8EA6198C9103008082≈" style="width:100%;height:100px"/>
    sdasdsa
    <div style="width: 100px;height: 50px; background: linear-gradient(90deg, #04a6e9, #fff)" class="customClass">
        in div#q5
    </div>
  </div>
)


const vdom1 = (
  <div id="q5" style="border: 1px dashed #f00" onclick={() => { alert('forceUpdate click event') }} forceUpdate>
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

/**
 * 递归创建真实dom
 * @param {vnode} node
 */
function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type)
  updateProps($el, node.props)
  addEvtListeners($el, node.props)
  node.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}

/**
 * 更新Elements
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
    addEvtListeners($parent.childNodes[index], newNode.props)
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

/**
 * 判断新旧vnode是否发生改变
 * @param {vnode} newNode
 * @param {vnode} oldNode
 */
function isChange(newNode, oldNode) {
  return !newNode ||
      !oldNode ||
      newNode.type !== oldNode.type ||
      (typeof newNode === 'string' && newNode !== oldNode) ||
      !!newNode.forceUpdate
}

// handle props

function isCustomProp (name) {
  return ['forceUpdate'].includes(name)
}

function setProp($el, name, value) {
  if (isCustomProp(name)) {
    return
  } else if (typeof value === 'boolean') {
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
  if (isCustomProp(name)) {
    return
  } else if (typeof name === 'boolean') {
    $el[name] = false
  }
  $el.removeAttribute(name, value)
}

function updateProp ($el, name, newValue, oldValue) {
  if (isCustomProp(name)) {
    return
  } else if (!newValue && oldValue) {
    removeProp($el, name, oldValue)
  } else if (!oldValue || newValue !== oldValue) {
    setProp($el, name, newValue)
  }
}

/**
 * 封装批量更新dom props
 * @param {node} $el
 * @param {object} newProps
 * @param {object} oldProps
 */
function updateProps ($el, newProps, oldProps = {}) {
  let _props = Object.assign({}, newProps, oldProps)
  Object.keys(_props).forEach(key => {
    updateProp($el, key, newProps[key], oldProps[key])
  })
}

// handle events

function isNativeEvt (name) {
  return /^on/.test(name)
}

function isEventProp (name) {
  return /^on/.test(name)
}

function extractEvtName (name) {
  return name.slice(2).toLowerCase()
}

/**
 * 封装批量绑定事件
 * @param {dom} $el
 * @param {object} props {onclick: () => { alert('clicked) }}
 */
function addEvtListeners ($el, props) {
  Object.keys(props).forEach(key => {
    if (isEventProp(key)) {
      $el[key] = props[key]
      // $el.addEventListener(extractEvtName(key), props[key])
    }
  })
}

console.log(vdom)
console.log(vdom1)
let content = document.querySelector('#content')
updateElement(content, vdom, null, 0)

setTimeout(() => {
  updateElement(content, vdom1, vdom, 0)
}, 2000)
