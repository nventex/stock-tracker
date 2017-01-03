var stockCalculator = {
    
    calculateTransactions: function(oldStock) {
        var currentPrice = oldStock.price;
        var totalQuantityPaid = 0;  
        var totalNetValue = 0;
        var dividend = oldStock.dividend || 0;

        // Get total quantityPaid...
        oldStock.transactions.forEach(function(transaction) {
            if (!transaction.hasSold) {
                totalQuantityPaid += transaction.quantityPaid;
            }
        }, this);
        
        oldStock.quantityPaid = totalQuantityPaid;

        oldStock.transactions.forEach(function(transaction) {
            if (!transaction.hasSold) {
                transaction.paidPerShare = transaction.paid / transaction.quantityPaid;
                transaction.portionalWeight = transaction.quantityPaid / oldStock.quantityPaid;
                transaction.quantity =  transaction.portionalWeight * oldStock.quantity; 
                transaction.marketValue = currentPrice * transaction.quantity;
                transaction.netValue = (currentPrice * transaction.quantity) - transaction.paid;
                totalNetValue += transaction.netValue;
            }
            
        }, this);
        
        oldStock.totalNetValue = totalNetValue + dividend;

        return oldStock;   
    }
}

module.exports = stockCalculator;