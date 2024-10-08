import { useState, useEffect } from "react";
import fetchWeather from "@/utils/fetchWeather";
import CitySelector from "@/components/CitySelector";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Forecast from "@/components/Forecast";

export default function Home() {
  // Stavy pro uchování informací o počasí
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Olomouc");

  // Stav pro práci s časovým posunem
  const [timezoneOffset, setTimezoneOffset] = useState(0)

  // Stavy pro nastavení aplikace
  const [showLocalTimezone, setShowLocalTimezone] = useState(false)
  const [isCelsius, setIsCelsius] = useState(true)

  // Stavy pro případ že nejsou načtena data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hook pro načtení dat o počasí při změně města
    const fetchData = async (city) => {
      setIsLoading(true);
      try {
        const weather = await fetchWeather(city); // Načte data o počasí pro dané město
        setWeather(weather);
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
  }, [city]) // Hook se spustí při každé změně stavu 'city'

  const onCityChange = (newCity) => {
    setCity(newCity);
  }

  const toggleTimezone = () => {
    setShowLocalTimezone(!showLocalTimezone);
  }

  const toggleCelsius = () => {
    setIsCelsius(!isCelsius);
  }

  return (
    <div className="container">
      <header>
        <h1>
          Počasí {weather && weather.city.name}
          <a href="#nastaveni">
            <img src="/icons/gear-fill.svg" alt="nastavení" />
          </a>
        </h1>
        <CitySelector onCityChange={onCityChange} />
      </header>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <main className="forecast-display">
          <Forecast
            forecastList={weather.forecast}
            timezoneOffset={(showLocalTimezone ? timezoneOffset : (-new Date().getTimezoneOffset() * 60))} isCelsius={isCelsius}
          />
          <div className="forecast-display--settings">
            <h2 id="nastaveni">Nastavení</h2>
            <a onClick={toggleTimezone} className={`forecast-display--settings--button ${showLocalTimezone ? 'forecast-display--settings--button-active' : ''}`}>zobrazit čas podle místa předpovědi</a>
            <a onClick={toggleCelsius} className={`forecast-display--settings--button ${!isCelsius ? 'forecast-display--settings--button-active' : ''}`}>zobrazit předpověď ve °F</a>
            <p>Data jsou načítána z <a href="http://www.openweathermap.org">www.openweathermap.org</a></p>
          </div>
        </main>
      )}

      <footer>
        <p>Dalibor Janeček 2024</p>
        <p>GitHub: <a href="https://github.com/daxovi/pocasi">https://github.com/daxovi/pocasi</a></p>
      </footer>
    </div>
  );
}
