/* eslint-disable import/no-extraneous-dependencies */

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"

import { getMotorcycleSoldData } from "~/app/requests"

import styles from "./line-chart.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = (props) => {
  const { startDate, virtualDealerArea } = props
  const { data } = useQuery({
    queryKey: ["motorcycle-sold", { startDate, virtualDealerArea }],
    queryFn: getMotorcycleSoldData,
  })

  const optionLineChart = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          border: {
            dash: [2, 1],
          },
          color: "#575757",
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  }

  const lineChartData = {
    labels: data?.data?.data[0]?.modelsArray,
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "#C93B2B",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: data?.data?.data[0]?.countsArray,
      },
    ],
  }

  return (
    <div className={`${styles.lineChart} ${props.graphClass}`}>
      {data?.data?.data[0]?.modelsArray.length > 0 ? (
        <Line
          options={optionLineChart}
          data={lineChartData}
          width="100%"
          height={200}
        />
      ) : (
        <div className={styles.notDataStyle}>No Data Available</div>
      )}
    </div>
  )
}

export default LineChart
