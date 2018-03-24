var mongoose = require('./db'), 
    Schema = mongoose.Schema;
    
var PostSchema = new Schema({
    title: {type: String, required: true, unique : true, dropDups: true},
    body: {type: String, required: true},
    date: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Posts', PostSchema);