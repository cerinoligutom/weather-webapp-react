import React, { Component, useState } from 'react';
import './App.scss';
import { openWeatherApiService } from './services/open-weather-api/open-weather-api.service';
import SearchInput from './components/search-input/search-input';
import CurrentWeather from './components/current-weather/current-weather';
import WeatherForecast from './components/weather-forecast/weather-forecast';
import { ICurrentWeatherData } from './models/ICurrentWeatherData';
import { IWeatherForecastData } from './models/IWeatherForecastData';
import Loading from './components/loading/loading';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Footer from './components/footer/footer';

function App() {
  const [
    currentWeatherData,
    setCurrentWeatherData
  ] = useState<ICurrentWeatherData | null>(null);

  const [
    weatherForecastData,
    setWeatherForecastData
  ] = useState<IWeatherForecastData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWeatherData = (location: string = '') => {
    if (!location.trim().length) {
      toastr.info('Enter a valid location', 'Bad input');
      return;
    }

    setIsLoading(true);

    Promise.all([
      openWeatherApiService.getCurrentWeatherData(location),
      openWeatherApiService.getWeatherForecast(location)
    ])
      .then(([fetchedWeatherData, fetchedWeatherForecast]) => {
        setCurrentWeatherData(fetchedWeatherData);
        setWeatherForecastData(fetchedWeatherForecast);
        setIsLoading(false);
      })
      .catch((errorMessage: string) => {
        // TODO: Present the error to user
        console.log(errorMessage);
        setIsLoading(false);
        toastr.error(errorMessage, 'Error');
      });
  };

  return (
    <div className="app container">
      <div className="header">
        <h2>Current Weather and Forecasts</h2>
      </div>

      <div className="search-input-container col-md-6">
        <SearchInput handleSearch={getWeatherData} />
      </div>

      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}

      {!isLoading && currentWeatherData && (
        <div className="current-weather-data-container col-md-8">
          <CurrentWeather data={currentWeatherData} />
        </div>
      )}

      {!isLoading && weatherForecastData && (
        <div className="weather-forecast-data-container col-md-8">
          <WeatherForecast data={weatherForecastData} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
