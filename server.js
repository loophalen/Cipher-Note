//EXPRESS
const express = require('express'); 
const app = express(); 
const session = require('express-session');
//RETURN HEROKU OR LOCAL 3000
const PORT = process.env.PORT || 3000;
// MONGOOSE DATABASE
const mongoose = require('mongoose'); 
//REQUIRE MODELS
// const Coin = require('./models/coins.js'); 
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
    secret: "tothemoonordoom", 
    resave: false,
    saveUninitialized: false
})); 

//CONTROLLERS
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
const coinController = require('./controllers/coin.js');
app.use('/coin', coinController);

//LOGIN 
app.get('/coin', (req, res)=>{
    res.render('index.ejs', {
        coin: [], 
        currentUser: req.session.currentUser || {username: 'xxxxxx'}
    }); 
}); 

//Create Custom Message for Logged In Users on Index Page
app.get('/coin', (req, res)=>{
    console.log(req.session)
    res.render('index.ejs', {
        coin: [], 
        currentUser: req.session.currentUser
    });
});

// Disallow Users Not Logged In From Special Page
app.get('/coin', (req, res)=>{
    if(req.session.currentuser){
        res.send('create coin');
    } else {
        res.redirect('/sessions/new');
    }
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