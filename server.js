//EXPRESS
const express = require('express'); 
const app = express(); 
//RETURN HEROKU OR LOCAL 3000
const PORT = process.env.PORT || 3000;
// MONGOOSE DATABASE
const mongoose = require('mongoose'); 
//REQUIRE MODELS
const Coin = require('./models/coins.js'); 
//HEROKU PORT
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/coin_app_dev';

//MIDDLEWARE
app.use(express.urlencoded({extended:true}));

// ROUTES

//CREATE NEW ROUTE
app.get('/coin/new', (req, res)=>{
    res.render('new.ejs'); 
}); 

//CREATE ROUTE
app.post('/coin', (req, res)=>{
    if(req.body.hodlCoin === 'on'){
        req.body.hodlCoin = true; 
    } else {
        req.body.hodlCoin = false; 
    }
    Coin.create(req.body, (err, createdCoin)=>{
        if (err) console.log(err.message)
        res.send(createdCoin); 
    }); 
});

//INDEX ROUTE
app.get('/coin', (req, res)=>{
    Coin.find({}, (err, allCoin)=>{
        res.render('index.ejs', {
            coin: allCoin
        }); 
    }); 
}); 


// LISTENER
app.listen(PORT, ()=>{
    console.log('listening....'); 
}); 

// CONNECT TO MONGO
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', ()=> {
    console.log('connected to mongoose!!')
})