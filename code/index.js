const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname, '../')));

// Route for Home Page
app.get('/', (req, res) => {
    res.render('home', { page: 'home.html' });
});

// Route for Workout Page
app.get('/workout', (req, res) => {
    res.render('home', { page: 'workout.html' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
