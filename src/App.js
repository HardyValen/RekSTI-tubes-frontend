import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import SoilCondition from "./components/_soil-condition";
import owa from "./key/owa";
import "./scss/global.scss";

function App() {
  const [clientOWA, setClientOWA] = useState(null);

  useEffect(() => {
    // async function fetchData() {
    //   const userLocData = await axios.get("https://geolocation-db.com/json/")
    //   // console.log(userLocData)
      
    //   const OWAData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${userLocData.data.city}&appid=${owa.api_key}`)
    //   // console.log(OWAData)
    //   setClientOWA(OWAData.data)
    // }

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
    <div className="App">

      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="row">
            <div className="col-12 col-md-8 my-2">
              <h1>Greetings!</h1>
              <p>Sistem Pemantauan Kondisi Lingkungan Tanaman Pangan Bayam Berbasis IoT</p>
              <p>
                Dikerjakan oleh Kelompok 2 Rekayasa Sistem Teknologi dan Informasi semester 2 tahun ajaran 2020/2021 yang beranggotakan:
              </p>
              <ul>
                <li>Hardy Valenthio Amansyah (18218004)</li>
                <li>Muhamad Ilman Sukarsa (18218021)</li>
                <li>Alya Mizani (18218029)</li>
                <li>M. Xavier Rafifsyah Prasetyo (18218040)</li>
                <li>Garin Ichsan Nugraha (18218050)</li>
              </ul>
            </div>

            {
              clientOWA
              ? <div className="col-12 col-md-4 my-2">
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
                </div>
              : null
            }
            
          </div>

          <SoilCondition/>

          <div className="row mt-8">
            <div className="col-12">
              <h1>Air Conditions</h1>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
