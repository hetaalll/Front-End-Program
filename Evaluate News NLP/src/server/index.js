var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express()

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

dotenv.config();
// console.log(`Your API key is ${process.env.API_KEY}`);

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    })

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/meaningCloud', postMeaningCloudData);
    async function postMeaningCloudData(req, res){
        // console.log(req);
        const userUrl = req.body.url;
        const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${userUrl}`;

        let response = await fetch(url)
        let data = await response.json()

        const evaluation = {
            model : data.model,
            score_tag : data.score_tag,
            agreement : data.agreement,
            subjectivity : data.subjectivity,
            confidence : data.confidence,
            irony : data.irony
        }
        // console.log(evaluation);
        res.send(evaluation);
    }