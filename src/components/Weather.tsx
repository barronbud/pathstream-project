import { useEffect, useState } from "react";
import type { Location, Weather } from "../types";

export default function WeatherPanel({ location }: { location: Location }) {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setIsLoading(true);
                setError("");

                // Fetch coordinates
                const response = await fetch(
                    `https://api.api-ninjas.com/v1/geocoding?city=${location.city}&country=${location.country}`,
                    {
                        headers: {
                            "X-Api-Key": import.meta.env
                                .VITE_API_NINJAS_API_KEY,
                        },
                    }
                );
                const data = await response.json();

                if (!data || !data[0]) {
                    setError("Location not found");
                    setIsLoading(false);
                    return;
                }

                const { latitude, longitude } = data[0];

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

                setIsLoading(false);
                setError("");

                setWeather({
                    temp: weatherData.temp,
                    min_temp: weatherData.min_temp,
                    max_temp: weatherData.max_temp,
                    feels_like: weatherData.feels_like,
                    humidity: weatherData.humidity,
                    wind_speed: weatherData.wind_speed,
                });
            } catch (error) {
                setWeather(null);
                setError("Error fetching weather data");
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, [location]);

    if (error) {
        return <p>{error}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!weather) {
        return <p>No weather data available</p>;
    }

    return (
        <>
            <h2>
                Weather in {location.city.toUpperCase()},{" "}
                {location.country.toUpperCase()}
            </h2>
            <p>
                It's currently {weather.temp}°C but feels like{" "}
                {weather.feels_like}°C.
            </p>
            <p>
                The high will be {weather.max_temp}°C and the low will be{" "}
                {weather.min_temp}°C.
            </p>
            <p>The humidity is {weather.humidity}%.</p>
            <p>The wind speed is {Math.round(weather.wind_speed)} km/h.</p>
        </>
    );
}
