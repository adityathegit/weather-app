const inputCity = document.querySelector("#js-city");
const button = document.querySelector("#js-btn");

const result = document.querySelector(".js-result");

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const condition = "unitGroup=metric&include=days,hours&elements=datetime,tempmax,tempmin,temp,humidity,conditions";

const htmlFunction = (res) => {
    if (!res || !res.days || res.days.length === 0) return "";
    let html = `
        <span>${res.days[0].conditions}</span>
        <br>
        <span>Temperature: ${res.days[0].temp}</span>
        <br>
        <span>Humidity: ${res.days[0].humidity}</span>
    `
    return html;
}


const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


const fetchFunction = async (city) => {
    const date = currentDate();
    try {
        const response = await fetch(`${url}/${city}/${date}?${condition}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(`Error, ${error}`);
        return null;
    };
}


button.addEventListener("click", () => {
    const city = inputCity.value;

    if(city === "") {
        result.textContent = "Enter a city name before searching."
        return;
    }
    result.textContent = "Loading...";

    fetchFunction(city).then((res) => {
        const html = htmlFunction(res);
        if (html === "") {
            result.textContent = "Error loading weather data.";
            return;
        }
        setTimeout(() => {
            result.innerHTML = html;
            timeout = true;
        }, 1000)
    })
});






/**
 * 
 * https://weather.visualcrossing.com/
 * VisualCrossingWebServices/rest/services/timeline/
 * Miami,FL/
 * 2025-06-01?
 * unitGroup=metric
 * &include=days,hours
 * &elements=datetime,tempmax,tempmin,temp,humidity,conditions
 */