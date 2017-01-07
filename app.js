var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    config = require("./config"),
    bodyParser = require("body-parser"),
    stockController = require("./controllers/stockController"),
    cors = require("cors");

var port = process.env.PORT || 3000;

var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = (origin ? origin.includes("edmondtang.com") : false);
    callback(true ? null : 'Bad Request', originIsWhitelisted);
  }
}

// app.use(cors());

app.use(bodyParser.json());

mongoose.connect(config.getDbConnectionString());

stockController.buyStock(app);
stockController.buyStocks(app);
stockController.updateStock(app);
stockController.getStocks(app);
stockController.sellStock(app);
stockController.addDividend(app);
stockController.deleteStock(app);
stockController.estimateStockPrice(app);

app.listen(port);