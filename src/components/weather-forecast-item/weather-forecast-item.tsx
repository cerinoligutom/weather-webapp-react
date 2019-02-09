import React from 'react';
import styles from './weather-forecast-item.module.scss';
import { IWeatherForecast } from '../../models/IWeatherForecastData';
import moment from 'moment';
import Temperature from '../temperature/temperature';
import { TemperatureOptions } from '../../enums/temperature-options.enum';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import WeatherIcon from '../weather-icon/weather-icon';

interface IWeatherForecastItemProps {
  weatherForecast: IWeatherForecast;
  temperatureUnit: TemperatureOptions;
}

function WeatherForecastItem(props: IWeatherForecastItemProps) {
  const formatDate = (unixValue: number) => {
    const date = moment(unixValue * 1000);
    return {
      formattedDate: date.format('ddd D MMM'),
      formattedTime: date.format('HH:mm')
    };
  };

  return (
    <div className={styles.weatherForecastItemContainer}>
      <div className={['card', styles.card].join(' ')}>
        <div className={['card-body', styles.cardBody].join(' ')}>
          <div className={styles.content}>
            <div className={[styles.leftSide, 'col-md-6'].join(' ')}>
              <div className={styles.dateContainer}>
                <div>{formatDate(props.weatherForecast.dt).formattedDate}</div>
                <div>{formatDate(props.weatherForecast.dt).formattedTime}</div>
              </div>
              <WeatherIcon
                iconUrl={props.weatherForecast.weather[0].icon}
                description={props.weatherForecast.weather[0].description}
              />
            </div>

            <div className={[styles.rightSide, 'col-md-6'].join(' ')}>
              <div className={styles.row}>
                <div className={styles.tempMax}>
                  <Temperature
                    kelvinValue={props.weatherForecast.main.temp_max}
                    preferredUnit={props.temperatureUnit}
                  />
                </div>
                <div className={styles.tempMin}>
                  <Temperature
                    kelvinValue={props.weatherForecast.main.temp_min}
                    preferredUnit={props.temperatureUnit}
                  />
                </div>
                <div className={styles.weatherDescription}>
                  {capitalizeFirstLetter(
                    props.weatherForecast.weather[0].description
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <span>{props.weatherForecast.wind.speed} m/s</span>
              </div>
              <div className={styles.row}>
                <span>
                  Clouds: {props.weatherForecast.clouds.all} %,{' '}
                  {props.weatherForecast.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherForecastItem;
