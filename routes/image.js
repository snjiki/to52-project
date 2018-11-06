//import { Schema } from 'mongoose';

var express =  require('express');
var fs = require('fs');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    img: { data: Buffer, contentType: String }
});

var ItemImage = mongoose.model('ItemImage', schema);



/*
app.use(multer({ dest: '../../uploads/',
    rename: function (fieldname, filename) {
      return filename;
    },
   }));
*/

const router = express.Router();

router.post("/", upload.single('itemImage') , (req, res, next) => {
    //console.log(req.file);

    var myImage = new ItemImage;
    myImage.img.data = req.file.path;
    myImage.img.contentType = 'image/png';
    myImage.save(function (err, myImage) {
        if (err) {
            throw err;
            res.send(err);
        } 
        else{
            res.json({ message : 'Image Added' , data : myImage});
        }
        console.error('saved img to mongo');
  
    });

    /*
    var newItemImage = new ItemImage();
    newItemImage.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItemImage.img.contentType = 'image/png';
    newItem.save();    
    */

});

router.get("/", (req, res, next) => { 
    ItemImage.find(function (err, doc) {
        if (err) return next(err);
        res.contentType('image/png');
        res.send(doc);
    });
});

module.exports = router;