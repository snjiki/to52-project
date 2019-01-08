//MOD_S_BG_rewrite-var > const 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//DEL_S_BG_rewrite use config instead of dotenv
//import dotenv from 'dotenv';
// const dotenv = require('dotenv')
//DEL_S_END_rewrite use config instead of dotenv

const router = express.Router();

//ADD_S_BG_rewrite use config instead of dotenv
const config = require('config');
//ADD_S_END_rewrite use config instead of dotenv

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


const Profile = require('./models/profile');
const Account = require('./models/account');
const Offer = require('./models/offer');

//import auth from './routes/auth';
const auth = require('./routes/auth');
const image = require('./routes/image');
const item = require('./routes/item');

//ADD_S_BG_register
const user = require('./routes/user');
//ADD_S_ED_register


//DEL_S_BG_rewrite use config instead of dotenv
//dotenv.config();
//DEL_S_END_rewrite use config instead of dotenv

const app = express();

//MOD_S_ED_rewrite-var > const 


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());





// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// var mongodb_service_host = process.env.MONGODB_SERVICE_HOST || '127.0.0.1';

var connectionString = process.env.MONGO_URL || 'mongodb://127.0.0.1/annonces_app';

/*
// Openshift MongoDB connection URL
if (process.env.MONGODB_SERVICE_HOST){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}
*/

// Connect to Mongoose
//ADD_S_BG_rewrite
mongoose.connect(connectionString)
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.error('Could not connect to MongoDB...'));
//ADD_S_ED_rewrite


//var db = mongoose.connection;

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/api/profiles', function (req, res) {
    Profile.getProfiles(function (err, profiles) {
        if (err) {
            res.send(err);
        }
        res.json(profiles);
    });
});




//ADD_S_BG_register

/* *** Sign in  *** */
app.use('/api/user', user);

//ADD_S_ED_register


/* *** Authentification  *** */

app.use("/api/auth", auth);

/* *** Image Upload  *** */
app.use("/api/image", image);


/* *** Item APIs *** */
app.use("/api/item", item);

/* *** Create a new Account *** */

// DEL_S_BG_rewrite
// // Create a new route
// var accountsRoute = router.route('/accounts');

// accountsRoute.post(function(req, res){

//     // Create a new instance Account
//     var account = new Account() ;
//     account.email = req.body.email;
//     account.password = req.body.password;

//     //Save the account
//     account.save(function(err) {
//         if (err)
//             res.send(err);
//         res.json({ message : 'Account added' , data : account});
//     });
// });

// /* *** Get all Accounts *** */
// accountsRoute.get(function (req , res){
//     Account.find(function (err, accounts){
//         if(err) {
//            res.send(err) ;
//         }
//         res.json(accounts)
//     });
// });

// /* *** Get one Account *** */
// var accountRoute = router.route('/accounts/:account_id');

// accountRoute.get(function(req, res){

//     Account.findById(req.params.account_id, function(err, account) {
//         if (err)
//             res.send(err);
//         res.json(account);
//     });
// });

// /* *** Update Account *** */

// accountRoute.put(function (req,res) {
//     Account.findById(req.params.account_id,function(err, account){
//         if (err)
//             res.send(err);
//         account.password = req.body.password;

//         account.save(function(err){
//             if(err)
//                 res.send(err);
//             res.json(account);
//         });
//     });
// });

// accountRoute.delete(function(req, res){

//     Account.findByIdAndRemove(res.params.account_id , function(err) {
//         if(err)
//             res.send(err);
//         res.json({ message: 'Account removed '});
//     });
// });
// DEL_S_BG_rewrite

/* *** Create new Offer *** */

// Create a new route
var offersRoute = router.route('/offers');

offersRoute.post(function (req, res) {

    // Create a new instance Offer
    var offer = new Offer();
    offer.name = req.body.name;
    offer.price = req.body.price;
    offer.picture = req.body.picture;
    offer.creation_Date = req.body.creation_Date;

    //Save the offer

    offer.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Offer added', data: offer });
    });
});

/* *** Get all Offers *** */
offersRoute.get(function (req, res) {
    Offer.find(function (err, offers) {
        if (err) {
            res.send(err);
        }
        res.json(offers)
    });
});

/* *** Get one Offer *** */
var offerRoute = router.route('/offers/:offer_id');

offerRoute.get(function (req, res) {

    Offer.findById(req.params.offer_id, function (err, offer) {
        if (err)
            res.send(err);
        res.json(offer);
    });
});

/* *** Update Offer *** */

offerRoute.put(function (req, res) {
    Offer.findById(req.params.offer_id, function (err, offer) {
        if (err)
            res.send(err);
        offer.name = req.body.name;
        offer.price = req.body.price;
        offer.picture = req.body.picture;
        offer.creation_Date = req.body.creation_Date;

        offer.save(function (err) {
            if (err)
                res.send(err);
            res.json(offer);
        });
    });
});

offerRoute.delete(function (req, res) {

    Account.findByIdAndRemove(res.params.offer_id, function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Offer removed ' });
    });
});




/*
// TO DELETE
app.get('/process', function (req, res) {
    res.json(process.env);
});
*/


//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//var server_port = process.env.API_BACKEND_SERVICE_PORT || 3000;

//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var server_ip_address = process.env.API_BACKEND_SERVICE_HOST || '127.0.0.1';

var server_port = 8080;

/*
if (process.env.API_BACKEND_SERVICE_PORT) {
    // Si on est sur le cloud OpenShift
    server_ip_address = '0.0.0.0';
    server_port = 8080;
}*/

if (process.env.PORT) {
    server_port = process.env.PORT;
}
else {
    // si on est en local
    var server_ip_address = '127.0.0.1';
    server_port = 8080;
}

app.listen(server_port, function () {

    console.log("Listening on server_port " + server_port);

});