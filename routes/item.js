var express =  require('express');
var Item =  require('../models/item');

const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './uploads/');
        },
     filename: function (req, file, cb) {
        var originalname = file.originalname;
        var extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, filename);
      }
    });



var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

// Storing a new Item in the database
router.post("/",multer({storage: storage, dest: './uploads/'}).single('itemImage'), (req, res, next) => {
    var item = new Item;
    item.name = req.body.name;
    item.price = req.body.price;
    item.currency = req.body.currency;
    item.negotiable = req.body.negotiable;
    item.email = req.body.email;
    //item.condition = req.body.condition;
    //item.publicationDate = req.body.publicationDate;
    //item.isbnNo = req.body.isbnNo;
    item.description = req.body.description;
    //item.bought = req.body.bought;
    item.image.data = req.file.buffer;
    item.image.contentType = req.file.mimetype;


    item.save(function (err, item) {
        if (err) {
            throw err;
            res.send({ message: "error while adding item ", data: err });
        } 
        else{
            res.json({ message : 'Item Added'});
        }
        console.error('saved item to mongo');
    });

});

router.get("/delete/:id",function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id},
        function(err, serverport){
            if(err) res.json(err);
            else res.json('Item removed');
        });
});


router.get("/myItems/:email", (req, res) => {

        Item.find({}, function (err, items) {
            var itemMap = {};
            items.forEach(item => {
               if (item.email === req.params.email) {
                    itemMap[item._id] = item;
                }
            });
            res.send(itemMap);
        });
});


// getting all Items from the database
router.get("/all", (req, res) => {
    console.log("router at get /item/all");

    Item.find({}, function(err, items) {
        console.log("start finding items");

        var itemMap = {};

        items.forEach(item => {
                itemMap[item._id] = item;
        });
        res.send(itemMap);
    });
});

module.exports = router;