var Stock = require("../models/stock");
var _ = require("underscore-node");
var Calculator = require("../services/stockCalculator");

function compare(a, b) {
    if (a.netValue < b.netValue) {
        return -1;
    }
    else if (a.netValue > b.netValue) {
        return 1;
    }
    return 0;
}

var handle = function(symbol, sellTransaction, callBack) {
    
    Stock.findOne({ symbol: symbol },
                    function (err, stock) {
                        transactions = stock.transactions;
                        transactions = _.filter(transactions, function(transaction) {
                            return transaction.hasSold === false;                                
                        });
                        transactions = _.sortBy(transactions, "netValue");
                        
                        var quantitySold = sellTransaction.quantitySold;
                        var sold = sellTransaction.sold;
                        var soldPerShare = sold / quantitySold; 
                        
                        transactions.forEach(function(transaction) {
                            var originalQuantity = transaction.quantityPaid;
                            
                            if (quantitySold > 0) {
                                
                                // Quantity sold more than the quantity owned, we close this transactions line and figure out the net value...
                                if (quantitySold >= Math.floor(transaction.quantity)) {
                                    transaction.hasSold = true;
                                    transaction.quantity = 0;
                                    transaction.netValue = (soldPerShare * originalQuantity) - transaction.paid;                                
                                }
                                // Quantity sold less than the quantity owned, then we the stock calculate re-calculate the net value...
                                else {
                                    transaction.quantityPaid -= quantitySold;
                                    transaction.paid -= (quantitySold * soldPerShare);
                                    quantitySold = 0;
                                }
                                
                                quantitySold -= originalQuantity;
                            }
                        });
                        
                        stock.quantity -= sellTransaction.quantitySold;
                        stock.transactions = transactions;
                        
                        Calculator.calculateTransactions(stock);

                        stock.save();

                        callBack(stock.transactions);
                    });
}

module.exports = handle;