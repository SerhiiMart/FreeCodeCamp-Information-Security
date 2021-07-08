const mongoose = require('mongoose')
const {Schema} = mongoose

let default_date = new Date()

let Reply_Schema= new Schema({
  text: {type: String},
  delete_password: {type: String},
  created_on: {type: Date, default: default_date},
  bumped_on: {type: Date, default: default_date},
  reported: {type: Boolean, default: false},
})
const Reply = mongoose.model('Reply', Reply_Schema)

let Thread_Schema = new Schema({
  text: {type: String},
  delete_password: {type: String},
  reported: {type: Boolean, default: false},
  created_on: {type: Date, default: default_date},
  bumped_on: {type: Date, default: default_date},
  replies: {type: [Reply_Schema]},
})
const Thread = mongoose.model("Thread", Thread_Schema);

let Board_Schema = new Schema({
  name: {type: String},
  threads: { type: [Thread_Schema]},
})

const Board = mongoose.model("Board", Board_Schema);

module.exports = Reply;
module.exports = Thread;
module.exports = Board;