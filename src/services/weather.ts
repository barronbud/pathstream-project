import type { Location, Weather } from "../types";

const API_NINJAS_API_KEY = import.meta.env.VITE_API_NINJAS_API_KEY;

interface Coordinates {
    latitude: number;
    longitude: number;
}

async function fetchCoordinates(location: Location): Promise<Coordinates> {
    const response = await fetch(
        `https://api.api-ninjas.com/v1/geocoding?city=${location.city}&country=${location.country}`,
        {
            headers: {
                "X-Api-Key": API_NINJAS_API_KEY,
            },
        }
    );
    const data = await response.json();

    if (!data || !data[0]) {
        throw new Error("Location not found");
    }

    return {
        latitude: data[0].latitude,
        longitude: data[0].longitude,
    };
}

async function fetchWeather(coordinates: Coordinates): Promise<Weather> {
    const response = await fetch(
        `https://api.api-ninjas.com/v1/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
        {
            headers: {
                "X-Api-Key": API_NINJAS_API_KEY,
            },
        }
    );
    const data = await response.json();

    return {
        temp: data.temp,
        min_temp: data.min_temp,
        max_temp: data.max_temp,
        feels_like: data.feels_like,
        humidity: data.humidity,
        wind_speed: data.wind_speed,
    };
}

export async function getWeatherData(location: Location): Promise<Weather> {
    const coordinates = await fetchCoordinates(location);
    return fetchWeather(coordinates);
}
