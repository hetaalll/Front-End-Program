import { updateUI } from './updateUI'

const openForm = () => {
    document.getElementById("add-trip-form").style.display = "block";
}

const closeForm = () => {
    document.getElementById("add-trip-form").style.display = "none";
}

const validate = () => {
    const destination = document.getElementById("destination").value;

    const departure = document.getElementById("departure").value;
    const arrival = document.getElementById("arrival").value;

    if(destination == '' || departure == '' || arrival == ''){
        alert('Error: Please fill out the form entirely.')
    }
    else{
        return true
    }
}

const postData = async (url_path = "", data = {}) => {
    const response = await fetch(url_path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        // console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const saveTrip = async (event) => {
    event.preventDefault();
    const destination = document.getElementById("destination").value;
    const departure = document.getElementById("departure").value;
    const arrival = document.getElementById("arrival").value;

    let validDates = true;

    if(departure > arrival){
        validDates = false;
        alert('Error: Arrival date cannot be before departure date');
    }

    if(validate() && validDates){
        postData("http://localhost:8081/saveTripData", { destination: destination, departure: departure, arrival: arrival })
            .then(function (data) {
                localStorage.setItem('trip', JSON.stringify(data))
                // console.log(localStorage)
                // console.log(data)
                updateUI(data);
            })
        document.getElementById("add-trip-form").style.display = "none";
    }
}

const tripExists = () => {
    // console.log(localStorage)
    if(localStorage.getItem('trip') != null) {
        return true
    }
    return false
}

const deleteTrip = async (event) => {
    // console.log('delete trip')
    event.preventDefault();

    if(tripExists()){
        postData("http://localhost:8081/deleteTripData", { })
            .then(function (data) {
                localStorage.clear();
                updateUI(null)
            })
    }
    else {
        alert("ERROR: No trips to delete");
    }
}

export {
    saveTrip,
    openForm,
    closeForm,
    deleteTrip
}