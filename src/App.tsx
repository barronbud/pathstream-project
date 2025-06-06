import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Location } from "./types";
import WeatherPanel from "./components/Weather";

import "./css/App.css";

const queryClient = new QueryClient();

function App() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState<Location | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLocation({ city, country });
    };

    return (
        <QueryClientProvider client={queryClient}>
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
                    {location && <WeatherPanel location={location} />}
                </aside>
            </div>
        </QueryClientProvider>
    );
}

export default App;
