const clockContainer = document.querySelector(".js-clock"),
    clockTitleDate = clockContainer.querySelector("h3");
    clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const md = date.toLocaleDateString();
    clockTitleDate.innerText = `${md}`;
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();