const inputCity = document.querySelector("#js-city");
const button = document.querySelector("#js-btn");
const result = document.querySelector("#js-result");

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const condition = "unitGroup=metric&include=days,hours&elements=datetime,tempmax,tempmin,temp,humidity,conditions";

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
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error(`Error, ${error}`);
    };
}

button.addEventListener("click", (event) => {
    event.preventDefault();
    const city = inputCity.value;
    if(city === "") return;
    fetchFunction(city).then((res) => {
        // Print the result
    });
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