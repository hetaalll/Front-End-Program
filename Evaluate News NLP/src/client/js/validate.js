function isValid(url) {
    var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (pattern.test(url)) {
        return true;
    }
    return false;
}

// console.log(isValid('www.google.com'));

export { isValid }
