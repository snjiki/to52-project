const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String
  },
  price: String,
  currency: String,
  negotiable: Boolean,
  condition: String,
  publicationDate: Date,
  isbnNo: String,
  description: String,
  email: String,
  address: {
    houseNo: String,
    city: String,
    country: String,
    Department: String,
    street: String,
    pinCode: String
  },
  tradeQueries: Array,
  bought: Boolean
});

module.exports = mongoose.model('Item', Item);
