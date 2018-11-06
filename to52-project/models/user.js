/*
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// TODO: add uniqueness and email validations to email field
const schema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
      },
      passwordHash: { type: String, required: true },
      confirmed: { type: Boolean, default: false },
      token: { type: String, default: "", unique: true },
      confirmationToken: { type: String, default: "" },
    },
    { timestamps: true }
  );
  
  schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  };

  schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
      {
        email: this.email,
      },
      process.env.JWT_SECRET
    );
  };

  schema.methods.toAuthJSON = function toAuthJSON() {
    return {
      email: this.email,
      confirmed: this.confirmed,
      token: this.generateJWT()
    };
  };


//export default mongoose.model('User',schema)
module.exports = mongoose.model('User', schema);