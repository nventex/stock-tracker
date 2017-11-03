var Stock = require("../models/stock");
var stockService = require("../services/stockService");
var Calculator = require("../services/stockCalculator");
var async = require("async");

// if (!Array.prototype.find) {
//   Array.prototype.find = function(predicate) {
//     if (this == null) {
//       throw new TypeError('Array.prototype.find called on null or undefined');
//     }
//     if (typeof predicate !== 'function') {
//       throw new TypeError('predicate must be a function');
//     }
//     var list = Object(this);
//     var length = list.length >>> 0;
//     var thisArg = arguments[1];
//     var value;

//     for (var i = 0; i < length; i++) {
//       value = list[i];
//       if (predicate.call(thisArg, value, i, list)) {
//         return value;
//       }
//     }
//     return undefined;
//   };
// }

var handle = function(callBack) {

    var calls = [];

    Stock.find({}, function(err, stocks) {

        stocks.forEach(function(stock) {
            
            calls.push(function(asyncCallback) {
                stockService.getCurrentStockPrice(stock.symbol, function(stockPrice) {
                    stock.price = stockPrice;
                    Calculator.calculateTransactions(stock);

                    if (err) {
                        return asyncCallback(err);
                    }

                    asyncCallback(null, stockPrice);

                });
            });
        });

        async.parallel(calls, function(error, result) {
            callBack(stocks);
        });
    
    }).sort([["symbol", "ascending"]]);
}

// var handle = function(callBack) {

//     var calls = [];

//     Stock.find({}, function(err, stocks) {

//         var symbols = Array.prototype.map.call(stocks, function(stock) {
//             return stock.symbol;
//         }).join("%22%2C%22");

//         stockService.getCurrentStockPrices(symbols, function(results) {
            
//             stocks.forEach(function(stock) {
//                 var stockResult = results.find(function(result) {
//                     return result.Symbol == stock.symbol;
//                 });
                
//                 stock.price = stockResult.LastTradePriceOnly;
//                 Calculator.calculateTransactions(stock);

//             });

//             callBack(stocks);

//         });

//     }).sort([["symbol", "ascending"]]);
// }

module.exports = handle;