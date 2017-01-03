var Stock = require("../models/stock");
var Calculator = require("../services/stockCalculator");

var handle = function(symbol, dividend, callBack) {
    
    Stock.findOne({symbol: symbol}, function(error, stock) {
       
        stock.quantity = dividend.quantity;

        if (dividend.dividend) {
            stock.dividend = dividend.dividend;
        }

        Calculator.calculateTransactions(stock);

        stock.save(function (error) {
            if (error) {
                console.log(error);
            }
        });

        callBack(stock);
    });
}

module.exports = handle;