const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Middleware to render EJS components in HTML files
app.engine('html', (filePath, options, callback) => {
    ejs.renderFile(filePath, options, callback);
});

app.set('views', __dirname); // Point to the `code` folder for HTML/EJS files
app.set('view engine', 'html'); // Use `.html` as the extension

// Serve home page with navbar and search bar
// app.get('/', (req, res) => {
//     res.render('arena.html', {
//         navbar: 'navbar.ejs',
//         search: 'search.ejs'
//     });
// });

// Serve another static page with reusable components
app.get('/prac', (req, res) => {
    res.render('prac.html', {
        navbar: 'navbar.ejs',
        search: 'search.ejs'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
