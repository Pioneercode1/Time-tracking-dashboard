let request = new XMLHttpRequest();
request.open("GET", "./data.json");
request.send();
request.onload = function() {
    console.log(request.responseText);
}