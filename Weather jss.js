const apiEndpoint = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '5dd9b7a2525f4b29ab4190403251202'; // Replace with your actual API key

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.querySelector('.weather-info');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const unitToggle = document.getElementById('unit-toggle');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

let currentUnit = 'metric'; // Default to Celsius

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name';
    }
});

unitToggle.addEventListener('click', () => {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    if (cityName.textContent) { // Check if a city has been searched
        getWeatherData(cityName.textContent);
    }
});

function getWeatherData(city) {
    const url = `${apiEndpoint}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error.message;
                weatherInfo.style.display = 'none'; // Hide weather info on error
            } else {
                displayWeatherData(data);
                weatherInfo.style.display = 'block'; // Show weather info
            }
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = 'Failed to fetch weather data';
            weatherInfo.style.display = 'none'; // Hide weather info on error
        });
}

function displayWeatherData(data) {
    cityName.textContent = data.location.name;
    weatherDescription.textContent = data.current.condition.text;

    if (currentUnit === 'metric') {
        temperature.textContent = `${data.current.temp_c}°C`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    } else {
        temperature.textContent = `${data.current.temp_f}°F`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_mph} mph`;
    }

    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    weatherIcon.src = "https:" + data.current.condition.icon; // Added https: to icon URL
    weatherIcon.alt = data.current.condition.text; // Set alt text for accessibility
    errorMessage.textContent = '';
}