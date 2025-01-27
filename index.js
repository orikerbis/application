const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Environment variable set in docker-compose
const mongoUri = process.env.MONGO_URI;

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
    res.send(`<h1>Hello World with a little apples :)</h1><p>Number of apples in DB: <strong>${count}</strong></p>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node app listening on port ${PORT}`);
});