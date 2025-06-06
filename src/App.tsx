import { useEffect, useState } from "react";
import type { Location, Weather } from "./types";

import "./css/App.css";
import WeatherPanel from "./components/Weather";

function App() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState<Location | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);
    const [searchParams, setSearchParams] = useState<Location | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchParams) return;

            try {
                // Reset states at the start of a new search
                setLocation(null);
                setWeather(null);

                // Fetch coordinates
                const response = await fetch(
                    `https://api.api-ninjas.com/v1/geocoding?city=${searchParams.city}&country=${searchParams.country}`,
                    {
                        headers: {
                            "X-Api-Key": import.meta.env
                                .VITE_API_NINJAS_API_KEY,
                        },
                    }
                );
                const data = await response.json();

                if (!data || !data[0]) {
                    throw new Error("Location not found");
                }

                const { latitude, longitude } = data[0];
                console.log("Location data:", data);

                // Fetch weather with coordinates
                const weatherResponse = await fetch(
                    `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`,
                    {
                        headers: {
                            "X-Api-Key": import.meta.env
                                .VITE_API_NINJAS_API_KEY,
                        },
                    }
                );
                const weatherData = await weatherResponse.json();
                console.log("Weather data:", weatherData);

                // Update both states only after we have all the data
                setWeather({
                    temp: weatherData.temp,
                    min_temp: weatherData.min_temp,
                    max_temp: weatherData.max_temp,
                    feels_like: weatherData.feels_like,
                    humidity: weatherData.humidity,
                    wind_speed: weatherData.wind_speed,
                });
                setLocation(searchParams);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setLocation(null);
                setWeather(null);
            }
        };

        fetchWeatherData();
    }, [searchParams]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchParams({ city, country });
    };

    return (
        <div className="weather-app">
            <section>
                <h1>What's it like outside today?</h1>
                <form>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Check my weather</button>
                </form>
            </section>

            <aside>
                {weather && location && (
                    <WeatherPanel location={location} weather={weather} />
                )}
            </aside>
        </div>
    );
}

export default App;
