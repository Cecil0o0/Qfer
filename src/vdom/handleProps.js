/**
 * 处理属性
 */
import { isBoolean, plainStyleObj, isObject } from './utils'

/**
 * 过滤自定义属性
 * @param {string} name
 */
export function isCustomProp (name) {
  return ['forceUpdate'].includes(name)
}

/**
 * 设置Element属性
 * @param {Node}  $el
 * @param {string} name
 * @param {*} value
 */
function setProp($el, name, value) {
  if (isCustomProp(name)) {
    return
  } else if (isBoolean(value)) {
    handleBoolProp($el, name, value)
  } else {
    // 设置style时，判断是对象还是字符串
    if (name === 'style' && isObject(value)) {
      $el.setAttribute(name, plainStyleObj(value))
    } else {
      $el.setAttribute(name, value)
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
    $el.setAttribute(name, value)
    $el[name] = !!value
  } else {
    $el[name] = !!value
  }
}

/**
 * 移除Element属性
 * @param {Node} $el
 * @param {string} name
 * @param {*} value
 */
function removeProp ($el, name, value) {
  if (isCustomProp(name)) {
    return
  } else if (isBoolean(value)) {
    $el[name] = false
  }
  $el.removeAttribute(name, value)
}

/**
 * 更新Element属性
 * @param {Node} $el
 * @param {string} name
 * @param {*} newValue
 * @param {*} oldValue
 */
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
export function updateProps ($el, newProps = {}, oldProps = {}) {
  let _props = Object.assign({}, newProps, oldProps)
  Object.keys(_props).forEach(key => {
    updateProp($el, key, newProps ? newProps[key] : null, oldProps ? oldProps[key] : null)
  })
}
