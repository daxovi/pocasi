import { useState, useEffect } from "react";
import fetchWeather from "@/utils/fetchWeather";
import CitySelector from "@/components/CitySelector";
import ForecastItem from "@/components/ForecastItem";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("Olomouc");

  useEffect(() => {
    const fetchData = async (city) => {
      setIsLoading(true);
      const weather = await fetchWeather(city);
      setWeather(weather);
      setIsLoading(false);
    };
    fetchData(city);
    console.log(weather);
  }, [city])

  const onCityChange = (newCity) => {
    setCity(newCity);
  }

  return (
    <>
      <h1>Počasí</h1>
      <CitySelector onCityChange={onCityChange} />
      {isLoading ? "načítání" : (<div className="weather-display">
        <h2>Předpověď pro město {weather.city}</h2>
        {weather.forecast.map((forecast) => (
          <ForecastItem key={forecast.dt} forecast={forecast} />
        ))}
      </div>
      )}
    </>
  );
}
