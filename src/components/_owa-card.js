import axios from "axios";
import { useEffect, useState } from "react"
import owa from "../key/owa.json";

function OWACard() {
  const [clientOWA, setClientOWA] = useState(null);

  useEffect(() => {
    async function fetchData(lat, lon) {
      const userLocData = await axios.get("https://geolocation-db.com/json/")
      // console.log(userLocData)
      
      const OWAData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owa.api_key}&units=metric`)
      // console.log(OWAData)
      setClientOWA(OWAData.data)
    }

    // fetchData()
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            fetchData(coords.latitude, coords.longitude)
          }
        )
      }
    }

    getLocation()

    return () => {

    }
  }, [])

  return (
    <>
      {
        clientOWA
        ? <>
            <h2>Weather Now:</h2>
            <div className="app-weather-card">
              <div className="weather-card-img">
                <img src={`http://openweathermap.org/img/wn/${clientOWA?.weather[0]?.icon}.png`} alt=""/>
              </div>
              <div className="weather-card-description">
                <h3>{clientOWA?.weather[0]?.main}, {clientOWA?.main?.temp}&deg;C</h3>
                <p>{clientOWA?.name}</p>
              </div>
            </div>
          </>
        : null
      }
    </>
  )
}

export default OWACard