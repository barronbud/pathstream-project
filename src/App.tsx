import "./css/App.css";

function App() {
    const handleSubmit = (formData: FormData) => {
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    return (
        <div className="weather-app">
            <section>
                <h1>Will It Rain Today?</h1>
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
                    <button type="submit">Check my weather</button>
                </form>
            </section>
            <aside>
                <h2>Weather</h2>
                <p>The weather in city, country is weather</p>
            </aside>
        </div>
    );
}

export default App;
