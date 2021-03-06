import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import moment from "moment";

function SoilCondition({rawData}) {
  const [series, setSeries] = useState(null);

  useEffect(() => {
    let seriesTemp = rawData?.objSeries?.map((entry) => {
      return [moment(entry.created_at).valueOf(), entry.kelembaban_tanah]
    })

    setSeries(seriesTemp)

    return () => {}
  }, [rawData])

  return (
    <div className="row mt-8">
      <div className="col-12">
        <h1>Kondisi Tanah</h1>
      </div>
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              {
                title: {
                  text: "Grafik Kondisi Tanah",
                },
                subtitle: {
                  text: "Sensor_1",
                },
                xAxis: {
                  type: 'datetime',
                  title: {
                    text: "Waktu ambil data"
                  } 
                },
                yAxis: {
                  title: {
                    text: "Kelembapan Tanah (%)"
                  },
                  min: 0,
                  max: 100,
                },
                tooltip: {
                  formatter: function () {
                    return `
                      <span>Date: <b>${Highcharts.dateFormat('%A, %e %B %y', this.x)}</b></span><br>
                      <span>Time: <b>${Highcharts.dateFormat('%H:%M:%S', this.x)}</b></span><br><br>
                      <span style="color: ${this.series.color}">&ensp;●&ensp;</span>
                      <span>${this.series.name}: <b>${this.y}</b></span>
                    `
                  },
                },
                series: [{
                    // data: [
                    //     [new Date("2021-04-13T11:52:55.458Z"), 30],
                    //     [new Date("2021-04-13T11:52:55.458Z"), 40],
                    //     [new Date("2021-04-13T11:52:55.458Z"), 50]
                    // ],
                    data: series,
                    name: "Kelembaban Tanah."
                }]
              }
            }
          />
        </div>
        <div className="col-12 col-md-6 p-2 statistics-card">
          <h3>Statistik Kelembaban Tanah:</h3>
          <table className="my-4" style={{width: "10s0%"}}>
            {
              Object.entries(rawData.statistics.kelembaban_tanah).map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data[0]}</td>
                    <td><b>{data[1].toFixed(2)} %</b></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default SoilCondition;