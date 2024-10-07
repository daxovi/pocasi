import React from 'react'
import ForecastItem from './ForecastItem';

const Forecast = ({ forecastList, timezoneOffset, isCelsius }) => {
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

    const getMinMaxTemperature = (dayForecast) => {
        const forecastminmax = dayForecast.map((item) => (
            item.main.temp
        ))
        return [Math.min(...forecastminmax), Math.max(...forecastminmax)];
    }

    const getPercentageTemperature = (temperature, min, max) => {
        const normalized = (temperature - min) / (max - min);
        const percentage = normalized * 80 + 10;
        return Math.min(Math.max(percentage, 10), 90);
    };

    return (
        <div>
            {Object.keys(forecastByDay).map((day, indexDay) => (
                <div key={day} className="forecast-day">
                    <h2>{day}</h2>
                    <div className="forecast-day--row">
                        {indexDay === 0 && emptyItems(forecastByDay[day])}
                        {forecastByDay[day].map((forecast, index) => (
                            <ForecastItem
                                key={forecast.dt}
                                forecast={forecast}
                                timezoneOffset={timezoneOffset}
                                isCelsius={isCelsius}
                                percentageTemp={getPercentageTemperature(forecast.main.temp, getMinMaxTemperature(forecastByDay[day])[0], getMinMaxTemperature(forecastByDay[day])[1])}
                                timeout={indexDay * 1000 + index *300}
                            />
                        ))}
                        {indexDay > 0 && emptyItems(forecastByDay[day])}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Forecast