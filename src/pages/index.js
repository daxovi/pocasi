import { useState, useEffect } from "react";
import fetchWeather from "@/utils/fetchWeather";
import CitySelector from "@/components/CitySelector";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Olomouc");

  useEffect(() => {
    const fetchData = async (city) => {
      const weather = await fetchWeather(city);
      setWeather(weather);
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
      <div className="weather-display">
        <h2>Předpověď pro město {weather ? weather.city : "načítání"}</h2>
        <p>Teplota: {weather ? weather.forecast[0].main.temp : "načítání"}</p>
        <p>Počasí: {weather ? weather.forecast[0].weather[0].description : "načítání"}</p>
      </div>
    </>
  );
}
