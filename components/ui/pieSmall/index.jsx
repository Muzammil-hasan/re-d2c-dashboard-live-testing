"use client"

import React from "react"
import get from "lodash.get"
import { IoIosArrowForward } from "react-icons/io"
import { useQuery } from "react-query"

import { getRequestManagementData } from "~/app/requests"

import DoughnutChart from "../doughnut-chart"
import styles from "./style.module.scss"

const _ = { get }

const PieSmall = (props) => {
  const { startDate, virtualDealerArea } = props
  const { data } = useQuery({
    queryKey: ["request-management", { startDate, virtualDealerArea }],
    queryFn: getRequestManagementData,
  })

  // constants
  const optionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontSize: 20,
          color: "white",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
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
        backgroundColor: ["#F1DF67", "#D2635B"],
        hoverOffset: 4,
        borderColor: ["#686868"],
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
    <div className={`${styles.pieSmallContainer} ${props.containerStyle}`}>
      {props.title && (
        <div>
          <h5>{props.title}</h5> {props.icon && <IoIosArrowForward />}
        </div>
      )}

      {data?.data?.data[0]?.countsArray.length > 0 ? (
        <div style={{ height: props.graphHeight }}>
          <DoughnutChart
            size={200}
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

export default PieSmall
