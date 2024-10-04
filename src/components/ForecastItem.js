import React from 'react';

const ForecastItem = ({ forecast }) => {
    const formatDate = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleDateString();
    }

    const formatTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className='weather-item'>
            <p>Datum: {formatDate(forecast.dt)}</p>
            <p>Čas: {formatTime(forecast.dt)}</p>
            <p>Teplota: {forecast.main.temp}°C</p>
            <p>Počasí: {forecast.weather[0].description}</p>
        </div>
    );
}

export default ForecastItem;