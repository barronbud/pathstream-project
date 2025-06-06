import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Location } from "./types";
import WeatherPanel from "./components/Weather";

import "./css/App.css";

const queryClient = new QueryClient();

function App() {
    const [location, setLocation] = useState<Location | null>(null);

    const handleSubmit = (formData: FormData) => {
        const city = formData.get("city") as string;
        const country = formData.get("country") as string;
        setLocation({ city, country });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="weather-app">
                <section>
                    <h1>What's it like outside today?</h1>
                    <form action={handleSubmit}>
                        <label htmlFor="city">City</label>
                        <input id="city" name="city" type="text" required placeholder="City" />
                        <label htmlFor="country">Country</label>
                        <input id="country" name="country" type="text" required placeholder="Country" />
                        <button>Check my weather</button>
                    </form>
                </section>

                <aside>{location && <WeatherPanel location={location} />}</aside>
            </div>
        </QueryClientProvider>
    );
}

export default App;
