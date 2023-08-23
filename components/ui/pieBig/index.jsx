"use client"

import { useQuery } from "react-query"

import useMediaQuery from "~/hooks/use-media"
import DoughnutChart from "~/components/ui/doughnut-chart"
import { getMotorcycleBookedData } from "~/app/requests"

import styles from "./style.module.scss"

const PieBig = (props) => {
  const { startDate, virtualDealerArea } = props
  const { data } = useQuery({
    queryKey: ["motorcycle-booked", { virtualDealerArea, startDate }],
    queryFn: getMotorcycleBookedData,
  })
  const isSmallScreen = useMediaQuery(767)
  const optionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: isSmallScreen ? "bottom" : "right",
        labels: {
          fontSize: 20,
          color: "white",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
  }
  const doughnutChartData = {
    labels: data?.data?.data[0]?.modelsArray,
    datasets: [
      {
        label: "My First Dataset",
        data: data?.data?.data[0]?.countsArray,
        backgroundColor: [
          "#F1DF67",
          "#D2635B",
          "#403E3E",
          "#DA291C",
          "#F28823",
        ],
        borderColor: ["#686868"],
        hoverOffset: 4,
        borderWidth: 0.2,
      },
    ],
  }

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart

      ctx.save()
      ctx.font = "bolder 20px sans-serif"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "center"
      ctx.fillText(
        data?.datasets[0]?.data?.reduce((acc, curr) => acc + curr),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      )
    },
  }

  return (
    <div className={`${styles.pieBigContainer} ${props.containerStyle}`}>
      <h5>{props.title} </h5>

      {data?.data?.data[0]?.modelsArray.length > 0 ? (
        <div className="h-100 d-flex align-items-center w-full">
          <DoughnutChart
            size={220}
            options={optionsDoughnut}
            data={doughnutChartData}
            plugins={[textCenter]}
          />
        </div>
      ) : (
        <div className={styles.noDataStyle}>
          <div className={styles.assetsStyle}>
            <span> N/A</span>
          </div>
          <div className={styles.textStyle}>
            <span className={styles.dot}></span>
            N/A
          </div>
        </div>
      )}
    </div>
  )
}

export default PieBig
