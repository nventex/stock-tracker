var buyStocks = require("../commands/buyStocksCommand");
var updateStock = require("../commands/updateStockCommand");
var getStocks = require("../commands/getStocksCommand");
var sellStock = require("../commands/sellStockCommand");
var addDividend = require("../commands/addDividendsCommand");
var deleteStock = require("../commands/deleteStockCommand");
var estimateStockPrice = require("../commands/estimateStockPriceCommand");

var controllers = {
    
    buyStock: function(app) {
        app.post("/api/stock/:symbol", function(req, resp) {
           var request = { "transactions": [req.body] };
           buyStocks(req.params.symbol, request, function(stock) {
                resp.json(stock);
           });
        });
    },
    
    buyStocks: function(app) {
        app.post("/api/stocks/:symbol", function(req, resp) {
           buyStocks(req.params.symbol, req.body, function(stock) {
                resp.json(stock);
           });
        });
    },

    updateStock: function(app) {
        app.put("/api/stock/:symbol/:transactionId", function(req, resp) {
            updateStock(req.params.symbol, req.params.transactionId, req.body, function(stock) {
                resp.json(stock);
            });
        });
    },
    
    getStocks: function(app) {
        app.get("/api/stock", function(req, resp) {
            getStocks(function(stock) {
                resp.json(stock); 
            });          
        });
    },
    
    sellStock: function(app) {
        app.put("/api/stock/:symbol", function(req, resp) {
            sellStock(req.params.symbol, req.body, function(transactions) {
                resp.json(transactions);
            })            
        }); 
    },
    
    addDividend: function(app) {
        app.post("/api/stock/:symbol/dividends", function(req, resp){
            addDividend(req.params.symbol, req.body, function(stock) {
                resp.json(stock); 
            });      
        });
    },

    deleteStock: function(app) {
        app.delete("/api/stock/:symbol", function(req, resp) {
            deleteStock(req.params.symbol, function() {
                resp.json();
            });
        });
    },

    estimateStockPrice: function(app) {
        app.post("/api/stock/:symbol/estimate", function(req, resp) {
            estimateStockPrice(req.params.symbol, req.body.price, function(stock) {
                resp.json(stock);
            });
        });
    }
}

module.exports = controllers;