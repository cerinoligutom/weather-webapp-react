import React from 'react';
import styles from './footer.module.scss';

function Footer() {
  const zeferinixWebsiteUrl = 'https://www.zeferinix.com';
  const openWeatherMapUrl = 'https://openweathermap.org/api';
  const reactJsUrl = 'https://reactjs.org/';

  return (
    <div className={styles.footerContainer}>
      <span>
        This website is powered by <a href={reactJsUrl}>ReactJS</a> and{' '}
        <a href={openWeatherMapUrl}>Open Weather Map API</a>.
      </span>
      <span>
        © 2019 - Cerino O. Ligutom III -{' '}
        <a href={zeferinixWebsiteUrl}>ZeferiniX</a>
      </span>
    </div>
  );
}

export default Footer;
