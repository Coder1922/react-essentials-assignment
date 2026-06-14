import React, { useState, useEffect } from 'react';
import './App.css';

// TODO: Replace with your actual OpenWeatherMap API Key
const API_KEY = 'd1d6d4b93b63e77feb8f2a9e07730c31'; 

function App() {
  // --- State Management ---
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('London'); // Default city on load
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // --- Helper Function: Fetch Weather ---
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found or unable to fetch data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // --- EFFECT 1: Data Fetching (Dependency on 'city') ---
  // Triggers on initial mount (default city) and whenever 'city' state changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  // --- EFFECT 2: Auto-Refresh Timer (Cleanup Example 1) ---
  // Refreshes the data every 60 seconds. Cleans up the interval to prevent memory leaks.
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Auto-refreshing weather for ${city}...`);
      fetchWeather(city);
    }, 60000); // 60 seconds

    // Cleanup function: runs when component unmounts or before the effect runs again
    return () => {
      clearInterval(intervalId);
    };
  }, [city]); // Needs 'city' dependency so the interval fetches the correct current city

  // --- EFFECT 3: Event Listener (Cleanup Example 2) ---
  // Allows the user to press 'Enter' to trigger the search
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && searchInput.trim()) {
        setCity(searchInput.trim());
        setSearchInput('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function: removes the listener to prevent duplicate event triggers
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchInput]); // Re-binds listener when input changes

  // --- Handlers ---
  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput(''); // Clear input after search
    }
  };

  return (
    <div className="weather-dashboard">
      <header className="header">
        <h1>Weather Dashboard</h1>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Get Weather
        </button>
      </div>

      <div className="weather-content">
        {loading && <p className="loading-message">Loading weather data...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="weather-main">
              {/* Displaying weather icon from OpenWeatherMap */}
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt={weatherData.weather[0].description} 
              />
              <span className="temperature">{Math.round(weatherData.main.temp)}°C</span>
            </div>
            <h3 className="condition">{weatherData.weather[0].main} - {weatherData.weather[0].description}</h3>
            
            <div className="weather-details">
              <div className="detail-item">
                <span className="label">Humidity</span>
                <span className="value">{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Wind Speed</span>
                <span className="value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="label">Feels Like</span>
                <span className="value">{Math.round(weatherData.main.feels_like)}°C</span>
              </div>
            </div>
            
            <p className="refresh-time">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;