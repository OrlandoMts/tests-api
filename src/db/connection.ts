const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/raffle'; // Reemplaza con tu URI de MongoDB

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// useCreateIndex: true,

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

module.exports = db;
