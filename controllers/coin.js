//EXPRESS
const express = require('express'); 
const router = express.Router(); 
const Coin = require('../models/coins.js'); 



// ROUTES

// SEED ROUTE
router.get('/seed', (req, res)=>{
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
            "info": "Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference. In the Ethereum protocol and blockchain there is a price for each operation. ", 
            "exchange": "https://www.coinbase.com/",
            "notes": " " 
        },
        {
            "coin": "Litecoin",
            "symbol": "LTC",
            "info": "Litecoin LTC - provides faster transaction confirmations (2.5 minutes on average) and uses a memory-hard, scrypt-based mining proof-of-work algorithm to target the regular computers and GPUs most people already have - which are its main differentials to Bitcoin. ", 
            "exchange": "https://www.coinbase.com/", 
            "notes": " "  
        },
        {
            "coin": "Ripple",
            "symbol": "XRP",
            "info": " ", 
            "exchange": " ",
            "notes": " " 
        }, 
        {
            "coin": "Bitcoin Cash", 
            "symbol": "BCH",
            "info": " ", 
            "exchange": " ",
            "notes": " "  
        },
        {
            "coin": "Ethereum Classic",
            "symbol": "ETC",
            "info": " ", 
            "exchange": " ",
            "notes": " " 
        },
        {
            "coin": "Monero", 
            "symbol": "XMR",
            "info": " ", 
            "exchange": " ",
            "notes": " "  
        },
        {
            "coin": "Stellar", 
            "symbol": "XLM",
            "info": " ", 
            "exchange": " ",
            "notes": " " 
        },
        {
            "coin": "Dash",
            "symbol": "DASH",
            "info": " ", 
            "exchange": " ",
            "notes": " " 
        },
        {
            "coin": "Decred", 
            "symbol": "DCR",
            "info": " ", 
            "exchange": " ",
            "notes": " " 
        },

    ], (err, data)=>{
        res.redirect('/coin');
    })
});

// //SEED 
// // Coin.create( coinSeed, (err, data) => {
// //     if (err) console.log (err.message)
// //     console.log('added coin seed data')
// // }); 

//CREATE NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('new.ejs'); 
}); 

//CREATE ROUTE
router.post('/', (req, res)=>{
    Coin.create(req.body, (err, createdCoin)=>{
        res.redirect('/coin'); 
    }); 
});

//INDEX ROUTE
router.get('/', (req, res)=>{
    Coin.find({}, (err, allCoin)=>{
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            coin: allCoin
        }); 
    }); 
}); 

//SHOW ROUTE
router.get('/:id', (req, res)=>{
    Coin.findById(req.params.id, (err, foundCoin)=>{
        console.log(foundCoin)
        res.render('show.ejs', {
            currentUser: req.session.currentUser, 
            coin:foundCoin
        });
    });
});

// //TESTING API ///
// router.get('/:id', (req, res) => {
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
router.delete('/:id', (req, res)=>{
    Coin.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/coin'); 
    }); 
}); 

//EDIT ROUTE
router.get('/:id/edit', (req, res)=>{
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
router.put('/:id', (req, res)=> {
    Coin.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data)=>{
        res.redirect('/coin'); 
    }); 
})

module.exports = router




