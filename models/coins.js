const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    coin:  { type: String, required: true },
    ticker:  { type: String, required: true },
    info: { type: String, required: true }, 
    hodlCoin: Boolean
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;