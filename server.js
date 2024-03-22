// server.js

// Import required modules
const express = require('express');
const path = require('path');


// Create an Express application
const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');
// Specify the directory where your Pug templates are located
app.set('views', path.join(__dirname, 'view'));

// Define custom middleware to set headers for GET requests
app.get('/', function (req, res) {
    //HERE Calc Counter offer or send preferences
    //MUST STORE RELEVANT DATA FOR CLIENT SESSION/DEVICE in a DB
    // Set custom header
    res.set("X-Custom", "HeaderValue");

    // Send the index.html file
    //res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
    //res.render(path.__dirname, 'public', 'index.pug', {X:false})
    res.render('index', { genericAd: true });
});

//random other test URL
app.get('/personalizedAds/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexPersonalizedAd.html'));
});

// Serve static files from the 'public' directory -> Pictures
// Must be the last item so that headers can be customized in the .get
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
