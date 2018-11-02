var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_name: {type: String ,required: true, max: 100},
    contact: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});

exports.user = mongoose.model('User', userSchema);