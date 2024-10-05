import React, { useState } from 'react';
import citiesData from '@/data/citylist.json';

const CitySelector = ({onCityChange}) => {
    const [cityInput, setCityInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCityInput(value);

        if (value.length > 2) {
            const filteredCities = citiesData.filter(city =>
                city.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredCities.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (cityName) => {
        setCityInput(cityName);
        setSuggestions([]);
        onCityChange(cityName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCityChange(cityInput);
        setSuggestions([]);
    };

    return (
        <div className="city-selector">
            <form onSubmit={handleSubmit}>
                <input type="text" name="city" value={cityInput} onChange={handleInputChange} autocomplete="off" />
                <button type="submit">Načti počasí</button>
            </form>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((city) => (
                        <li key={city.id} onClick={() => handleSuggestionClick(city.name)}>
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySelector