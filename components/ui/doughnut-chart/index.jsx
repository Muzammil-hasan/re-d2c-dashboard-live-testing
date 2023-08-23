/* eslint-disable import/no-extraneous-dependencies */
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

import styles from "./doughnut-chart.module.scss"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const DoughnutChart = (props) => (
  <div className={styles.doughnutChart}>
    <Doughnut
      options={props.options}
      data={props.data}
      width="100%"
      height={props.size}
      plugins={props.plugins}
    />
  </div>
)

export default DoughnutChart
