document.addEventListener('DOMContentLoaded', () => {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const fetchWeatherButton = document.getElementById('fetch-weather');
    const cityInput = document.getElementById('city-input');

    const apiKey = 'cfe22a7b677e0a4ef05276a39938129c'; // Replace with your new OpenWeatherMap API key

    function fetchWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const temp = data.main.temp;
                const weatherConditions = data.weather[0].description;
                const locationName = data.name;

                locationElement.textContent = `Location: ${locationName}`;
                temperatureElement.textContent = `Temperature: ${temp}°C`;
                conditionsElement.textContent = `Conditions: ${weatherConditions}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                locationElement.textContent = 'Could not fetch weather data.';
                temperatureElement.textContent = '';
                conditionsElement.textContent = '';
            });
    }

    fetchWeatherButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});
