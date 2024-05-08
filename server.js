import express from 'express';
import path, { dirname } from 'path';
import { uiConfigs, responseHeaders, expectedHeaders } from './responses.js';
import { fileURLToPath } from 'url';

// Create an Express application
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// Because its just a mock, i allow this service to have a state
// The state is managed in this counter and can be reset with ./reset/
let count = 0;

// Set the view engine to Pug
app.set('view engine', 'pug');
// Specify the directory where your Pug templates are located
app.set('views', path.join(__dirname, 'view'));

// Define custom middleware to set headers for GET requests
app.get('/', function (req, res) {
    // SET HEADER (mock actual offer calculation etc.)
    const adpcHeader = req.headers['adpc']

    console.log('RECEIVED: ', adpcHeader);

    if (adpcHeader) {
        if (!(adpcHeader === expectedHeaders[count])) {
            console.log("Should have received ; ", expectedHeaders[count])
            throw Error("INTEGRATION TEST: received wrong header. Should have received: ")
        }

        console.log('SENT: ', responseHeaders[count].toString())

        res.set("ADPC", responseHeaders[count]);

        //UPDATE UI
        console.log('RENDERDED: ', uiConfigs[count])
        console.log("COUNT ", count)

        res.render('index', uiConfigs[count]);

        count++
    }else{
        //re-render
        console.log("RE-RENDERED")

        res.render('index', uiConfigs[count-1]);        
    }

    


 
});

/**
 * testing purposes. can thereby quickly reset server state. 
 */
app.get('/reset/', (req, res) => {
    count = 0
    //res.sendFile(path.join(__dirname, 'public', 'indexPersonalizedAds.html'));
})
//random other test URL
/*app.get('/personalizedAds/', (req, res) => {
    res.render('index', { genericAd: false });
    
    //res.sendFile(path.join(__dirname, 'public', 'indexPersonalizedAds.html'));
});*/

// Serve static files from the 'public' directory -> Pictures
// Must be the last item so that headers can be customized in the .get
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
