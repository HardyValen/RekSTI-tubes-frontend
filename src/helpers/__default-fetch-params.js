import moment from "moment";

const m1 = moment()
const m2 = moment()

m1.add(-1, "months")

m1.startOf("day")
m2.endOf("day")

const DefaultFetchParams = {
  sensor_node: "sensor_2",
  type: "by_start_end_date",
  start_date: m1.toDate(),
  end_date: m2.toDate(),
}

export default DefaultFetchParams