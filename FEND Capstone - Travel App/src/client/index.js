import './styles/style.scss'
import './styles/planner.scss'

import { saveTrip, openForm, closeForm, deleteTrip } from './js/app'
import { updateUI } from './js/updateUI'

window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('page is fully loaded');
    // console.log(localStorage)
    // localStorage.clear()

    var today_date = new Date();
    var today = today_date.getFullYear() + '-' + (today_date.getMonth() + 1) + '-' + today_date.getDate();

    const date = document.querySelectorAll('.date');
    for (let d of date) {
        d.setAttribute('min', today);
    };

    let trip_data_str = ''
    trip_data_str = localStorage.getItem('trip') ? localStorage.getItem('trip') : ''
    let trip_data = trip_data_str == '' ? null : JSON.parse(trip_data_str)

    updateUI(trip_data)
});


document.querySelector("#add-trip").addEventListener('click', openForm);

document.querySelector(".close-btn").addEventListener('click', closeForm);

document.querySelector("#save-btn").addEventListener('click', saveTrip);

document.querySelector("#delete-trip").addEventListener('click', deleteTrip);
