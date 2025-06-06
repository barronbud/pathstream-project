import type { Location } from "../types";
import { useWeather } from "../hooks/useWeather";

export default function WeatherPanel({ location }: { location: Location }) {
    const { data: weather, isLoading, error } = useWeather(location);

    if (error) {
        return <p>{error.message}</p>;
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
                Weather in {location.city.toUpperCase()}, {location.country.toUpperCase()}
            </h2>
            <p>
                It's currently {weather.temp}°C but feels like {weather.feels_like}°C.
            </p>
            <p>
                The high will be {weather.max_temp}°C and the low will be {weather.min_temp}°C.
            </p>
            <p>The humidity is {weather.humidity}%.</p>
            <p>The wind speed is {Math.round(weather.wind_speed)} km/h.</p>
        </>
    );
}
