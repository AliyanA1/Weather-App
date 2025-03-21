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
         if (!data.ok) {
            throw new Error("City not found. Please enter a valid city.");
        }
         const response= await data.json()
          if(!response) setError('invaild name')
            console.log(response)
            setDeta(response);
        } catch (error) {
            setError(error || 'something went wrong')
            setDeta(null)
        }
    }

    //background changer according to weather
    const getBackground = () => {
        if (!deta) return "bg-gradient-to-b from-blue-700 to-blue-900"; // Default background

        const temp = deta.current.temp_c;
        if (temp > 30) return "bg-gradient-to-b from-yellow-500 to-orange-700"; // Hot weather
        if (temp > 20) return "bg-gradient-to-b from-blue-500 to-blue-800"; // Warm weather
        return "bg-gradient-to-b from-gray-500 to-gray-800"; // Cold weather
    };
    
   return(
    <div className={`h-screen font-mono ${getBackground()} flex items-center justify-center px-4 transition-all duration-500`}>
    <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl text-white w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold font-mono tracking-wide mb-4">🌤️ Weather App</h1>

        {/* Input & Button */}
        <div className="flex flex-col space-y-4">
            <input
                className="w-full h-12 px-4 font-mono text-white bg-transparent border border-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button 
                onClick={weatherApi} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold tracking-wide px-5 py-2.5 rounded-lg transition transform hover:scale-105"
            >
                Get Weather
            </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 mt-4 text-sm">{String(error)}</p>}

        {/* Weather Details */}
        {deta && !error && (
            <div className="mt-6">
                <h2 className="text-xl font-semibold">{deta.location.name}, {deta.location.region}, {deta.location.country}</h2>
                <p className="text-5xl font-extrabold mt-2">{Math.floor(deta.current.temp_c)}°C</p>
                <p className="text-lg text-gray-300">(Feels like {deta.current.feelslike_c}°C)</p>
                <p className="text-md text-gray-300">💨 Wind Speed: {deta.current.wind_kph} Kph</p>

                {/* Weather Condition with Icon */}
                <div className="mt-4 flex flex-col items-center">
                    <img 
                        src={deta.current.condition.icon} 
                        alt={deta.current.condition.text} 
                        className="w-24 h-24 drop-shadow-lg"
                    />
                    <p className="text-lg font-semibold">{deta.current.condition.text}</p>
                </div>
            </div>
        )}

        {/* Developer Credit */}
        <p className="text-center mt-6 text-gray-300 text-sm">🚀 Developer: <span className="font-bold font-mono text-gray-100">Aliyan</span></p>
    </div>
    </div>

)
       
}

export default Weather



 