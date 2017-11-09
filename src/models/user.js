const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: Boolean,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
});

const User = mongoose.model('User', schema);

module.exports = User;
