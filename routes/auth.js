var express =  require('express');
var User =  require('../models/user');
var jwt =  require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');



const router = express.Router();




//DEL_S_BG_rewrite

// // Login API
// router.post("/", (req, res) => {
//     const { credentials } = req.body;
//     User.findOne({ email: credentials.email }).then(user => {
//       if (user && user.isValidPassword(credentials.password)) {
//         //userRes = user.toAuthJSON();
//         user.token = userRes.token;
//         user.save();
//         res.json({ user: userRes });
//       } else {
//         res.status(400).json({ errors: { global: "Invalid credentials" } });
//       }
//     });
//   });

//DEL_S_BG_rewrite


// Login API

//MOD_S_BG_rewrite
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //check email 
  let user = await User.findOne({ email:req.body.email });
  if (!user) return res.status(400).send('Email or password invalid');

  //check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Email or password invalid');

  const token = user.generateJWT();
  res.send(token);
});


function validate(user) {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).required()
  };

  return Joi.validate(user, schema);
}

//MOD_S_ED_rewrite



module.exports = router;
