const weather = document.querySelector(".js-weather");
const API_KEY = "30b7e26ec67f23f9f6c3f4f4890037d9";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function (response) {
        return response.json();
    }).then(function(json){
        const temperature = parseInt(json.main.temp);
        const place = json.name;
        const wdesc = json.weather[0].description;
        const wicon = json.weather[0].icon;
        const icon = new Image();
        icon.src = `icons/${wicon}@2x.png`;
        icon.classList.add("wIcon");
        weather.innerText = `${place} \n ${temperature}°C, ${wdesc}`;
        weather.prepend(icon);
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();