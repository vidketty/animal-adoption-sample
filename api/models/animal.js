const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Animal
let Animal = new Schema({
  name: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'guinea pig'],
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoptedAt: {
    type: Date
  },
  avatar: {
    type: String,
    default: ''
  },
  added: {
    type: Date,
    default: new Date()
  }
}, {
    collection: 'animal'
  });

module.exports = mongoose.model('animal', Animal);