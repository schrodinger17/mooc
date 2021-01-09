import Router from 'koa-router'
import User from '../models/user.js'
import Lesson from '../models/lesson.js'
import Teacher from '../models/teacher.js'
import checkUser from '../middleware/auth.js'
import Log, { initUserLogs } from '../models/log.js'
import { initUserRecharges } from '../models/recharge.js'
import { initUserCoupons } from '../models/coupon.js'
import { initUserBills } from '../models/bill.js'
import { ERR_OK } from '../config.js'
import { getGuid } from '../../src/utils/utils.js'
const router = new Router({
  prefix: '/admin'
})

router.get('/userinfo', checkUser, async (ctx) => {
    const userId = ctx.session.user_id
    if (!userId) {
      ctx.body = {
        code: -2,
        msg: '登录信息已过期'
      }
      return
    }
    try {
      const info = await User.find({
      })
      if (info) {
        ctx.body = {
          code: ERR_OK,
          msg: '获取用户信息成功',
          data: info
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '获取用户信息失败'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message || '服务器异常'
      }
    }
  })


  router.get('/teacherinfo', checkUser, async (ctx) => {
    const userId = ctx.session.user_id
    if (!userId) {
      ctx.body = {
        code: -2,
        msg: '登录信息已过期'
      }
      return
    }
    try {
      const info = await Teacher.find({
      })
      if (info) {
        ctx.body = {
          code: ERR_OK,
          msg: '获取讲师信息成功',
          data: info
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '获取讲师信息失败'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message || '服务器异常'
      }
    }
  })
  router.get('/lessoninfo', checkUser, async (ctx) => {
    const userId = ctx.session.user_id
    if (!userId) {
      ctx.body = {
        code: -2,
        msg: '登录信息已过期'
      }
      return
    }
    try {
      const info = await Lesson.find({
      })
      if (info) {
        ctx.body = {
          code: ERR_OK,
          msg: '获取课程信息成功',
          data: info
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '获取课程信息失败'
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