const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (ensure you've set your DB URI correctly)
mongoose.connect('mongodb://localhost:27017/bmi_calculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for storing BMI records
const bmiSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  age: Number,
  bmi: Number,
  result: String,
});

// Create a model based on the schema
const BmiRecord = mongoose.model('BmiRecord', bmiSchema);

// Serve static files (if any, e.g., images, videos)
app.use(express.static(path.join(__dirname, 'code')));

// API endpoint to calculate BMI and save to MongoDB
app.post('/api/bmi', async (req, res) => {
  const { weight, height, age } = req.body;

  if (weight && height) {
    const bmi = (weight / Math.pow(height, 2)).toFixed(2);
    let result = '';

    if (bmi < 18.5) result = 'Underweight';
    else if (bmi >= 18.5 && bmi <= 24.9) result = 'Normal weight';
    else if (bmi >= 25 && bmi <= 29.9) result = 'Overweight';
    else result = 'Obese';

    // Create and save the record
    const newRecord = new BmiRecord({ weight, height, age, bmi, result });
    await newRecord.save();

    res.json({ success: true, bmi, result });
  } else {
    res.status(400).json({ success: false, message: 'Invalid input' });
  }
});

// API endpoint to get previous BMI records
app.get('/api/bmi', async (req, res) => {
  const records = await BmiRecord.find();
  res.json(records);
});

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
