import mongoose from 'mongoose'
const Schema = mongoose.Schema
const AttachmentSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  filename: {
    type: String,
    required: true
  },
  src:{
    type:String,
    required:true
  }
})

const AttachmentModel = mongoose.model('attachment', AttachmentSchema)

export default AttachmentModel
