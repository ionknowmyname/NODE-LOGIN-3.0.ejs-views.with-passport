// ensure you cannot get to dashboard if you are not logged in


module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()) {
            return next()
        }

        req.flash('success_msg', 'Please login to view this page')
        res.redirect('/users/login')
    }
}