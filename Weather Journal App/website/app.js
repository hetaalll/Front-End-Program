/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=e3406a48e8b511ecd0aaf96e1c76f658';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    // console.log(zipCode);
    getWeather(baseUrl, zipCode, apiKey)
        .then(function (data) {
            const userFeelings = document.getElementById('feelings').value;
            postData('/add', { temp: data.main.temp, date: newDate, feelings: userFeelings });
            //Update UI
            updateUI();
        })

}

/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zip, key) => {
    const res = await fetch(baseUrl + zip + key)
    // console.log(res);
    try {
        const data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    // console.log("in postData");
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to update the UI*/
const updateUI = async () => {
    // console.log("in update UI")
    const request = await fetch('/all')
    try {
        const data = await request.json()
        // console.log(data);
        document.getElementById('temp').innerHTML = `TEMP: ${data.temp}`;
        document.getElementById('date').innerHTML = `DATE: ${data.date}`;
        document.getElementById('content').innerHTML = data.feelings ? `FEELING: ${data.feelings}` : data.feelings;
    }
    catch (error) {
        console.log("error", error)
    }
}
