import React from 'react';

const ForecastItem = ({ forecast }) => {
    const formatTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className='forecast-item'>
            <time>{formatTime(forecast.dt)}</time>
            <p>{Math.round(forecast.main.temp)}°C</p>
            <p>{forecast.weather[0].description}</p>
        </div>
    );
}

export default ForecastItem;