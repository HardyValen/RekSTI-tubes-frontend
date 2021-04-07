import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";

function App() {
  const [series, setSeries] = useState([0, 0, 0, 0, 0]);
  
  useEffect(() => {
    const id = setInterval(() => {
      setSeries([50, 50, 50, 50, 50])
      const data = () => {
        let arr = []
        for(let x = 0; x < 5; x++) {
          arr.push(Math.floor(Math.random() * 1000))
        }
        return arr;
      };
      console.log(data())
      
      setSeries(data());
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="App">
      <p>Hello World</p>
      <HighchartsReact
        highcharts={Highcharts}
        options={
          {
            title: {
              text: "First Chart"
            },
            series: [{
              type: 'line',
              data: series
            }]
          }
        }
        {...HighchartsReact.props}
      />
      {JSON.stringify(series)}
    </div>
  );
}

export default App;
