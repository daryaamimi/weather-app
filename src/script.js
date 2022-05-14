function formatDate(current) {
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

  let currentTime = document.querySelector("#current-time");

  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

let current = new Date();

formatDate(current);

const apiKey = "c30ce5ac8d66859d50289ad40960116b";

const unit = "metric";

let cityInput = document.querySelector("#city-value");

let cityForm = document.querySelector("#city-form");

function showCurrentTempreture(response) {
  let currentTempreture = document.querySelector(".current-tempreture");
  let currentTemp = Math.round(response.data.main.temp);
  currentTempreture.innerHTML = `${currentTemp}°`;
  let cityName = document.querySelector("#city");
  let name = response.data.name;
  cityName.innerHTML = `${name}`;
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let visibility = document.querySelector("#visibility");
  let pressure = document.querySelector("#pressure");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windValue} mph`;
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}%`;
  let visibilityValue = response.data.visibility;
  visibilityValue = Math.round(visibilityValue / 1609);
  visibility.innerHTML = `${visibilityValue} mi`;
  let pressureValue = response.data.main.pressure;
  pressureValue = Math.round(pressureValue / 33.863886666667);
  pressure.innerHTML = `${pressureValue} in`;
  let maxTempreture = document.querySelector("#max");
  let maxTempretureValue = Math.round(response.data.main.temp_max);
  maxTempreture.innerHTML = `${maxTempretureValue}°`;
  let minTempreture = document.querySelector("#min");
  let minTempretureValue = Math.round(response.data.main.temp_min);
  minTempreture.innerHTML = `${minTempretureValue}°`;
  let description = document.querySelector("#description");
  let descriptionValue = response.data.weather[0].description;
  description.innerHTML = `${descriptionValue}`;
}

(function () {
  let cityName = document.querySelector("#city");
  let cityTextNode = document.createTextNode("London");
  cityName.appendChild(cityTextNode);
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTempreture);
})();

function changingCity(event) {
  event.preventDefault();
  let cityInputValue = cityInput.value;
  cityInputValue = cityInputValue.trim();
  if (cityInputValue) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showCurrentTempreture);
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
