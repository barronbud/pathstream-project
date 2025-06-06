import { useState } from "react";
import type { Location } from "./types";

import "./css/App.css";
import WeatherPanel from "./components/Weather";

function App() {
    const [location, setLocation] = useState<Location | null>(null);

    const handleSubmit = (formData: FormData) => {
        const city = formData.get("city") as string;
        const country = formData.get("country") as string;
        setLocation({ city, country });
    };

    return (
        <div className="weather-app">
            <section>
                <h1>What's it like outside today?</h1>
                <form action={handleSubmit}>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="City"
                    />
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        placeholder="Country"
                    />
                    <button>Check my weather</button>
                </form>
            </section>

            <aside>{location && <WeatherPanel location={location} />}</aside>
        </div>
    );
}

export default App;
