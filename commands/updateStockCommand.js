var Stock = require("../models/stock");
var Calculator = require("../services/stockCalculator");
var stockService = require("../services/stockService");

var handle = function(symbol, transactionId, newTransaction, callBack) {
    
    stockService.getCurrentStockPrice(symbol, function(stockPrice) {
        Stock.findOne({ symbol: symbol, "transactions._id": transactionId }, 
                        function(err, stock) {
                            var transaction = stock.transactions.id(transactionId);

                            transaction.paid = newTransaction.paid;
                            transaction.quantityPaid = newTransaction.quantityPaid;
                            
                            stock.price = stockPrice;
                            Calculator.calculateTransactions(stock);

                            stock.save();
                            
                            callBack(stock);
                        }
        );
    });
}

module.exports = handle;