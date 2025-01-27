const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// 1. Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 3. Grab Environment Variables with Defaults
const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const mongoDB   = process.env.MONGODB_DB;
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASS; // Replace securely

// 4. Build the Connection String with Proper Encoding
let mongoUri;
if (mongoUser && mongoPass) {
  // Encode the password to handle special characters
  const encodedPass = encodeURIComponent(mongoPass);
  mongoUri = `mongodb://${mongoUser}:${encodedPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
} else {
  mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;
}

console.log('Mongo URI:', mongoUri);

// 5. Define Seed Data Inline (Without `_id`)
const seedData = [
  { "name": "apples",   "qty": 5,  "rating": 3 },
  { "name": "bananas",  "qty": 7,  "rating": 1, "microsieverts": 0.1 },
  { "name": "oranges",  "qty": 6,  "rating": 2 },
  { "name": "avocados", "qty": 3,  "rating": 5 }
];

// 6. Define the Schema and Model Once at the Top Level
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  qty: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  microsieverts: { type: Number, default: 0, min: 0 }
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// 7. Handle Deprecation Warning by Setting `strictQuery`
mongoose.set('strictQuery', true); // Set to false if preferred

// 8. Connect to MongoDB and Seed if Collection is Empty
mongoose.connect(mongoUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(async () => {
    console.log('Connected to MongoDB!');

    try {
      // Check if the 'fruits' collection is empty
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

// 9. Define the Route to Display Number of Apples
app.get('/', async (req, res) => {
  try {
    const apples = await Fruit.findOne({ name: 'apples' });
    const count = apples ? apples.qty : 0;
    const fruits = await Fruit.find(); // Fetch all fruits
    res.render('index', { count, fruits });
  } catch (error) {
    console.error('Error fetching apples:', error);
    res.status(500).send('Error fetching data.');
  }
});

// 10. Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node app listening on port ${PORT}`);
});