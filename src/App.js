import axios from "axios";
import { useState, useEffect } from "react";
import Greetings from "./components/_greetings";
import OWACard from "./components/_owa-card";
import VisualizationWrapper from "./components/_visualization-wrapper";

import "./scss/global.scss";

function App() {
  return (
    <div className="App">

      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="row">
            <div className="col-12 col-md-8 my-2">
              {/* <form>
                <input type="date" onChange={(e) => {console.log(e.target.value)}}/>
              </form> */}
              <Greetings/>
            </div>
            <div className="col-12 col-md-4 my-2">
              <OWACard/>
            </div>
          </div>

          <VisualizationWrapper/>

        </div>
      </div>

    </div>
  );
}

export default App;
