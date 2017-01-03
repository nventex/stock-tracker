var Stocks = require("../models/stock");

module.exports = function(app) {
    
    app.get("/api/setupStocks", function(req, res) {
        
        var stockSeed = [
            {
                symbol: "INTC",
                quantity: 73.824,
                quantityPaid: 164,
                price: 31.49,
                
                transactions: [
                    {
                        quantity: 8.47922,
                        marketValue: 267.01,
                        paid: 176.71,
                        quantityPaid: 8,
                        paidPerShare: 22.09,
                        netValue: 90.30,
                        portionalWeight: 4.88 
                    },
                    {
                        quantity: 7.41932,
                        marketValue: 234.23,
                        paid: 177.37,
                        quantityPaid: 7,
                        paidPerShare: 25.34,
                        netValue: 56.86,
                        portionalWeight: 4.27 
                    }                    
                ]
            },
            {
                "transactions": [
                    {
                        "paid": 4261.45, 
                        "quantityPaid": 35
                    }
                ]
            },
            {
            "transactions": [
                    {
                        "paid": 4000.25, 
                        "quantityPaid": 20
                    }
                ]
            }            
        ];
        
        Stocks.create(stockSeed, function(err, results) {
           res.send(results);
        });
    });
}