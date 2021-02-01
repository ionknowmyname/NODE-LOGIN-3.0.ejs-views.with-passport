const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const User =  require("../models/Users")

router.get('/', (req, res) => { res.render('welcome') })    // welcome ejs

router.get('/dashboard', ensureAuthenticated, (req, res) => { 
    res.render('dashboard', { user: req.user })    // dashboard ejs  
}) 

////// DISPLAY EMPLOYEES //////
router.get('/employees', ensureAuthenticated, (req, res) => { 
    // res.render('employees', { user: req.user })    // employees ejs 
    
    User.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.render('employees', { list: docs });   
        }else{
            console.log("Error in retrieving Employee list from DB: " + err);
        }
    });
}) 

//////// DELETE EMPLOYEES //////////
router.get('/delete/', ensureAuthenticated, (req, res) => {  //  '/delete/:id'
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employees');       // employees GET route    
        }else{
            console.log("Error in Employee deletion: " + err);
        }
    });
})


router.get("/employees/:id", (req, res) => {
    User.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("/employees", { list: docs });    // employees.ejs        
        }
    });
});





module.exports = router