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

const allIcons = [
  "clear sky",
  "clouds",
  "haze",
  "heavy snow",
  "mist",
  "rain",
  "shower rain",
  "snow",
  "thunderstorm",
  "drizzle",
];

const apiKey = "c30ce5ac8d66859d50289ad40960116b";
const unit = "metric";

let cityInput = document.querySelector("#city-value");

let cityForm = document.querySelector("#city-form");

function formatDay(apiDate) {
  let date = new Date(apiDate * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastingWeather = document.querySelector("#weatherForecast");
  let forescastElement = "";
  forescastElement = `<div class="row last">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let forecastIcon;
      let mainOfIcon = forecastDay.weather[0].main.toLowerCase();
      let descriptionOfIcon = forecastDay.weather[0].description.toLowerCase();
      let idOfIcon = forecastDay.weather[0].id;
      for (let i = 0; i < allIcons.length; i++) {
        if (descriptionOfIcon.localeCompare(allIcons[i]) === 0) {
          forecastIcon = `images/${allIcons[i]}.gif`;
        } else if (mainOfIcon.localeCompare(allIcons[i]) === 0) {
          forecastIcon = `images/${allIcons[i]}.gif`;
        } else if (
          idOfIcon === 711 ||
          idOfIcon === 731 ||
          idOfIcon === 741 ||
          idOfIcon === 751 ||
          idOfIcon === 761 ||
          idOfIcon === 762 ||
          idOfIcon === 771 ||
          idOfIcon === 781
        ) {
          forecastIcon = `images/mist.gif`;
        }
      }

      forescastElement += `<div class="col-sm forecastCard">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <h6>
                    <strong> ${formatDay(forecastDay.dt)} </strong>
                  </h6>
                </div>
                <div class="row row-cols-auto">
                    <img src="${forecastIcon}" class="forecastIcon"/>
                  <div class="col detail-tempreture">
                    <h6>
                      <strong> ${Math.round(forecastDay.temp.max)}° </strong>
                    </h6>
                    <h6 class="low">
                      <strong> ${Math.round(forecastDay.temp.min)}° </strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    }
  });

  forescastElement = forescastElement + `</div>`;
  forecastingWeather.innerHTML = forescastElement;
}

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

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

  let currentTemp = Math.round(response.data.main.temp);
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

  let imageOfIcon = document.querySelector("#icon");
  let mainOfIcon = response.data.weather[0].main.toLowerCase();
  let descriptionOfIcon = response.data.weather[0].description.toLowerCase();
  let idOfIcon = response.data.weather[0].id;
  let source;
  for (let i = 0; i < allIcons.length; i++) {
    if (descriptionOfIcon.localeCompare(allIcons[i]) === 0) {
      source = `images/${allIcons[i]}.gif`;
      imageOfIcon.setAttribute("src", source);
    } else if (mainOfIcon.localeCompare(allIcons[i]) === 0) {
      source = `images/${allIcons[i]}.gif`;
      imageOfIcon.setAttribute("src", source);
    } else if (
      idOfIcon === 711 ||
      idOfIcon === 731 ||
      idOfIcon === 741 ||
      idOfIcon === 751 ||
      idOfIcon === 761 ||
      idOfIcon === 762 ||
      idOfIcon === 771 ||
      idOfIcon === 781
    ) {
      source = `images/mist.gif`;
      imageOfIcon.setAttribute("src", source);
    }
  }
  let coordinates = response.data.coord;
  getForecast(coordinates);
}

function serach(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTempreture);
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
