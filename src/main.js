import { updateElement } from './vdom/updateElement'
import { vnode } from './vdom/createElement'

let count = 0
const vdomGenerator = () => (
  <div id="q5" style="border: 1px solid #04a6e9">
    <img src="https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481__340.jpg" style="width:100%;height:400px"/>
    sdasdsa
    <div style={{ width: (count * 10 + 200) + 'px', height: '50px', background: 'linear-gradient(90deg, #04a6e9, #fff)'}} class="customClass">
      in div#q5 > div
      <div style="cursor:pointer" onclick={ () => { addCount() } }> { count }</div>
    </div>
  </div>
)

let content = document.querySelector('#app')
console.log(vdomGenerator())

let oldDom = vdomGenerator()
updateElement(content, oldDom)

function addCount () {
  count ++
  render()
}

function render () {
  updateElement(content, vdomGenerator(), oldDom)
}
