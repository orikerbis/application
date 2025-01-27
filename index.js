const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Grab env vars (with defaults or empty strings if not provided)
const mongoHost = process.env.MONGODB_HOST || 'localhost';
const mongoPort = process.env.MONGODB_PORT || '27017';
const mongoDB   = process.env.MONGODB_DB   || 'myfruitsdb';
const mongoUser = process.env.MONGODB_USER || '';
const mongoPass = process.env.MONGODB_PASS || '';

// Build the connection string
// If you have credentials, embed them in the URI; otherwise just skip user/pass.
let mongoUri;
if (mongoUser && mongoPass) {
  mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
} else {
  mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;
}

console.log('Mongo URI:', mongoUri);

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define a Fruit model (just for reading/writing the data)
const fruitSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rating: Number,
  microsieverts: Number
});

const Fruit = mongoose.model('Fruit', fruitSchema);

app.get('/', async (req, res) => {
  try {
    // Query the DB for apples
    const apples = await Fruit.findOne({ name: 'apples' });
    const count = apples ? apples.qty : 0;
    res.send(`<h1>Hello World with a little apples :)</h1>
      <p>Number of apples in DB: <strong>${count}</strong></p>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node app listening on port ${PORT}`);
});