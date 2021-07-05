'use strict';

require("dotenv").config();
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const Stock  = require('../models');
const request = require('request-promise-native')

function saveStock(code, like, ip) {
  return Stock.findOne({ code: code })
    .then(stock => {
      if (!stock) {
        let newStock = new Stock({ code: code, likes: like ? [ip] : [] })
        return newStock.save()
      } else {
        if (like && stock.likes.indexOf(ip) === -1) {
          stock.likes.push(ip)
        }
        return stock.save()
      }
    })
}

function parseData(data) {
  let i = 0
  let stockData = []
  let likes = []
  while (i < data.length) {
    let stock = { stock: data[i].code, price: parseFloat(data[i+1]) }
    likes.push(data[i].likes.length)
    stockData.push(stock)
    i += 2
  }

  if (likes.length > 1) {
    stockData[0].rel_likes = likes[0] - likes[1]
    stockData[1].rel_likes = likes[1] - likes[0]
  } else {
    stockData[0].likes = likes[0]
    stockData = stockData[0]
  }
  
  return stockData
}

module.exports = function (app) {
  
  app.get('/api/testing', (req, res) => {
    console.log(req.connection)
    
    res.json({ IP: req.ip })
  })
  
  app.route('/api/stock-prices')
    .get(function (req, res) {
      let code = req.query.stock || ''
      if (!Array.isArray(code)) {
        code = [code]
      }
    
      let promises = []
      code.forEach(code => {
        promises.push(saveStock(code.toUpperCase(), req.query.like, req.ip))
        
        let url = `https://api.iextrading.com/1.0/stock/${code.toUpperCase()}/price`
        promises.push(request(url))
      })
    
      Promise.all(promises)
        .then(data => {
          let stockData = parseData(data)
          res.json({ stockData })
        })
        .catch(err => {
          console.log(err)
          res.send(err)
        })
    })
}