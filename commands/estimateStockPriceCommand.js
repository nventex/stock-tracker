var Stock = require("../models/stock");
var Calculator = require("../services/stockCalculator");

var handle = function(symbol, price, callback) {

    Stock.findOne({symbol: symbol}, function(err, stock) {
        stock.price = price;

        Calculator.calculateTransactions(stock);

        callback(stock);
    });
}

module.exports = handle;