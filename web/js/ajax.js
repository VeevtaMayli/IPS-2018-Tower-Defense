function getResponse(url, data) {
    const xmlhttp = getXmlHttp();
    xmlhttp.open('post', url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(serializeObject(data));
}

function getXmlHttp() {
    return new XMLHttpRequest();
}

function serializeObject(obj) {
    const str = [];
    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            str.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
        }
    }
    return str.join('&');
}

export {getResponse};
