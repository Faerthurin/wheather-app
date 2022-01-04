function showWheater(response) {
  console.log(response.data);
  let h1 = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}`;

  celsius = response.data.main.temp;

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
}

function search(city) {
  let unit = "metric";
  let apiKey = `d570d29a0c53c6fc7e18883a380de0bc`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
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

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#temp");
  let fahrenheitTemp = Math.round(celsius * 1.8 + 32);
  temperature.innerHTML = fahrenheitTemp;
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsius);
}

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", retrievePosition);

let currentCity = document.querySelector("#currentbtn");
currentCity.addEventListener("click", currentLocation);

search("Nickerie");
