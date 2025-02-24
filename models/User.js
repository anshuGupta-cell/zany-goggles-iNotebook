const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const { modelName } = require('./Note');

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    uniqe: true
  },
  password: {
    type: String,
    require: true,
    selected: true
  },
})

module.exports = mongoose.model('User', UserSchema);