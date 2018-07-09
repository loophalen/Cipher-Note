//EXPRESS
const express = require('express'); 
const app = express(); 
const session = require('express-session');
//RETURN HEROKU OR LOCAL 3000
const PORT = process.env.PORT || 3000;
// MONGOOSE DATABASE
const mongoose = require('mongoose'); 
//REQUIRE MODELS
const Coin = require('./models/coins.js'); 
const coinSeed = require('./models/seed.js')
//HEROKU PORT
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/coin_app_dev';
//METHOD-OVERRIDE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//MIDDLEWARE
app.use(express.urlencoded({extended:true}));
//EXPRESS-SESSION MIDDLEWARE
app.use(session({
    secret: "tothemoonmoonordoom", 
    resave: false,
    saveUninitialized: false
}))

//CONTROLLERS
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


// ROUTES

//SEED ROUTE
app.get('/coin/seed', (req, res)=>{
    Coin.create([
        {
            "coin": "Bitcoin",  
            "symbol": "BTC", 
            "info": "Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Although other cryptocurrencies have come before, Bitcoin is the first decentralized cryptocurrency - Its reputation has spawned copies and evolution in the space.", 
            "exchange": "https://www.coinbase.com/",
            "notes": " "
        },
        {
            "coin": "Ethereum", 
            "symbol": "ETH", 
            "info": " ", 
            "exchange": " ",
            "notes": " " 
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

//SEED 
// Coin.create( coinSeed, (err, data) => {
//     if (err) console.log (err.message)
//     console.log('added coin seed data')
// }); 

//CREATE NEW ROUTE
app.get('/coin/new', (req, res)=>{
    res.render('new.ejs'); 
}); 

//CREATE ROUTE
app.post('/coin', (req, res)=>{
    // if(req.body.hodlCoin === 'on'){
    //     req.body.hodlCoin = true; 
    // } else {
    //     req.body.hodlCoin = false; 
    // }
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

//EDIT ROUTE
app.get('/coin/:id/edit', (req, res)=>{
    Coin.findById(req.params.id, (err, foundCoin)=>{
        res.render(
            'edit.ejs',
            {
                coin:foundCoin
            }
        );
    }); 
}); 

//UPDATE ROUTE - PUT
app.put('/coin/:id', (req, res)=> {
    Coin.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data)=>{
        res.redirect('/coin'); 
    }); 
})





// LISTENER
app.listen(PORT, ()=>{
    console.log('listening....'); 
}); 

// CONNECT TO MONGO
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', ()=> {
    console.log('connected to mongoose!!')
})