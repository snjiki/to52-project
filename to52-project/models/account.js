var mongoose = require ('mongoose');
//var validator = require('validator');

var AccountSchema = new mongoose.Schema({
    email: {

        required: true,
        type: String,
        trim: true,
        minlegth: 1,
        unique: true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: '{VALUE} is not a valid email'
        // }
    },
    password: {
        type : String,
        require: true,
        minlegth: 6
    },

});

module.exports = mongoose.model('Account', AccountSchema);
