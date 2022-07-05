// open weather api
let apiKey = "2ce216751bf820d8d58c4c2066228621";
let unitMetric = "metric";


//current day and time
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  let formattedDate = document.querySelector("#current-date-time"); 
  formattedDate.innerHTML = `${currentDay} ${hours}:${minutes}`;
  return formattedDate;
}

console.log(formatDate(now));

//search engine
function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-text");
  
  let city = document.querySelector("#city");
  if (searchCityInput.value) {
    city.innerHTML = searchCityInput.value;
  } else {
    city.innerHTML = null;
    alert: "Please enter a city name";
    
  }
  

  //open weather city search
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${unitMetric}`;
  function getCurrentTemp(response) {
    let currentTemp = document.querySelector("#temperature-current");
    let currentCityTemperature = Math.round(response.data.main.temp);
    let iconElement = document.querySelector("#weather-icon");
    let descriptionElement = document.querySelector("#description");


    currentTemp.innerHTML = currentCityTemperature;
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    descriptionElement.innerHTML = response.data.weather[0].description;


    //currentTemp.innerHTML = response;
    
  }
  axios.get(apiUrlCity).then(getCurrentTemp)
  
  searchCityInput.value = ``;
  
}

let searchForm = document.querySelector("#submit-button");
searchForm.addEventListener("click", searchCity); 

// Geolocation API


function getGpsCoords(showCoords) {
  let latitude = showCoords.coords.latitude;
  let longitude = showCoords.coords.longitude;
  
  let apiGpsUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unitMetric}`;
  
  function getCurrentGpsTemp(response) {
    let currentTemp = document.querySelector("#temperature-current");
    console.log(Math.round(response.data.main.temp));
    let currentCityTemperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = currentCityTemperature;
    console.log(response.data.name);
    let currentGpsCity = document.querySelector("#city");
    currentGpsCity.innerHTML = response.data.name;
    
    let iconElement = document.querySelector("#weather-icon");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.humidity;
    windElement.innerHTML = Math.round(response.data.wind_speed);
    
  }
  axios.get(apiGpsUrl).then(getCurrentGpsTemp)
  
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGpsCoords);
}

let gpsButton = document.querySelector("#gps-button");
gpsButton.addEventListener("click", getCurrentPosition);



//temperature unit change
function celsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature-current");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

//let celsiusTemperature = null;

let cButton = document.querySelector("#celsius-link");
cButton.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature-current");

  let fahrenheitTemperature = (celsiusTemperature *9)/5+32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fButton = document.querySelector("#fahrenheit-link");
fButton.addEventListener("click", fahrenheit);
