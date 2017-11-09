const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
});

const Department = mongoose.model('Department', schema);

module.exports = Department;
