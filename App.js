import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'bd949fe1a248947d87346f9f77741011';

  const fetchWeather = async () => {
    if (city === '') return;

    setError('');
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setForecastData(forecastResponse.data.list.slice(0, 5));

    } catch (error) {
      setError('City not found or invalid API key');
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>

      { }
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      { }
      {error && <p className="error">{error}</p>}

      { }
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      { }
      {forecastData && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-cards">
            {forecastData.map((forecast, index) => (
              <div key={index} className="forecast-card">
                <h4>{new Date(forecast.dt_txt).toLocaleDateString()}</h4>
                <p>Temperature: {forecast.main.temp}°C</p>
                <p>Condition: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
