function showWheater(response) {
  console.log(response.data);
  let h1 = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}`;

  let city = document.querySelector("#location");
  city.innerHTML = response.data.name;

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

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", retrievePosition);

let currentCity = document.querySelector("#currentbtn");
currentCity.addEventListener("click", currentLocation);

search("Nickerie");
