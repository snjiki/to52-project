//ADD_S_BG_register

var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

//MOD_S_BG_rewrite

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    //unique: true,
    maxlength: 255
  },
  userName: {
      type: String,
      unique: true,
      required: true,
      maxlength: 30
      // trim: true
  },    
  password: {
      type : String,
      require: true,
      minlegth: 6
  },
  date: {
      type: Date,
      default: Date.now
  },
//ADD_S_BG_admin
  isAdmin: {
    type: Boolean,
    default: false
  }
//ADD_S_ED_admin
});

//MOD_S_ED_rewrite



userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

//userSchema.methods.generateAuthToken = function() { ... }
//change to function belong

userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
//DEL_S_BG_rewrite
      //email: this.email,
//DEL_S_ED_rewrite
      _id: this._id, 
      isAdmin: this.isAdmin
    },
//ADD_S_BG_rewrite
    config.get('jwtPrivateKey')
//ADD_S_ED_rewrite

//DEL_S_BG_rewrite
    //process.env.JWT_SECRET
//DEL_S_ED_rewrite
  );
};

// function validateUser(user) {
//   const schema = {
//     email: Joi.string().max(255).required().email(),
//     userName: Joi.string().max(30).required(),
//     password: Joi.string().min(6).required()
//   }
//   return Joi.validate(user, schema);
// }

const User = mongoose.model('User', userSchema);

exports.User = User; 
//exports.validateUser = validateUser;

module.exports = mongoose.model('User', userSchema);


//ADD_S_ED_register
