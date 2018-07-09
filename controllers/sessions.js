// CREATE SESSION CONTROLLER
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//CREATE SESSION NEW PAGE
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

//SESSION DELETE ROUTE
router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
})

//CREATE SESSION CREATE ROUTE
router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser)=>{
        if(req.body.password == foundUser.password){
            req.session.currentuser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});

module.exports = router;