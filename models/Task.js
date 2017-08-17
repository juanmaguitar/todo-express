const mongoose = require('mongoose')

const collection = 'tasks'

var TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
}, { collection })

module.exports = mongoose.model('Task', TaskSchema)
