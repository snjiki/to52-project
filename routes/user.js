//ADD_S_BG_register

const auth = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
//const {User, validateUser} = require('../models/user');
const User = require('../models/user');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');



// Register API  
// router.post("/", async (req, res) => {

//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//     const { credentials } = req.body;
//     User.create({ email: credentials.email }).then(user => {
//       if (req.body.email &&
//         req.body.username &&
//         req.body.password &&
//         req.body.passwordConf) {
//         //req.body.password == req.body.passwordConf // vérification mdp 2x à cote de font end ???
//         var userData = {
//           email: req.body.email,
//           username: req.body.username,
//           password: req.body.password,
//           //passwordConf: req.body.passwordConf,
//         }




//         //use schema.create to insert data into the db
//         User.create(userData, (err, user) => {
//           if (err) {
//             return next(err)
//           } else {
//             return res.redirect('/api/users');
//           }
//         });
//       }
//     });
//   });  
//ADD_S_ED_register

router.get('/monCompte', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//ADD_S_ED_register


router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already registered.');

  user = new User(_.pick(req.body, ['email', 'userName', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  console.log(`User : ${user.userName} registered successfully.`);

  //res.send(true);
  const token = user.generateJWT();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'userName', 'email']));
  console.log(token);



});



function validateUser(user) {
  const schema = {
    email: Joi.string().max(255).required().email(),
    userName: Joi.string().max(30).required(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(user, schema);
}




// function generateJWT(req, res, next) {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).send('Access denied. No token provided.');

//     try {
//       const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
//       req.user = decoded; 
//       next();
//     }
//     catch (ex) {
//       res.status(400).send('Invalid token.');
//     }
//   }


module.exports = router;
