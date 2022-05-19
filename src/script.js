let celsiusTempreture = null;

function formatDate(apiDate) {
  let current = new Date(apiDate);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];

  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${day} ${hours}:${minutes}`;
  return currentDate;
}

const apiKey = "c30ce5ac8d66859d50289ad40960116b";
const unit = "metric";

let cityInput = document.querySelector("#city-value");

let cityForm = document.querySelector("#city-form");

function showCurrentTempreture(response) {
  let currentTempreture = document.querySelector(".current-tempreture");
  let cityName = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let visibility = document.querySelector("#visibility");
  let pressure = document.querySelector("#pressure");
  let maxTempreture = document.querySelector("#max");
  let minTempreture = document.querySelector("#min");
  let description = document.querySelector("#description");
  let currentTime = document.querySelector("#current-time");
  let icon = document.querySelector("#icon");

  celsiusTempreture = Math.round(response.data.main.temp);
  let currentTemp = celsiusTempreture;
  let name = response.data.name;
  let windValue = Math.round(response.data.wind.speed);
  let humidityValue = Math.round(response.data.main.humidity);
  let visibilityValue = response.data.visibility;
  let pressureValue = response.data.main.pressure;
  let maxTempretureValue = Math.round(response.data.main.temp_max);
  let minTempretureValue = Math.round(response.data.main.temp_min);
  let descriptionValue = response.data.weather[0].description;
  currentTempreture.innerHTML = `${currentTemp}°`;
  cityName.innerHTML = `${name}`;
  wind.innerHTML = `${windValue} mph`;
  humidity.innerHTML = `${humidityValue}%`;
  visibilityValue = Math.round(visibilityValue / 1609);
  visibility.innerHTML = `${visibilityValue} mi`;
  pressureValue = Math.round(pressureValue / 33.863886666667);
  pressure.innerHTML = `${pressureValue} in`;
  maxTempreture.innerHTML = `${maxTempretureValue}°`;
  minTempreture.innerHTML = `${minTempretureValue}°`;
  description.innerHTML = `${descriptionValue}`;
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  console.log(response);
}

function serach(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTempreture);
}

function changingCity(event) {
  event.preventDefault();
  let cityInputValue = cityInput.value;
  cityInputValue = cityInputValue.trim();
  if (cityInputValue) {
    serach(cityInputValue);
  } else {
    alert("Enter a location!");
    event.preventDefault();
  }
}

cityForm.addEventListener("submit", changingCity);

let searchButton = document.querySelector("#serach-button");
searchButton.addEventListener("submit", changingCity);

function getPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTempreture);
}

let homeButton = document.querySelector("#home-button");
homeButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
});

function convertingToCelsius(event) {
  event.preventDefault();
  let currentTempreture = document.querySelector(".current-tempreture");
  currentTempreture.innerHTML = `${celsiusTempreture}°`;
  farenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertingToCelsius);

function convertingToFarenheit(event) {
  event.preventDefault();
  let currentTempreture = document.querySelector(".current-tempreture");
  let farenheitTemp = Math.round(celsiusTempreture * 1.8 + 32);
  currentTempreture.innerHTML = `${farenheitTemp}°`;
  celsius.classList.remove("active");
  farenheit.classList.add("active");
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertingToFarenheit);

const defaultCity = "London";
serach(defaultCity);
