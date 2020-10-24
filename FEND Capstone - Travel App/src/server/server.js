var path = require('path')
const express = require('express')
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

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//Object to store data received by the APIs
projectData = {}

// function returns the number of days between two dates
const dateDifference = (start_date, end_date)=>{
    const startDate = new Date(start_date)
    const endDate = new Date(end_date)
    diff = endDate - startDate
    const daysLeft = (Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return daysLeft
}

app.post('/saveTripData', saveTripData);

// save trip data returned by the api
async function saveTripData(req, res) {
    // console.log(req.body);
    projectData.destination = req.body.destination;
    projectData.departure = req.body.departure;
    projectData.arrival = req.body.arrival;

    var today_date = new Date();
    var today = today_date.getFullYear()+'-'+(today_date.getMonth()+1)+'-'+today_date.getDate();
    const daysLeft = dateDifference(today, req.body.departure)
    projectData.daysLeft = daysLeft

    const geonames_url = `http://api.geonames.org/postalCodeSearchJSON?placename=${req.body.destination}&username=${process.env.GEONAMES_KEY}`
    const geonames_respone = await fetch(geonames_url)
    const geonames_data = await geonames_respone.json()
    projectData.latitude = geonames_data.postalCodes[0].lat;
    projectData.longitude = geonames_data.postalCodes[0].lng;
    projectData.country = geonames_data.postalCodes[0].countryCode;

    let weatherbit_url = ``;

    if(dateDifference(today, req.body.departure) <= 7){
        weatherbit_url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_KEY}&lat=${projectData.latitude}&lon=${projectData.longitude}`
        const current_weather_geonames_respone = await fetch(weatherbit_url)
        const current_weather_data = await current_weather_geonames_respone.json()
        projectData.forecast = current_weather_data.data[0]
    }
    else{
        weatherbit_url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${projectData.latitude}&lon=${projectData.longitude}`
        const forecast_weather_geonames_respone = await fetch(weatherbit_url)
        const forecast_weather_data = await forecast_weather_geonames_respone.json()
        projectData.forecast = forecast_weather_data.data[0]
    }

    const pixabay_url = `https://pixabay.com/api?key=${process.env.PIXABAY_KEY}&q=${req.body.destination}`
    const pixabay_respone = await fetch(pixabay_url)
    const pixabay_data = await pixabay_respone.json()
    projectData.image = pixabay_data.hits[0].webformatURL

    const trip_length = dateDifference(req.body.departure, req.body.arrival)
    projectData.trip_length = trip_length
    // console.log(projectData);
    res.send(projectData);
}

app.post('/deleteTripData', deleteTripData);

// delete trip data
async function deleteTripData(req, res) {
    // console.log('in deletetrip')
    projectData = {}
    // console.log(projectData);
    res.send(projectData)
}
