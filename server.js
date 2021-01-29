const express = require("express");
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");   // bodyparser now included in express
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport  = require("passport");

const IndexRoute = require('./routes/index')
const UsersRoute = require('./routes/users')



////////////////////  MongoDB Connection ////////////////////////
mongoose.connect('mongodb://localhost:27017/LoginDB', {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if (!err) {
       console.log("MongoDB connection success"); 
    }else{
        console.log("Error in DB Connection: " + err);
    }
});
//////////////////////////////////////////////////////////////////

const app = express();


////// EJS  SETUP  ///////
app.use(expressLayouts);
app.set('view engine', 'ejs');
//////////////////////////

//////////// Bodyparser middleware //////////////
app.use(express.urlencoded({ extended: true }));   
/////////////////////////////////////////////////


///// EXPRESS-SESSION middleware ////
app.use(session({
    secret: 'secret',   // can be anything
    resave: true,
    saveUninitialized: true
}))
///////////////////////////////////////////////

/////////// PASSPORT middleware   /////////////////
require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());
// Important where you put this, so put after express session
////////////////////////////////////////////////////

//// FLASH middleware ////
app.use(flash());
//////////////////////////

/////////////// setting Global Variables ///////////////////
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');  // success_msg is the variable name
    res.locals.error_msg = req.flash('error_msg'); 
    res.locals.error = req.flash('error');    // flash for passport error
    next();
});
///////////////////////////////////////////////////////////



app.use('/', IndexRoute)      // routes should be after bodyparser
app.use('/users', UsersRoute)

 


//////////////////// Server start //////////////////
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{ 
    console.log(`server started on port ${PORT}`); 
});
/////////////////////////////////////////////////////