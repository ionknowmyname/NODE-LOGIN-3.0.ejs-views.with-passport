const mongoose = require('mongoose')
const Schema  = mongoose.Schema

   
const userSchema  = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone:  {type: String },
    password: { type: String, required: true }
}, { timestamps: true })


// custom validation for email

/* 

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // standard RFC 5322 email Regex   // can google search it
    return emailRegex.test(val);
}, 'Invalid E-mail.');

*/




const User = mongoose.model("User", userSchema)
module.exports = User