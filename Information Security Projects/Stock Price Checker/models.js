let mongodb = require('mongodb')
let mongoose = require('mongoose')
let {Schema} = mongoose

let Stock_Price_Checker_Schema = new Schema({
  symbol: { type: String, required: true },
  likes: { type: [String], default: [] }
})
const Stocks = mongoose.model("Stocks", Stock_Price_Checker_Schema);

module.exports = Stocks;