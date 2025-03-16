import { useState } from "react"

const Weather=()=>{
    const [city, setCity]=useState('');
    const [error, setError]=useState(null);
    const [deta, setDeta]=useState(null)

    const api=import.meta.env.VITE_WEATHER_APP

    //function for fecthing data
    const weatherApi=async()=>{
        if (!city) {
            setError("Please enter a city name.");
            return;
        }
        try {
            setError(null)
         const data=  await fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=no`)
           const response= await data.json()
            console.log(response)
            setDeta(response);
        } catch (error) {
            setError(error)
        }
    }

    const getBackground = () => {
        if (!deta) return "bg-gradient-to-b from-blue-700 to-blue-900"; // Default background

        const temp = deta.current.temp_c;
        if (temp > 30) return "bg-gradient-to-b from-yellow-500 to-orange-700"; // Hot weather
        if (temp > 20) return "bg-gradient-to-b from-blue-500 to-blue-800"; // Warm weather
        return "bg-gradient-to-b from-gray-500 to-gray-800"; // Cold weather
    };
    
    return (
        <div className={`h-screen font-mono ${getBackground()} flex items-center justify-center transition-all duration-500`}>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-white w-96 text-center">
                <h1 className="text-2xl font-mono mb-4">Weather App</h1>
                
                <div className="flex flex-col space-y-4">
                    <input
                        className="w-full h-10 p-3 text-white bg-transparent border-2 border-white rounded-lg placeholder-white focus:outline-none"
                        type="text"
                        placeholder="Enter city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button 
                        onClick={weatherApi} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Get Weather
                    </button>
                </div>

                {error && <p className="text-red-400 mt-4">{error}</p>}

                {deta && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">{deta.location.name}, {deta.location.region}, {deta.location.country}</h2>
                        <p className="text-2xl font-bold ">{deta.current.temp_c}°C </p>
                        <p className="text-lg "> (Feels like {deta.current.feelslike_c}°C)</p>
                        <p className="text-md">Wind Speed: {deta.current.wind_kph} Kph</p>

                        {/* Weather condition with dynamic icon */}
                        <div className="mt-4 flex flex-col items-center">
                            <img 
                                src={deta.current.condition.icon} 
                                alt={deta.current.condition.text} 
                                className="w-20 h-20"
                            />
                            <p className="text-lg font-semibold">{deta.current.condition.text}</p>
                        </div>
                    </div>
                )}
                <p className="text-center mt-4 text-gray-200">Developer: Aliyan</p>
            </div>
            
        </div>
    )
       
}

export default Weather