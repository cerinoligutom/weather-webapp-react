import React, { useState } from 'react';
import styles from './weather-forecast.module.scss';
import { IWeatherForecastData } from '../../models/IWeatherForecastData';
import WeatherForecastItem from '../weather-forecast-item/weather-forecast-item';
import InputToggle from '../input-toggle/input-toggle';
import { TemperatureOptions } from '../../enums/temperature-options.enum';

interface IWeatherForecastProps {
  data: IWeatherForecastData;
}

function WeatherForecast(props: IWeatherForecastProps) {
  const [preferredTemperatureUnit, setPreferredTemperatureUnit] = useState(
    TemperatureOptions.CELSIUS
  );

  const handleInputToggle = (value: boolean) => {
    const temperatureUnit = value
      ? TemperatureOptions.FAHRENHEIT
      : TemperatureOptions.CELSIUS;
    setPreferredTemperatureUnit(temperatureUnit);
  };

  return (
    <div className={styles.weatherForecastContainer}>
      <div className="card">
        <div className="card-body">
          <div className={styles.header}>
            <h4 className="card-title">5 day / 3 hour forecast</h4>
            <div className={styles.inputToggleContainer}>
              <h4>°C</h4>
              <InputToggle onChange={handleInputToggle} />
              <h4>°F</h4>
            </div>
          </div>

          {props.data.list.map((forecast, index) => (
            <WeatherForecastItem
              weatherForecast={forecast}
              key={index}
              temperatureUnit={preferredTemperatureUnit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
