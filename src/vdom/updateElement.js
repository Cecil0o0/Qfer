import { createElement } from './createElement'
import { updateProps } from './handleProps'
import { addEvtListeners } from './handleEvts'
import { isString, isNagetive, isNumber } from './utils'
/**
 * patch elements
 * @param {Node} $parent
 * @param {VNode} newNode
 * @param {VNode} oldNode
 * @param {Number} index
 */
export function updateElement($parent, newNode, oldNode, index = 0) {
  if (isNagetive(oldNode)) {
    // 增
    $parent.appendChild(createElement(newNode))
  } else if (isNagetive(newNode)) {
    // 删
    $parent.removeChild($parent.childNodes[index])
  } else if (isChange(newNode, oldNode)) {
    // 改
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  } else if (newNode.type) {
    // 如果没有发生改变，且为非文本节点，那么递归patch子节点
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
  return isNagetive(newNode) ||
      isNagetive(oldNode) ||
      newNode.type !== oldNode.type ||
      (isString(newNode) && newNode !== oldNode) ||
      (isNumber(newNode) && newNode !== oldNode) ||
      !!newNode.forceUpdate
}
