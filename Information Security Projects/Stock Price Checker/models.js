let mongodb = require('mongodb')
let mongoose = require('mongoose')
let {Schema} = mongoose

let Stock_Price_Checker_Schema = new Schema({
  name: { type: String, required: true },
  likes: { type: [String], default: [] }, 
  ips: [String],
})
const Stock = mongoose.model("Stock", Stock_Price_Checker_Schema);

module.exports = Stock;