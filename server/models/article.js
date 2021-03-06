import mongoose from 'mongoose'
import articleData from '../initData/article.js'
import articleCommentData from '../initData/articleComment.js'
import articleCommentModel from './articleComment.js'
import { getGuid } from '../../src/utils/utils.js'
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  img: String,
  views: {
    type: Number,
    default: 0
  },
  author: String,
  tag: String,
  time: String,
  type: {
    text: String,
    code: Number
  },
  abstract: String,
  content_html: String,
  content_md: String

})

const articleModel = mongoose.model('article', ArticleSchema)
// 判断有无数据，没有则初始化
articleModel.find((err, data) => {
  if (!data || data.length === 0) {
    articleData.forEach(item => {
      item.id = getGuid()
      articleModel.create(item)

      articleCommentModel.create({
        id: getGuid(),
        articleid: item.id,
        list: articleCommentData
      })
    })

    
  }
})

export default articleModel
