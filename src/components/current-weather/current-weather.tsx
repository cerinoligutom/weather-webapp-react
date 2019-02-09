import React from 'react';
import styles from './current-weather.module.scss';
import { ICurrentWeatherData } from '../../models/ICurrentWeatherData';
import moment from 'moment';
import WeatherIcon from '../weather-icon/weather-icon';

interface ICurrentWeatherProps {
  data: ICurrentWeatherData;
}

function CurrentWeather(props: ICurrentWeatherProps) {
  const toCompass = (degrees: number) => {
    return [
      'N',
      'N-NE',
      'NE',
      'E-NE',
      'E',
      'E-SE',
      'SE',
      'S-SE',
      'S',
      'S-SW',
      'SW',
      'W-SW',
      'W',
      'W-NW',
      'NW',
      'N-NW',
      'N'
    ][Math.round((degrees % 360) / 11.25 / 2)];
  };

  const formatDate = (unixValue: number) => {
    return moment(unixValue * 1000).format('LT');
  };

  const createOpenWeatherMapUrl = (latitude: number, longitude: number) => {
    return `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${latitude}&lon=${longitude}&zoom=8`;
  };

  return (
    <div className={styles.currentWeatherDataContainer}>
      <div className="card">
        <div className="card-body">
          <div className="row no-gutters mb-4">
            <div className="col-sm-4 p-0">
              <h4 className="card-title">Current weather</h4>
              <h6 className="card-subtitle">
                {moment(props.data.dt * 1000).format('lll')}
              </h6>
            </div>
            <div className="col-sm-2 p-0">
              <WeatherIcon
                iconUrl={props.data.weather[0].icon}
                description={props.data.weather[0].description}
              />
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-sm-6 p-0 mb-3">
              <h6 className="card-subtitle text-muted">Wind:</h6>
              <p className="card-text">
                {props.data.wind.speed} m/s, {toCompass(props.data.wind.deg)} ({' '}
                {props.data.wind.deg}° )
              </p>

              <h6 className="card-subtitle text-muted">Clouds:</h6>
              <p className="card-text">{props.data.clouds.all} %</p>

              <h6 className="card-subtitle text-muted">Pressure:</h6>
              <p className="card-text">{props.data.main.pressure} hPa</p>

              <h6 className="card-subtitle text-muted">Geo coordinates:</h6>
              <p className="card-text">
                <a
                  href={createOpenWeatherMapUrl(
                    props.data.coord.lat,
                    props.data.coord.lon
                  )}
                >
                  [{props.data.coord.lat}, {props.data.coord.lon}]
                </a>
              </p>
            </div>

            <div className="col-sm-6 p-0 mb-3">
              <h6 className="card-subtitle text-muted">Humidity:</h6>
              <p className="card-text">{props.data.main.humidity} %</p>

              <h6 className="card-subtitle text-muted">Sunrise:</h6>
              <p className="card-text">{formatDate(props.data.sys.sunrise)}</p>

              <h6 className="card-subtitle text-muted">Sunset:</h6>
              <p className="card-text">{formatDate(props.data.sys.sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
