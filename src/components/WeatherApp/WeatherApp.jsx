import React, {useRef, useState} from 'react'
import styles from './weatherApp.module.css'

import search_icon from '../assets/Image/search.png';
import clear_icon from '../assets/Image/clear.png';
import cloud_icon from '../assets/Image/cloud.png';
import drizzle_icon from '../assets/Image/drizzle.png';
import humidity_icon from '../assets/Image/humidity.png';
import rain_icon from '../assets/Image/rain.png';
import snow_icon from '../assets/Image/snow.png';
import wind_icon from '../assets/Image/wind.png';


export const WeatherApp = () => {
    const apiKey = "dd94f859a0e52d6e4767fddf735f04a7"
    const inputRefs = {temprature: useRef(null), location: useRef(null)};
    const [wicon, setWicon] = useState(cloud_icon);
    const Search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`
        let response = await fetch(url)
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidityPercent");
        const windRate = document.getElementsByClassName("windRate");

        humidity[0].innerHTML = data.main.humidity+" %";
        windRate[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        inputRefs.temprature.current.innerHTML = Math.floor(data.main.temp)+"°C";
        inputRefs.location.current.innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon)
        } else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon)
        } else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon)
        } else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon)
        } else {
            setWicon(clear_icon);
        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.topBar}>
            <input type="text" className='cityInput' placeholder='search city' />
            <div className={styles.searchIcon} onClick={()=>Search()} >
                <img src={search_icon} alt="search icon" />
            </div>
        </div>
        <div className={styles.weatherImage}>
            <img src={wicon} alt="cloud icon" />
        </div>
        <div  className={styles.weatherTemp} ref={inputRefs.temprature}>34.c</div>
        <div  className={styles.weatherLocation} ref={inputRefs.location}>London</div>
        <div className={styles.dataContainer}>
            <div className={styles.element}>
                <img src={humidity_icon} alt="" className={styles.icon} />
                <div className={styles.data}>
                    <div className="humidityPercent">64%</div>
                    <div className={styles.text}>Humidity</div>
                </div>
            </div>
            <div className={styles.element}>
                <img src={wind_icon} alt="" className={styles.icon} />
                <div className={styles.data}>
                    <div className="windRate">18 km/h</div>
                    <div className={styles.text}>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}
