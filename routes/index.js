const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => { res.render('welcome') })    // welcome ejs
router.get('/dashboard', ensureAuthenticated, (req, res) => { res.render('dashboard', { user: req.user }) })  // dashboard ejs  


module.exports = router