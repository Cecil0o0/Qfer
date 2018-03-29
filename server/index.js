const koa = require('koa')
const koaStatic = require('koa-static')

const app = new koa()

app.use(koaStatic('./'))

app.listen(3000, () => {
  console.log('listening at 3000')
})
