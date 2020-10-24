const updateUI = async (data) => {
    // console.log("in update UI")
    // console.log(data)
    if(data == null){
        const trip_container = document.querySelector('.my-trips-container')
        trip_container.innerHTML = `
            <p id='no_trip'> No Trips Planned </p>
        `
    }
    else{
        try {
            const trip_container = document.querySelector('.my-trips-container')
            trip_container.innerHTML = `
            <div class="my-trips">
                <div class="display">
                    <img src="${data.image}"  alt="destination picture" class="trip-pic">
                </div>
                <div class="display">
                    <p class='trip_details'>
                        <span class="deets"> ${data.destination}, ${data.country} <br />
                        Departing: ${data.departure} <br />
                        Arrival: ${data.arrival} <br /></span>
                        Trip Length: ${data.trip_length} day(s) <br /><br />
                        ${data.destination}, ${data.country} is ${data.daysLeft} day(s) away. <br />
                        ${getForecast(data.daysLeft, data.forecast)}
                    </p>
                </div>
            </div>
            `;
        }
        catch (error) {
            console.log("error", error)
        }
    }
}

const getForecast = (daysLeft, forecast) => {
    // console.log('in get forecast')
    if (daysLeft <= 7) {
        return `<p>
            Typical weather for then is: <br />
            <img src="https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png" alt="weather icon" class="weather_icon"> <br />
            Temp: ${forecast.temp}&#8451; <br />
            Description: ${forecast.weather.description} <br />
        </p>`
    }
    else if (daysLeft > 7) {
        return `<p>
            Typical weather for then is: <br />
            <img src="https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png" alt="weather icon" class="weather_icon"> <br />
            High: ${forecast.high_temp}&#8451;, Low: ${forecast.low_temp}&#8451; <br />
            Description: ${forecast.weather.description} <br />
        </p>`
    }
}

export {
    updateUI
}