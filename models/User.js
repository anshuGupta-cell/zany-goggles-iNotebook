const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const { modelName } = require('./Notes');

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  pasword: {
    type: String,
    require: true
  },
})

module.exports = mongoose.model('User', UserSchema);