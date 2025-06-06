import { useState } from "react";
import type { Location } from "./types";

import "./css/App.css";
import WeatherPanel from "./components/Weather";

function App() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState<Location | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLocation({ city, country });
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

            <aside>{location && <WeatherPanel location={location} />}</aside>
        </div>
    );
}

export default App;
