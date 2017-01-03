var calculator = require("../services/stockCalculator");
var Stock = require("../models/stock");
var stockService = require("../services/stockService");

function addTransaction(newStock, oldStock) {

    newStock.transactions.forEach(function(transaction) {
        oldStock.quantity = (oldStock.quantity || 0) + transaction.quantityPaid;
        
        transaction.hasSold = false;
        oldStock.transactions.push(transaction);
    });
    
    return calculator.calculateTransactions(oldStock);
}

var errorHandler = function(error, result) {
    if (error) {
        console.error(result);
    }
}

function update (newStock, oldStock, stockPrice) {
    oldStock.price = stockPrice;
    return addTransaction(newStock, oldStock);
}
    
function add(symbol, newStock, stockPrice) {
 
    var oldStock = {
        symbol: symbol,
        price: stockPrice,
        dividend: 0,
        transactions: []
    }    
    
    return addTransaction(newStock, oldStock);
}

var handle = function(symbol, newStock, callBack) {

    stockService.getCurrentStockPrice(symbol, function(stockPrice) {
        symbol = symbol.toUpperCase();
        
        Stock.findOne({symbol: symbol}, function(err, stock) {
            if (err) {
                return console.error(err);
            }
            
            stock = stock ? update(newStock, stock, stockPrice) : add(symbol, newStock, stockPrice);

            Stock.findOneAndUpdate(
                {symbol: symbol}, 
                stock, { upsert: true }, 
                function(error, result) { 
                    if (error) {
                        console.error(result);
                    }
                    callBack(stock);
                });
        });
    });
}

module.exports = handle;