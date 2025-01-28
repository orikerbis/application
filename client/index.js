const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// 1. Set EJS as the templating engine
app.set('view engine', 'ejs');

// 2. Specify the views directory
app.set('views', path.join(__dirname, 'views'));

// 3. Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 4. Grab Environment Variables with Defaults
const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const mongoDB   = process.env.MONGODB_DB;
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASS; // Replace securely

// 5. Build the Connection String with Proper Encoding
// Construct the MongoDB URI without conditionals and without encoding the password
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
console.log('Mongo URI:', mongoUri);



// 6. Define Seed Data Inline (Without `_id`)
const seedData = [
  { "name": "apples",   "qty": 5,  "rating": 3 },
  { "name": "bananas",  "qty": 7,  "rating": 1, "microsieverts": 0.1 },
  { "name": "oranges",  "qty": 6,  "rating": 2 },
  { "name": "avocados", "qty": 3,  "rating": 5 }
];

// 7. Define the Schema and Model Once at the Top Level
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  qty: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  microsieverts: { type: Number, default: 0, min: 0 }
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// 8. Handle Deprecation Warning by Setting `strictQuery`
mongoose.set('strictQuery', true); // Set to false if preferred

// 9. Connect to MongoDB and Seed if Collection is Empty
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

// 10. Define the Route to Display Only the Apple Count
app.get('/', async (req, res) => {
  try {
    const apples = await Fruit.findOne({ name: 'apples' });
    const count = apples ? apples.qty : 0;
    res.render('index', { count });
  } catch (error) {
    console.error('Error fetching apples:', error);
    res.status(500).send('Error fetching data.');
  }
});

// 11. Start the Server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for testing
module.exports = app;