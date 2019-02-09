import React from 'react';
import styles from './temperature.module.scss';
import { TemperatureOptions } from '../../enums/temperature-options.enum';

interface ITemperatureProps {
  kelvinValue: number;
  preferredUnit: TemperatureOptions;
}

function Temperature(props: ITemperatureProps) {
  if (!props.preferredUnit) {
    props.preferredUnit = TemperatureOptions.CELSIUS;
  }

  const decimalPlaces = 1;

  const kelvinToFahrenheit = (kelvinValue: number) => {
    return (((kelvinValue - 273.15) * 9) / 5 + 32).toFixed(decimalPlaces);
  };

  const kelvinToCelsius = (kelvinValue: number) => {
    return (kelvinValue - 273.15).toFixed(decimalPlaces);
  };

  const temperature = (preferredUnit: TemperatureOptions) => {
    let formattedValue = '';

    switch (preferredUnit) {
      case TemperatureOptions.CELSIUS:
        formattedValue = `${kelvinToCelsius(props.kelvinValue)} °C`;
        break;
      case TemperatureOptions.FAHRENHEIT:
        formattedValue = `${kelvinToFahrenheit(props.kelvinValue)} °F`;
        break;
      default:
        formattedValue = 'Invalid value';
    }

    return <span>{formattedValue}</span>;
  };

  return temperature(props.preferredUnit);
}

export default Temperature;
