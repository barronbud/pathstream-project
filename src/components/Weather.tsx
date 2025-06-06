import { useEffect, useState } from "react";
import type { Location, Weather } from "../types";
import { fetchCoordinates, fetchWeather } from "../services/weather";

export default function WeatherPanel({ location }: { location: Location }) {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!location) {
            setWeather(null);
            setError("");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError("");
        setWeather(null);

        fetchCoordinates(location)
            .then((coords) => fetchWeather(coords))
            .then((weatherData) => {
                setWeather(weatherData);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
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
