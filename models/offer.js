var mongoose = require ('mongoose');
//var validator = require('validator');

var OfferSchema = new mongoose.Schema({

    name : {
        type : String ,
        require: true,
    },
    creation_Date : {
        type : Date ,
        require : true ,
    },
    price : {
        type : Number,
        require : true ,
    },
    picture : {
        data: Buffer,
        contentType: String ,
    }
});

module.exports = mongoose.model('Offer', OfferSchema);