document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "eb01254f67d1400ca7e45720250104"; // Replace if necessary
    const locationInput = document.getElementById("location");

    function fetchWeather(location) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.location) throw new Error("Invalid API response");

                // Replace the entire page with the weather data (Fully Responsive)
                document.body.innerHTML = `
                    <div class="flex flex-col items-center justify-center  text-white text-center p-6">
                        <h1 class="text-3xl font-bold mb-4">Weather Report</h1>
                        <p class="text-xl">📍 ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
                        <p class="text-2xl mt-2">🌡️ ${data.current.temp_c}°C</p>
                        <p class="text-xl mt-2">🌥️ ${data.current.condition.text}</p>
                        <img src="${data.current.condition.icon}" alt="Weather Icon" class="mt-4 w-20">
                        <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            🔄 Check Another Location
                        </button>
                    </div>
                `;
            })
            .catch(error => {
                document.body.innerHTML = `
                    <div class="flex flex-col items-center justify-center  bg-red-900 text-white text-center p-6">
                        <h1 class="text-3xl font-bold mb-4">❌ Failed to Fetch Weather Data</h1>
                        <p>Please check your internet connection or try a different location.</p>
                        <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                            🔄 Try Again
                        </button>
                    </div>
                `;
                console.error("Error fetching weather:", error);
            });
    }

    window.startPrank = function () {
        const location = locationInput.value.trim();
        if (!location) {
            alert("Please enter a location!");
            return;
        }

        // Hide everything and show fake loading screen (Fully Responsive)
        document.body.innerHTML = `
            <div class="flex flex-col items-center justify-center  text-green-400 text-xl text-center p-6 font-mono">
                <p>🛰️ Connecting to satellite...</p>
            </div>
        `;

        let messages = [
            "🔄 Retrieving atmospheric data...",
            "📡 Scanning cloud patterns...",
            "🕵️‍♂️ Analyzing temperature fluctuations...",
            "✅ Data retrieval complete!"
        ];

        let index = 0;
        const messageElement = document.querySelector("p");

        // Display fake loading messages one by one
        const interval = setInterval(() => {
            index++;
            if (index < messages.length) {
                messageElement.textContent = messages[index];
            } else {
                clearInterval(interval);
                fetchWeather(location); // Fetch real weather after fake loading
            }
        }, 1500);
    };
});
