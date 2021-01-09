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
import AttachmentModel from '../models/attachment.js'
const router = new Router({
  prefix: '/admin'
})

router.get('/userinfo', async (ctx) => {

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


  router.get('/teacherinfo', async (ctx) => {
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

  router.get('/attachmentinfo',  async (ctx) => {
    const { filename,src } = ctx.request.body
    try {
      const info = await AttachmentModel.find({
      })
      if (info) {
        ctx.body = {
          code: ERR_OK,
          msg: '获取附件信息成功',
          data: info
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '获取附件信息失败'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message || '服务器异常'
      }
    }
  })

  router.post('/attachment', async (ctx) => {
    const { filename, src } = ctx.request.body
    // 校验用户名
    if (!filename) {
      ctx.body = {
        code: -1,
        msg: '文件名不能为空'
      }
      return
    }
    // 校验密码
    if (!src) {
      ctx.body = {
        code: -1,
        msg: '密码不能为空'
      }
      return
    }
    // 判断用户是否已存在
    const checkAtta = await AttachmentModel.find({
      filename
    })
    if (checkAtta.length > 0) {
      ctx.body = {
        code: -1,
        msg: '该附件已存在'
      }
      return
    }
    // 判断是否成功写入数据库
    const guid = getGuid()
    const check = await AttachmentModel.create({
      id: guid,
      filename:filename,
      src:src
    })
    if (!check) {
      ctx.body = {
        code: -1,
        msg: '添加附件失败'
      }
      return
    }
    try {
      ctx.body = {
        code: ERR_OK,
        msg: '添加附件成功',
        data: []
      }
    } catch(e) {
      ctx.body = {
        code: -1,
        msg: e.message
      }
    }
  })

  router.get('/lessoninfo',  async (ctx) => {
    const userId = ctx.session.user_id
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