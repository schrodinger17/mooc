import Router from 'koa-router'
import Nav from '../models/nav.js'
import Footer from '../models/footer.js'
import { ERR_OK } from '../config.js'
const router = new Router({
  prefix: '/common'
})

// 头部导航接口
router.get('/nav', async (ctx) => {
  try {
    const result = await Nav.find()
    if (result.length >= 0) {
      ctx.body = {
        code: ERR_OK,
        msg: '获取头部导航数据成功',
        data: result
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取头部导航数据失败',
        data: []
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message || '服务器异常'
    }
  }
})

// 底部链接接口
router.get('/footer', async (ctx) => {
  try {
    const result = await Footer.find().sort({
      sort: 'ascending'
    })
    if (result.length >= 0) {
      ctx.body = {
        code: ERR_OK,
        msg: '获取底部链接数据成功',
        data: result
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取底部链接数据失败',
        data: []
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message || '服务器异常'
    }
  }
})

export default router
