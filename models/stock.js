var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    quantity: { type: Number, required: true },
    marketValue: { type: Number, required: true },
    paid: { type: Number, required: true },
    quantityPaid: { type: Number, required: true },
    paidPerShare: { type: Number, required: true },
    netValue: { type: Number, required: true },
    portionalWeight: { type: Number, required: true },
    hasSold: { type: Boolean, required: true }
});

var stockSchema = new Schema({
    symbol: { type: String, required: true, uppercase: true, trim: true, unique: true, index: true },
    quantity: { type: Number, required: true },
    quantityPaid: { type: Number, required: true },
    price: { type: Number },
    totalNetValue: { type: Number },
    dividend: { type: Number },
    transactions: [transactionSchema]
});

// Declare the collection that will contain documents with the stockSchema
var Stock = mongoose.model("stockTracker", stockSchema);

module.exports = Stock;