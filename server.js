import express from 'express';
import path, { dirname } from 'path';
import { uiConfigs, responseHeaders, expectedHeaders } from './responses.js';
import { fileURLToPath } from 'url';

//Setup of express and pug (more at end of file...)
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

/**
 * This variable manages the state of the service 
 * (Yes its stateful... but its just a fake)
 */
let count = 0;

/**
 * Main http endpoint
 */
app.get('/', function (req, res) {
    const adpcHeader = req.headers['adpc']

    console.log('RECEIVED: ', adpcHeader);

    if (adpcHeader) {
        if (!(adpcHeader === expectedHeaders[count])) {
            console.log("Should have received ; ", expectedHeaders[count])
            throw Error("INTEGRATION TEST: received wrong header. Should have received: ")
        }

        console.log('SENT: ', responseHeaders[count].toString())

        res.set("ADPC", responseHeaders[count]);

        console.log('RENDERDED: ', uiConfigs[count])
        console.log("COUNT ", count)

        res.render('index', uiConfigs[count]);

        count++
    }else{
        // re-render
        // If the tab is re-loaded (because agent does so), just render last config
        console.log("RE-RENDERED")

        res.render('index', uiConfigs[count-1]);        
    }

});

// Serve static files from the 'public' directory -> Pictures
// Must be the last item so that headers can be customized in the .get
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
