/* Cecil0o0 jiegithub@gmail.com */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isType = function isType(type) {
  return function (value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
  };
};

var isNumber = isType('number');
var isBoolean = isType('boolean');
var isString = isType('string');
var isObject = isType('object');

var isNagetive = function isNagetive(v) {
  return v === undefined || v === null;
};

var plainStyleObj = function plainStyleObj(o) {
  return Object.keys(o).map(function (key) {
    return key + ':' + o[key];
  }).join(';');
};

/**
 * 处理属性
 */

/**
 * 过滤自定义属性
 * @param {string} name
 */
function isCustomProp(name) {
  return ['forceUpdate'].includes(name);
}

/**
 * 设置Element属性
 * @param {Node}  $el
 * @param {string} name
 * @param {*} value
 */
function setProp($el, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (isBoolean(value)) {
    handleBoolProp($el, name, value);
  } else {
    // 设置style时，判断是对象还是字符串
    if (name === 'style' && isObject(value)) {
      $el.setAttribute(name, plainStyleObj(value));
    } else {
      $el.setAttribute(name, value);
    }
  }
}

/**
 * 处理布尔类型属性
 * @param {Node}  $el
 * @param {string} name
 * @param {*} value
 */
function handleBoolProp($el, name, value) {
  if (!!value) {
    $el.setAttribute(name, value);
    $el[name] = !!value;
  } else {
    $el[name] = !!value;
  }
}

/**
 * 移除Element属性
 * @param {Node} $el
 * @param {string} name
 * @param {*} value
 */
function removeProp($el, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (isBoolean(value)) {
    $el[name] = false;
  }
  $el.removeAttribute(name, value);
}

/**
 * 更新Element属性
 * @param {Node} $el
 * @param {string} name
 * @param {*} newValue
 * @param {*} oldValue
 */
function updateProp($el, name, newValue, oldValue) {
  if (isCustomProp(name)) {
    return;
  } else if (!newValue && oldValue) {
    removeProp($el, name, oldValue);
  } else if (!oldValue || newValue !== oldValue) {
    setProp($el, name, newValue);
  }
}

/**
 * 封装批量更新dom props
 * @param {node} $el
 * @param {object} newProps
 * @param {object} oldProps
 */
function updateProps($el) {
  var newProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _props = Object.assign({}, newProps, oldProps);
  Object.keys(_props).forEach(function (key) {
    updateProp($el, key, newProps ? newProps[key] : null, oldProps ? oldProps[key] : null);
  });
}

/**
 * 处理事件
 */

function isEventProp(name) {
  return (/^on/.test(name)
  );
}

/**
 * 封装批量绑定事件
 * @param {dom} $el
 * @param {object} props {onclick: () => { alert('clicked) }}
 */
function addEvtListeners($el, props) {
  props && Object.keys(props).forEach(function (key) {
    if (isEventProp(key)) {
      $el[key] = props[key];
      // $el.removeEventListener(extractEvtName(key), props[key], false)
      // $el.addEventListener(extractEvtName(key), props[key], false)
    }
  });
}

/**
 * 创建节点
 */

/**
 * 构建vnode模型
 * @param {string} type
 * @param {string} props`
 * @param {string} children
 */
function vnode(type, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return { type: type, props: props, children: children };
}

/**
 * 递归创建真实dom
 * @param {vnode} node
 */
function createElement(node) {
  if (isString(node) || isNumber(node)) {
    return document.createTextNode(node);
  }
  var $el = document.createElement(node.type);
  updateProps($el, node.props);
  addEvtListeners($el, node.props);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

/**
 * patch elements
 * @param {Node} $parent
 * @param {VNode} newNode
 * @param {VNode} oldNode
 * @param {Number} index
 */
function updateElement($parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (isNagetive(oldNode)) {
    // 增
    $parent.appendChild(createElement(newNode));
  } else if (isNagetive(newNode)) {
    // 删
    $parent.removeChild($parent.childNodes[index]);
  } else if (isChange(newNode, oldNode)) {
    // 改
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    // 如果没有发生改变，且为非文本节点，那么递归patch子节点
    updateProps($parent.childNodes[index], newNode.props, oldNode.props);
    addEvtListeners($parent.childNodes[index], newNode.props);
    var newChildsLength = newNode.children.length;
    var oldChildsLength = oldNode.children.length;
    for (var i = 0; i < newChildsLength || i < oldChildsLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}

/**
 * 判断新旧vnode是否发生改变
 * @param {vnode} newNode
 * @param {vnode} oldNode
 */
function isChange(newNode, oldNode) {
  return isNagetive(newNode) || isNagetive(oldNode) || newNode.type !== oldNode.type || isString(newNode) && newNode !== oldNode || isNumber(newNode) && newNode !== oldNode || !!newNode.forceUpdate;
}

var count = 0;
var vdomGenerator = function vdomGenerator() {
  return vnode(
    'div',
    { id: 'q5', style: 'border: 1px solid #04a6e9' },
    vnode('img', { src: 'https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481__340.jpg', style: 'width:100%;height:400px' }),
    'sdasdsa',
    vnode(
      'div',
      { style: { width: count * 10 + 200 + 'px', height: '50px', background: 'linear-gradient(90deg, #04a6e9, #fff)' }, 'class': 'customClass' },
      'in div#q5 > div',
      vnode(
        'div',
        { style: 'cursor:pointer', onclick: function onclick() {
            addCount();
          } },
        ' ',
        count
      )
    )
  );
};

var content = document.querySelector('#app');
console.log(vdomGenerator());

var oldDom = vdomGenerator();
updateElement(content, oldDom);

function addCount() {
  count++;
  render();
}

function render() {
  updateElement(content, vdomGenerator(), oldDom);
}
