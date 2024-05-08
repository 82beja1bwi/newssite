import express from 'express';
import path, { dirname } from 'path';
import { uiConfigs, responseHeaders, expectedHeaders } from './responses.js';
import { fileURLToPath } from 'url';

// Create an Express application
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// Pug is view engine
app.set('view engine', 'pug');
// Directory of pug templates
app.set('views', path.join(__dirname, 'view'));

// Because its just a mock, i allow this service to have a state
// The state is managed in this counter and can be reset with ./reset/
let count = 0;

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

// Serve static files from the 'public' directory -> Pictures
// Must be the last item so that headers can be customized in the .get
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
