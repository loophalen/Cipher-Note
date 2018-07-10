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
        res.redirect('/coin');
    });
})

//CREATE SESSION CREATE ROUTE
router.post('/', (req, res) => {
    console.log(req.body); 
    User.findOne({ username: req.body.username }, (err, foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.redirect('/coin');
        } else {
            res.send('wrong password');
        }
    });
});

module.exports = router;