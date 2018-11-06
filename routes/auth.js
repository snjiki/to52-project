var express =  require('express');
var User =  require('../models/user');
var jwt =  require('jsonwebtoken');


const router = express.Router();

// Login API
router.post("/", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
      if (user && user.isValidPassword(credentials.password)) {
        userRes = user.toAuthJSON();
        user.token = userRes.token;
        user.save();
        res.json({ user: userRes });
      } else {
        res.status(400).json({ errors: { global: "Invalid credentials" } });
      }
    });
  });

module.exports = router;