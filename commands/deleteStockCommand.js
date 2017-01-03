var Stock = require("../models/stock");

var handle = function(symbol, callback) {

    Stock.findOneAndRemove({symbol: symbol}, function(error, result) {
        if (error) {
            console.error(error);
        }
        else {
            console.log(result);
            callback();
        }        
    });
}

module.exports = handle;