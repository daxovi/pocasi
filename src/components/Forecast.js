import React from 'react'
import ForecastItem from './ForecastItem';

const Forecast = ({ forecastList, timezoneOffset, isCelsius}) => {
    const formatDate = (unixTime, timezoneOffset) => {
        const actualTimezoneOffset = -new Date().getTimezoneOffset() * 60;
        const date = new Date((unixTime + timezoneOffset - actualTimezoneOffset) * 1000);
        return date.toLocaleDateString();
    }

    const forecastByDay = forecastList.reduce((acc, forecast) => {
        const day = formatDate(forecast.dt, timezoneOffset);
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(forecast);
        return acc;
    }, {});

    const emptyItems = (forecastDay) => {
        return Array(8 - forecastDay.length).fill().map((_, index) => (
            <div key={`empty-${index}`} className="forecast-item forecast-item--empty "></div>
        ))
    }

    return (
        <div>
            {Object.keys(forecastByDay).map((day, index) => (
                <div key={day} className="forecast-day">
                    <h2>{day}</h2>
                    <div className="forecast-day--row">
                        {index === 0 && emptyItems(forecastByDay[day])}
                        {forecastByDay[day].map((forecast) => (
                            <ForecastItem key={forecast.dt} forecast={forecast} timezoneOffset={timezoneOffset} isCelsius={isCelsius} />
                        ))}
                        {index > 0 && emptyItems(forecastByDay[day])}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Forecast