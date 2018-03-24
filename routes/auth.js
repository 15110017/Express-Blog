var Users = require('../models/Users');
module.exports = function isAuthorized (req, res, next){
    if (req.session.user == null || !req.session.user){
        res.redirect('/users/login')
    }
    Users.findById(req.session.user._id, (err, user) => {
        if (err) return next(err);
        return next()
    })
}