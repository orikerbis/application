const express = require('express');
const mongoose = require('mongoose');

const app = express();

// 1. Grab env vars
const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const mongoDB   = process.env.MONGODB_DB;
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASS;

// 2. Build the connection string
let mongoUri;
if (mongoUser && mongoPass) {
  mongoUri = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
} else {
  mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;
}

console.log('Mongo URI:', mongoUri);

// 3. Define seed data inline
const seedData = [
  { "_id": 1, "name": "apples",   "qty": 5,  "rating": 3 },
  { "_id": 2, "name": "bananas",  "qty": 7,  "rating": 1, "microsieverts": 0.1 },
  { "_id": 3, "name": "oranges",  "qty": 6,  "rating": 2 },
  { "_id": 4, "name": "avocados", "qty": 3,  "rating": 5 }
];

// 4. Define the schema/model ONCE at the top level
const fruitSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rating: Number,
  microsieverts: Number
});
const Fruit = mongoose.model('Fruit', fruitSchema);

// 5. Connect to MongoDB and seed if empty
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB!');

    try {
      // Check if 'fruits' collection is empty
      const count = await Fruit.estimatedDocumentCount();
      if (count === 0) {
        const inserted = await Fruit.insertMany(seedData);
        console.log(`Seeded ${inserted.length} fruits in the DB.`);
      } else {
        console.log(`Fruits collection already has data (count = ${count}).`);
      }
    } catch (err) {
      console.error('Error during seeding:', err);
    }
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// 6. Simple route to show how many apples
app.get('/', async (req, res) => {
  try {
    const apples = await Fruit.findOne({ name: 'apples' });
    const count = apples ? apples.qty : 0;
    res.send(`
      <h1>Hello World with a little apples :)</h1>
      <p>Number of apples in DB: <strong>${count}</strong></p>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data.');
  }
});

// 7. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node app listening on port ${PORT}`);
});