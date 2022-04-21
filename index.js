//Feature #1

//Day
let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
document.getElementById("current_day").innerHTML = ` ${daylist[day]} `;

//Time
let dateToday = new Date();
document.getElementById("current_time").textContent =
  dateToday.toLocaleTimeString();

//Feature 2
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let h1 = document.querySelector("h1");
  let city = searchInput.value;
  if (city) {
    h1.innerHTML = city;
  } else {
    alert("Please type a city 😁");
  }
  let apiKey = "ba1f7c269713d3f36f3b20c716194a21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

//Bonus
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// weather api

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

//Geolocation api

function searchLocation(position) {
  let apiKey = "ba1f7c269713d3f36f3b20c716194a21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
