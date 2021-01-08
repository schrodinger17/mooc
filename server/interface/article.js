import Router from 'koa-router'
import ArticleType from '../models/articleType.js'
import Article from '../models/article.js'
import ArticleComment from '../models/articleComment.js'
import { ERR_OK, SIZE } from '../config.js'
import {getGuid} from '../../src/utils/utils.js'
const router = new Router({
  prefix: '/article'
})

// 获取手记分类列表路由
router.get('/type', async (ctx) => {
  try {
    const result = await ArticleType.find()
    if (result) {
      ctx.body = {
        code: ERR_OK,
        msg: '获取手记分类数据成功',
        data: result
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取手记分类数据失败',
        data: []
      }
    }
  } catch (e) {
    ctx.body = {
      code: e.message || '服务器异常',
      msg: '获取手记分类数据失败',
      data: []
    }
  }
})

// 获取手记列表路由
router.get('/list', async (ctx) => {
  const { page = 1, size = SIZE, code } = ctx.query
  try {
    const where = {}
    if (code) {
      where['type.code'] = code
    }
    const total = await Article.find(where).countDocuments()
    const result = await Article.find(where).skip((page - 1) * size).limit(+size)
    if (result) {
      ctx.body = {
        code: ERR_OK,
        msg: '获取手机列表数据成功',
        data: {
          list: result,
          total: total
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取手记列表数据失败',
        data: {
          list: [],
          total: 0
        }
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '服务器异常',
      data: {
        list: [],
        total: 0
      }
    }
  }
})

router.get('/', async (ctx) => {
  const { id } = ctx.query
  try {
    const where = {}
    if (id) {
      where['id'] = id
    }
    const result = await Article.find(where)
    if (result) {
      ctx.body = {
        code: ERR_OK,
        msg: '获取文章数据成功',
        data: {
          article: result,
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取文章数据失败',
        data: {
          article:{}
        }
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '服务器异常',
      data: {
        article:{}
      }
    }
  }
})

router.get('/comment', async (ctx) => {
  const { id } = ctx.query
  if (!id) {
    ctx.body = {
      code: -1,
      msg: '缺少关键参数id'
    }
    return false
  }
  try {
    const result = await ArticleComment.findOne({
      articleid: id
    })
    if (result) {
      ctx.body = {
        code: ERR_OK,
        msg: "获取课程评论数据成功",
        data: result.list
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取课程评论数据失败',
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message || '服务器异常'
    }
  }
})

router.post('/comment', async (ctx) => {
  const { id, params } = ctx.request.body.params
  console.log(ctx.request.body)
  console.log(id)
  if (!id) {
    ctx.body = {
      code: -1,
      msg: '缺少关键参数id'
    }
    return false
  }
  try {
    let res = await ArticleComment.findOne({
      articleid: id
    })
    let list = []
    if(res)
    {
      list = res.list
    }
    list.push(params)

    await ArticleComment.updateOne({
      articleid: id
    }, {list:list}, function (err, res)
    {
      if(err)
      {
        ctx.body = {
          code: -1,
          msg: '更新课程评论数据失败',
        }
      }
      else{
        console.log(res)
        ctx.body = {
          code: ERR_OK,
          msg: "更新课程评论数据成功",
        }
      }
    })
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message || '服务器异常'
    }
  }
})


router.post('/', async (ctx) => {
  const { params } = ctx.request.body
  params.id = getGuid()
  console.log(params)
  try {
    const result = await Article.create(params)
    console.log(result)
    const res = await ArticleComment.create({
      id:getGuid(),
      articleid:params.id
    })
    // console.log(res)
    if (result && res) {
      ctx.body = {
        code: ERR_OK,
        msg: '推送文章数据成功',
        id:result.id
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '推送文章数据失败',
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '服务器异常',
    }
  }
})


export default router
