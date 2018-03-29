/**
 * 处理事件
 */

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
export function addEvtListeners ($el, props) {
  props && Object.keys(props).forEach(key => {
    if (isEventProp(key)) {
      $el[key] = props[key]
      // $el.removeEventListener(extractEvtName(key), props[key], false)
      // $el.addEventListener(extractEvtName(key), props[key], false)
    }
  })
}
