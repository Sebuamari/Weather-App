const div=document.getElementsByClassName("container");
const API_key = "003f337f10430feccbb2e324bc774ac8";
const city=document.querySelector(".city");
const icon=document.querySelector(".weather-icon");
const search=document.querySelector(".search");
const weatherIn=document.querySelector(".weather-in");
const searchButton=document.querySelector(".search button");
const temperature=document.querySelector(".temperature");
const mainWeather=document.querySelector(".main-weather");
const description=document.querySelector(".description");
const feelsLike=document.querySelector(".feels-like");
const minTemp=document.querySelector(".min-temp");
const maxTemp=document.querySelector(".max-temp");
const humidity=document.querySelector(".humidity");

function convert (K) {
	return Math.round(K-273.15) + "℃";
};

function searchData () {
	fetchWeather(city.value);
};

function fetchWeather(city) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q='
		+ city
		+ '&appid='
		+ API_key )
	.then(response => response.json())
	.then(response => displayWeather(response))
	.catch(err => console.error(err));
};

function displayWeather (data) {
	document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?" + city.value + "')";
	weatherIn.innerHTML="Weather in " + city.value.charAt(0).toUpperCase() + city.value.slice(1) + ", " + data.sys.country;
	temperature.innerHTML=convert(data.main.temp);
	mainWeather.innerHTML=data.weather[0].main;
	description.innerHTML=data.weather[0].description;
	icon.src="https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"; 
	feelsLike.innerHTML="Feels like - " + convert(data.main.feels_like);
	minTemp.innerHTML="minimum temperature - " + convert(data.main.temp_min);
	maxTemp.innerHTML="maximum temperature - " + convert(data.main.temp_max);
	humidity.innerHTML="Humidity - " + data.main.humidity;
};

searchButton.addEventListener("click", function(){
	searchData();
});

function onLoad (loadCity) {
	fetchWeather(loadCity);
	city.value=loadCity;
}

window.onload(onLoad("London"));