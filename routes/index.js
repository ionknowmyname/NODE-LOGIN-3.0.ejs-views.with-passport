const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const User =  require("../models/Users")

router.get('/', (req, res) => { res.render('welcome') })    // welcome ejs

router.get('/dashboard', ensureAuthenticated, (req, res) => { 
    res.render('dashboard', { user: req.user })    // dashboard ejs  
}) 



////////////// DISPLAY EMPLOYEES /////////////////////////
router.get('/employees', ensureAuthenticated, (req, res) => { 
    // res.render('employees', { user: req.user })    // employees ejs 
    
    User.find((err, docs) => {
        if(!err){
            //  console.log(docs);
            res.render('employees', { list: docs });   
        }else{
            console.log("Error in retrieving Employee list from DB: " + err);
        }
    });
}) 
/////////////////////////////////////////////////////////


////////////// UPDATE EMPLOYEES /////////////////////////
router.get('/users/register/:id', (req, res) => {  
    // console.log(req.params.id);
    User.findById({_id: req.params.id}, (err, docs) => {
        if(!err){
            res.render("edit", { list: docs });    // edit.ejs        
        }
    }); 
})

router.put('/users/register/:id', (req, res) => {   
    // console.log(req.params.id);
    User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, docs) => {
        if(!err){
            console.log("Updated Successfully");
            console.log(docs);
            res.redirect('/employees');      // employees.ejs        
        }else{
            console.log("Error in updating Employee: " + err);
        }
    }); 
})
///////////////////////////////////////////////////////////////



///////////////// DELETE EMPLOYEES ////////////////////
router.delete('/delete/:id', ensureAuthenticated, (req, res) => {  //  '/delete/:id'   // prally should be a post request
    //console.log(req);
    // console.log(req.params.id);
    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect('/employees');       // employees GET route  
            console.log(docs);   // deleted entry

            // res.render("/employees", { list: docs }); 
            // res.status(200).send("User: "+ docs.name +" was deleted."); 
        }else{
            console.log("Error in Employee deletion: " + err);
        }
    });  
})
///////////////////////////////////////////////////





module.exports = router