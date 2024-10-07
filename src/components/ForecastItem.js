import React from 'react';

const ForecastItem = ({ forecast, timezoneOffset }) => {
    const formatTime = (unixTime, timezoneOffset) => {
        const actualTimezoneOffset = -new Date().getTimezoneOffset() * 60;
        const date = new Date((unixTime + timezoneOffset - actualTimezoneOffset) * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const formatHours = (unixTime, timezoneOffset) => {
        const actualTimezoneOffset = -new Date().getTimezoneOffset() * 60;
        const date = new Date((unixTime + timezoneOffset - actualTimezoneOffset) * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit' });
    }

    return (
        <div className='forecast-item'>
            <time className='forecast-item--fulltime'>{formatTime(forecast.dt, timezoneOffset)}</time>
            <time className='forecast-item--hours'>{formatHours(forecast.dt, timezoneOffset)}</time>
            <p className='forecast-item--temperature'>{Math.round(forecast.main.temp)}<span>°C</span></p>
            <img src={"/icons/" + forecast.weather[0].icon + ".svg"} alt={forecast.weather[0].description} />
            <div className='forecast-item--tooltip'>
            <p>{forecast.weather[0].description}</p>
                <p>pocitová teplota<br />{forecast.main.feels_like}°C</p>
                <p>rychlost větru<br />{forecast.wind.speed}m/s</p>
                <p>oblačnost<br />{forecast.clouds.all}%</p>
            </div>
        </div>
    );
}

export default ForecastItem;