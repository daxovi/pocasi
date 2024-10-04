import { useState, useEffect } from "react";
import fetchWeather from "@/utils/fetchWeather";

export default function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather("Olomouc");
      setWeather(weather)
    };
    fetchData();
    console.log(weather)
  }, [])
  
  return (
    <>
      <h1>Počasí</h1>
      <div className="city-selector">
        <form action="">
          <input type="text" name="" id="" />
          <button>Načíst počasí</button>
        </form>
      </div>
      <div className="weather-display">
        <h2>Předpověď pro město {weather ? weather.city : "načítání"}</h2>
        <p>Teplota: {weather ? weather.forecast[0].main.temp : "načítání"}</p>
        <p>Počasí: {weather ? weather.forecast[0].weather[0].description : "načítání"}</p>
      </div>
    </>
  );
}
