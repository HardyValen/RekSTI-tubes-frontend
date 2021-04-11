import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import VisualizationCard from "./_visualization-card";
import faker_readings from "../testdata/_faker-readings.json";
import DefaultFetchParams from "../helpers/__default-fetch-params";
import FetchFunctions from "../helpers/_fetch-functions";

function LoadingText() {
  return (
    <h2 className="mt-8">
      Mohon tunggu, sedang mengambil data...&ensp;
      <FontAwesomeIcon icon={'circle-notch'} spin size={"sm"}/>
    </h2>
  )
}

function ErrorLoadingText() {
  return (
    <h3 className="mt-8">
      Maaf, halaman tidak dapat mengambil data dari sensor...
    </h3>
  )
}

function VisualizationWrapper() {
  const [data, setData] = useState(null);
  const [loadFlag, setLoadFlag] = useState(true);
  const [queryParam, setQueryParam] = useState(DefaultFetchParams)

  useEffect(() => {
    // Nanti fetch disini...
    FetchFunctions.all(queryParam)
      .then(({data}) => {
        setData(data);
      })

    // setData(faker_readings)

    // Timeout
    const timeoutHandler = setTimeout(() => {
      if (!data) {
        setLoadFlag(false)
      }
    }, 15000);
    
    return () => {
      clearTimeout(timeoutHandler)
    }
  }, [])

  return (
    <>
      {
        data
        ? <>
            {/* <SoilCondition rawData={data}/> */}
            <VisualizationCard rawData={data} metrics="kelembaban_tanah" title="Kelembaban Tanah" unit="%" statistics={{min: 0, max: 100}}/>
            <VisualizationCard rawData={data} metrics="kelembaban_udara" title="Kelembaban Udara" unit="%" statistics={{min: 0, max: 100}}/>
            <VisualizationCard rawData={data} metrics="suhu" title="Suhu" unit="°C"/>
            {/* <AirCondition rawData={data}/> */}
          </>
        : loadFlag 
          ? <LoadingText/> 
          : <ErrorLoadingText/>
      }
    </>
  )
}

export default VisualizationWrapper