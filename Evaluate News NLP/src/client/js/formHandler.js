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

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value

    if (Client.isValid(formText)) {

        Client.checkForName(formText)
        console.log("::: Form Submitted :::")
        document.getElementById('analyzing').innerHTML = `analyzing...`;

        postData("http://localhost:8081/meaningCloud", { url: formText })
            .then(function (data) {
                // console.log(data)
                document.getElementById('model').innerHTML = `model: ${data.model}`;
                document.getElementById('score_tag').innerHTML = `score_tag: ${data.score_tag}`;
                document.getElementById('agreement').innerHTML = `agreement: ${data.agreement}`;
                document.getElementById('subjectivity').innerHTML = `subjectivity: ${data.subjectivity}`;
                document.getElementById('confidence').innerHTML = `confidence: ${data.confidence}`;
                document.getElementById('irony').innerHTML = `irony: ${data.irony}`;
            })
    } else {
        alert("Error: Please enter a valid URL");
        return;
    }
}

export { handleSubmit }
