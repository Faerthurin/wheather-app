function showWheater(response) {
  let h1 = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}`;

  let city = document.querySelector("#location");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let wind = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${speed}  `;

  let humidity = document.querySelector("#humidity");
  let humidityPer = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityPer}  `;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `d570d29a0c53c6fc7e18883a380de0bc`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWheater);
}

function retrievePosition(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  search(city);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = `d570d29a0c53c6fc7e18883a380de0bc`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWheater);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `d570d29a0c53c6fc7e18883a380de0bc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forcastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forcastHTML += `<div class="col-2">
          <strong class="days">${formatDay(forecastDay.dt)}</strong>
          <br />
           <img src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png" alt="" />
          <p><strong>${Math.round(
            forecastDay.temp.max
          )}°C /</strong> ${Math.round(forecastDay.temp.min)}°C</p>
       </div>`;
    }
  });
  forcastHTML += `</div>`;
  forecastElement.innerHTML = forcastHTML;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", retrievePosition);

let currentCity = document.querySelector("#currentbtn");
currentCity.addEventListener("click", currentLocation);

search("Nickerie");
