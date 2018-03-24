var mongoose = require('./db'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {type: String, required: true, unique : true, dropDups: true},
    email: {type: String, required: true},
    password: {type: String}
});
UserSchema.pre('save', function (next) {
    var user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return console.log(err);
        user.password = hash;
        next();
    }); 
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};


module.exports = mongoose.model('Users', UserSchema);