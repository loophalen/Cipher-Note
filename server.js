//EXPRESS
const express = require('express'); 
const app = express(); 
//RETURN HEROKU OR LOCAL 3000
const PORT = process.env.PORT || 3000;
// MONGOOSE DATABASE
const mongoose = require('mongoose'); 
//HEROKU PORT
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

// ROUTES

//CREATE ROUTE
app.get('/coin/new', (req, res)=>{
    res.render('new.ejs'); 
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