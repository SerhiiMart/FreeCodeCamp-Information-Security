const mongodb = require('mongodb')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
let dbName = "SPCDB"
mongoose.connect(`${process.env.DB}${dbName}`, {   
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true, }
);
let db = mongoose.connection
db.on('error', err => { console.error(err) })
db.once('open', () => {
  console.log(`Connected to Database ${dbName}`)
})
process.on('SIGINT', () => {
  db.close(() => {
    console.log(`Closing connection to ${dbName}`)
    process.exit(0)
  })
})

module.exports = db;