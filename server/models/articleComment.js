import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ArticleCommentSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  articleid: {
    type: String,
    required: true
  },
  list: [
    {
      name: String,
      avatar: {
          type: String,
          default: 'https://img2.mukewang.com/545862fe00017c2602200220-40-40.jpg'
        },
      comment: {
        type: String,
        default: ''
      },
      time: String
    }
  ]
})

const articleCommentModel = mongoose.model('articlecomment', ArticleCommentSchema)

export default articleCommentModel
