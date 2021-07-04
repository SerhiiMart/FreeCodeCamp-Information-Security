let mongodb = require('mongodb')
let mongoose = require('mongoose')
let {Schema} = mongoose

let Stock_Price_Checker_Schema = new Schema({
  symbol: { type: String, required: true },
  likes: { type: [String], default: [] }, 
})
const SPC = mongoose.model("SPC", Stock_Price_Checker_Schema);

module.exports = SPC;