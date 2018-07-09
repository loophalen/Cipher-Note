const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    coin: String, 
    symbol: String, 
    info: String, 
    exchange: String,   
    notes: String 
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;