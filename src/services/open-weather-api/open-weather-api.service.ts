import axios, { AxiosError, AxiosResponse } from 'axios';
import { urlfy } from '../../utils/urlfy';
import { env } from '../../config/env';
import { ICurrentWeatherData } from '../../models/ICurrentWeatherData';
import { IWeatherForecastData } from '../../models/IWeatherForecastData';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

export class OpenWeatherApiService {
  private API_URL: string = 'https://api.openweathermap.org/data/2.5';
  private API_KEY: string = env.OPEN_WEATHER_API_KEY;

  getCurrentWeatherData(location: string) {
    const urlParams = {
      appid: this.API_KEY,
      q: location
    };
    return axios
      .get<ICurrentWeatherData>(`${this.API_URL}/weather?${urlfy(urlParams)}`)
      .then(res => {
        if (res.data.weather && res.data.weather.length) {
          const { icon } = res.data.weather[0];
          res.data.weather[0].icon = this.generateIconUrl(icon);
        }
        return res.data;
      })
      .catch((err: AxiosError) => {
        return Promise.reject(
          capitalizeFirstLetter(err.response!.data.message)
        );
      });
  }

  getWeatherForecast(location: string) {
    const urlParams = {
      appid: this.API_KEY,
      q: location
    };
    return axios
      .get<IWeatherForecastData>(`${this.API_URL}/forecast?${urlfy(urlParams)}`)
      .then(res => {
        res.data.list.forEach(forecast => {
          if (forecast.weather && forecast.weather.length) {
            const { icon } = forecast.weather[0];
            forecast.weather[0].icon = this.generateIconUrl(icon);
          }
        });
        return res.data;
      })
      .catch((err: AxiosError) => {
        return Promise.reject(
          capitalizeFirstLetter(err.response!.data.message)
        );
      });
  }

  private generateIconUrl(iconValue: string) {
    if (iconValue) {
      iconValue = `http://openweathermap.org/img/w/${iconValue}.png`;
    }
    return iconValue;
  }
}

export const openWeatherApiService = new OpenWeatherApiService();
