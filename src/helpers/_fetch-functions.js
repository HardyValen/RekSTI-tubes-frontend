import axios from "axios";

const FetchFunctions = {}
const backendURL = "http://localhost:9000/data";

FetchFunctions.all = function ({sensor_node}) {
  return axios.get(backendURL + `?sensor_node=${sensor_node}`)
}

FetchFunctions.range = function ({sensor_node, type, start_date, end_date}) {
  return axios.get(
    backendURL + `
    ?sensor_node=${sensor_node},
    &type=${type},
    &start_date=${start_date},
    &end_date=${end_date}
  `)
}

export default FetchFunctions;