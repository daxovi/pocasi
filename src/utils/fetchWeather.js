const fetchWeatherData = async (city) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERAPIKEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=cz&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Chyba při načítání dat o počasí.");
    }
    const data = await response.json();
    return {
        city: data.city.name,
        forecast: data.list
    };
};

export default fetchWeatherData;