import React from 'react';

const ForecastItem = ({ forecast }) => {
    const formatTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const formatHours = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit' });
    }

    return (
        <div className='forecast-item'>
            <time className='forecast-item--fulltime'>{formatTime(forecast.dt)}</time>
            <time className='forecast-item--hours'>{formatHours(forecast.dt)}</time>
            <p className='forecast-item--temperature'>{Math.round(forecast.main.temp)}<span>°C</span></p>
            <img src={"/icons/" + forecast.weather[0].icon + ".svg"} alt={forecast.weather[0].description} />
        </div>
    );
}

export default ForecastItem;