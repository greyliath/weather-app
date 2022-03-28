import axios from "axios";

let now = new Date();
let time = document.getElementById("current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[now.getMonth()];
let day = days[now.getDay()];
let dayNumber = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

time.innerHTML = `${day}, ${dayNumber} ${month}, ${hour}:${minutes}:${seconds}`;

function displayWeather(response) {
  let currentCity = document.getElementById("current-city");
  let currentTemp = document.getElementById("current-temp");
  let currentDescription = document.getElementById("description");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;

  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}`;
  currentDescription.innerHTML = `${description}`;
}

function getCity() {
  let city = document.getElementById("city-search").value;
  let apiKey = "41cfe2883e28f6564310b6db8fa8a1df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function showPosition(position) {
  let lat = position.coords.latitude.value;
  let lon = position.coords.longitude.value;
  let units = "metric";
  let apiKey = "a6d203f193cb23874b319e04444ceed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let getCurrent = document.getElementById("geolocation");
getCurrent.addEventListener("submit", getLocation);

let searchForm = document.getElementById("weather-search");
searchForm.addEventListener("submit", getCity);
