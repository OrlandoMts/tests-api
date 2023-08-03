export const mongooseDB = require('mongoose');

const schema = new mongooseDB.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const ModelUser = mongooseDB.model('ModelUser', schema);

module.exports = ModelUser;
