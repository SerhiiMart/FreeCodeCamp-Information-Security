let mongodb = require('mongodb')
let mongoose = require('mongoose')

let db = mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = db;