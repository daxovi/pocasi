import { useState, useEffect } from "react";
import fetchWeather from "@/utils/fetchWeather";
import CitySelector from "@/components/CitySelector";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Forecast from "@/components/Forecast";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("Olomouc");
  const [error, setError] = useState(null);
  const [timezoneOffset, setTimezoneOffset] = useState(0)
  const [showLocalTimezone, setShowLocalTimezone] = useState(false)

  useEffect(() => {
    const fetchData = async (city) => {
      setIsLoading(true);
      try {
        const weather = await fetchWeather(city);
        setWeather(weather);
        console.log(weather); // DEBUG
        setError(null);
        setIsLoading(false);
        setTimezoneOffset(weather.city.timezone);
      } catch (error) {
        setError(error.message);
        setWeather(null);
        setIsLoading(false);
      }
    };
    fetchData(city);
  }, [city])

  const onCityChange = (newCity) => {
    setCity(newCity);
  }

  const toggleTimezone = () => {
    setShowLocalTimezone(!showLocalTimezone);
  }

  return (
    <div className="container">
      <header>
        <h1>Počasí {weather && weather.city.name}</h1>
        <CitySelector onCityChange={onCityChange} />
      </header>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <main className="forecast-display">
          <div className="forecast-display--settings">
            <button onClick={toggleTimezone} className="forecast-display--settings--button">{showLocalTimezone ? ("zobrazit předpověď v místním čase") : ("zobrazit předpověď v čase místa předpovědi")}</button>
          </div>
          <Forecast forecastList={weather.forecast} timezoneOffset={(showLocalTimezone ? timezoneOffset : (-new Date().getTimezoneOffset() * 60))} />
        </main>
      )}

      <footer>
        <p>Dalibor Janeček 2024</p>
        <p>GitHub: <a href="https://github.com/daxovi/pocasi">https://github.com/daxovi/pocasi</a></p>
      </footer>
    </div>
  );
}
