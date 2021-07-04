'use strict';

const SPC  = require('../models');
const fetch = require('node-fetch');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest


async function createStock(stock, like, ip){
  const newStock = new SPC ({
    symbol: stock,
    likes: like ? [ip] : [],
  })
}

async function findStock(stock){
  return await SPC.findOne({ symbol: stock }).exec();
}

async function saveStock(stock, like, ip) {
  var saved = {};
  const foundStock = await findStock(stock);
  if (!foundStock) {
    const createSaved = await createStock(stock, like, ip);
    saved = createSaved;
    return saved;
  } else {
    if(like && foundStock.likes.indexOf(ip) === -1) {
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
}

async function getStock(stock) {
  const res = await fetch(
  `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const {symbol, latestPrice} = await res.json();
  return {symbol, latestPrice};
}

module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(function async (req, res){
      const { stock, like } = req.query;
      const { symbol, latestPrice } = await getStock(stock);
      if (!symbol) {
        res.json({ stockData: {likes: like ? 1 : 0} });
        return;
      }
    });
    
};
