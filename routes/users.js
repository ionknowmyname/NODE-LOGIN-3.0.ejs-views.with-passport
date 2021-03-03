const express = require("express")
const router = express.Router()
const bcrypt =  require("bcryptjs")
const passport  = require("passport");
const User =  require("../models/Users")   


router.get('/register', (req, res) => { res.render('register') })  // register.ejs
router.get('/login', (req, res) => { res.render('login') })   // login.ejs


// Register
router.post('/register', (req, res) => {
    console.log(req.body)

    const { name, email, phone, password, password2 } = req.body     
    let errors = [];

    if (!name || !email || !password || !password2 ) {
        errors.push({ msg: 'Please enter all required fields' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    if (errors.length > 0) {
        //console.log(errors)
        res.render('register', { errors, name, email, phone, password, password2 });  // register.ejs
    }else{
        // check if email already in DB
        User.findOne({ email: email }).then(user => {         // email in DB: email from req.body
            if (user) {       // if user is found
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors, name, email, phone, password, password2 });
            } else {
                // encrypt password & submit, return any error
                bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                    if(err){ errors.push({ msg: err }) }   // try throw err;

                    let user = new User({
                        name,  // coz its same as name: name; ES6 syntax
                        email, // email: email; no need for (email: req.body.email) coz const email was already declared with req.body
                        phone,
                        password: hashedPass
                    })
                    user.save()
                    .then(user => {
                        // console.log(req.body)
                        console.log('User added Sucessfully')
                        req.flash('success_msg', 'Successfully Registered, go to login');
                        res.redirect('/users/login')
                    })
                    .catch(err => { console.log(err) })
                    //res.json({ message: 'An error occured' })        
                })              
            }
        });
    }


    
}) 


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',  // dashboard.ejs
        failureRedirect: '/users/login', // login GET request
        failureFlash: true
    })(req, res, next);
})


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

  


module.exports = router