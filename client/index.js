const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Grab env vars
const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const mongoDB   = process.env.MONGODB_DB;
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASS;

// Build the connection string
let mongoUri;
if (mongoUser && mongoPass) {
  mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
} else {
  mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;
}

console.log('Mongo URI:', mongoUri);

// Define seed data inline
const seedData = [
  { "_id": 1, "name": "apples",   "qty": 5, "rating": 3 },
  { "_id": 2, "name": "bananas",  "qty": 7, "rating": 1, "microsieverts": 0.1 },
  { "_id": 3, "name": "oranges",  "qty": 6, "rating": 2 },
  { "_id": 4, "name": "avocados", "qty": 3, "rating": 5 }
];

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');

    // Define the Fruit model here (so it's available after connect)
    const fruitSchema = new mongoose.Schema({
      name: String,
      qty: Number,
      rating: Number,
      microsieverts: Number
    });
    const Fruit = mongoose.model('Fruit', fruitSchema);

    // Check if the 'fruits' collection is empty; if so, insert seed data
    Fruit.estimatedDocumentCount()
      .then(count => {
        if (count === 0) {
          Fruit.insertMany(seedData)
            .then(inserted => {
              console.log(`Seeded ${inserted.length} fruits in the DB.`);
            })
            .catch(err => console.error('Error seeding data:', err));
        } else {
          console.log(`Fruits collection already has data (count = ${count}).`);
        }
      })
      .catch(err => console.error('Error counting documents:', err));
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define the Fruit model at top-level as well (so we can use it in routes directly)
const fruitSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rating: Number,
  microsieverts: Number
});
const Fruit = mongoose.model('Fruit', fruitSchema);

// Simple route to show how many apples
app.get('/', async (req, res) => {
  try {
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