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

//METHOD-OVERRIDE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//MIDDLEWARE
app.use(express.urlencoded({extended:true}));

// ROUTES

//SEED ROUTE
app.get('/coin/seed', (req, res)=>{
    Coin.create([
        {
            "coin": "Bitcoin",  
            "symbol": "BTC"  
        },
        {
            "coin": "Ethereum", 
            "symbol": "ETH" 
        },
        {
            "coin": "Litecoin",
            "symbol": "LTC" 
        },
        {
            "coin": "Ripple",
            "symbol": "XRP"
        }, 
        {
            "coin": "Bitcoin Cash",  
            "symbol": "BCH" 
        },
        {
            "coin": "Ethereum Classic",
            "symbol": "ETC"
        },
        {
            "coin": "Monero", 
            "symbol": "XMR" 
        },
        {
            "coin": "Stellar", 
            "symbol": "XLM"
        },
        {
            "coin": "Dash",
            "symbol": "DASH"
        },
        {
            "coin": "Decred", 
            "symbol": "DCR"
        },

    ], (err, data)=>{
        res.redirect('/coin');
    })
}); 

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
        res.redirect('/coin'); 
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

//SHOW ROUTE
app.get('/coin/:id', (req, res)=>{
    Coin.findById(req.params.id, (err, foundCoin)=>{
        res.render('show.ejs', {
            coin:foundCoin
        });
    });
});

//TESTING API ///
// app.get('/coin/:id', (req, res) => {
//     Coin.findById(req.someId, (err, foundCoin) => {
//       const url = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${foundCoin.coinId}`;
//       axios.get(url)
//         .then((coinData) => {
//           console.log(coinData);
//           res.render('show.ejs', {
//             coin: foundCoin,
//             coindData: coinData,
//           });
//         }
//         );
//     });
//   });

//DELETE ROUTE
app.delete('/coin/:id', (req, res)=>{
    Coin.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/coin'); 
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