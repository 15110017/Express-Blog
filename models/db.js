var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express');

module.exports = mongoose;