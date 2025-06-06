import { useQuery } from "@tanstack/react-query";
import type { Location } from "../types";
import { getWeatherData } from "../services/weather";

export function useWeather(location: Location | null) {
    return useQuery({
        queryKey: ["weather", location?.city, location?.country],
        queryFn: () => getWeatherData(location!),
    });
}
