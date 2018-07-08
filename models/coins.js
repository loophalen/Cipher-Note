const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    coin: String, 
    ticker: String, 
    info: String, 
    exchange: String,   
    MEME: String, 
    Message: String, 
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;