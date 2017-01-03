var Client = require("node-rest-client").Client;

var client = new Client();

var stockService = {
    getCurrentStockPrice: function(symbol, callBack) {
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20Symbol%2C%20LastTradePriceOnly%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22" + symbol + "%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        client.get(url, function(data, response) {
            
            // var responseData = data.toString("utf8");
            // var jsonData = JSON.parse(responseData);

            callBack(data.query.results.quote.LastTradePriceOnly);
        });
    },

    getCurrentStockPrices: function(symbols, callBack) {
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20Symbol%2C%20LastTradePriceOnly%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22" + symbols + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        client.get(url, function(data, response) {
            var quotes = [];
            
            if (Array.isArray(data.query.results.quote)) {
                quotes = data.query.results.quote;
            }
            else {
                quotes = [data.query.results.quote];
            }
            
            callBack(quotes);
        });
    }    
}

module.exports = stockService;