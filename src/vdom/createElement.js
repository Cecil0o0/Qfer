/**
 * 创建节点
 */
import { updateProps } from './handleProps'
import { addEvtListeners } from './handleEvts'
import { isString, isNumber } from './utils'

/**
 * 构建vnode模型
 * @param {string} type
 * @param {string} props`
 * @param {string} children
 */
export function vnode(type, props, ...children) {
  return { type, props, children }
}

/**
 * 递归创建真实dom
 * @param {vnode} node
 */
export function createElement(node) {
  if (isString(node) || isNumber(node)) {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type)
  updateProps($el, node.props)
  addEvtListeners($el, node.props)
  node.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}
