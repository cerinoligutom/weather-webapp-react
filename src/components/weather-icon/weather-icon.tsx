import React from 'react';
import styles from './weather-icon.module.scss';

interface IWeatherIconProps {
  iconUrl: string;
  description: string;
}

function WeatherIcon(props: IWeatherIconProps) {
  return (
    <div className={styles.weatherIconContainer}>
      <img
        className={styles.weatherIcon}
        src={props.iconUrl}
        alt={props.description}
      />
    </div>
  );
}

export default WeatherIcon;
