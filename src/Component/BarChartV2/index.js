import { Chart as ChartJS } from "chart.js/auto";
import React, { useRef, useEffect, useState } from "react";

const MultiBarChart = (props) => {
  const chartRef = useRef(null);
  const [state, setState] = useState({
    temperature: [],
    humidity: [],
    wind: [],
    rainfall: []
  });
  const { temperature, humidity, wind, rainfall } = state;
  useEffect(() => {
    if (props?.data?.length > 0) {
      setState({
        temperature: props?.data[0]?.Temperature,
        humidity: props?.data[1]?.Humidity,
        wind: props?.data[2]?.Wind,
        rainfall: props?.data[3]?.Rainfall,
      });
    }
  }, [props?.data])
  useEffect(() => {
    const chartInstance = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: ["MAPE", "MSE", "RMSE", "MAE","R-Square"],
        datasets: [
          {
            label: "Temperature",
            data: [temperature?.MAPE, temperature?.MSE, temperature?.RMSE, temperature?.MAE, temperature?.R2],
            backgroundColor: "rgba(252, 11, 3)",
            borderColor: "rgba(252, 11, 3)",
            borderWidth: 1,
          },
          {
            label: "Humidity",
            data: [humidity?.MAPE, humidity?.MSE, humidity?.RMSE, humidity?.MAE, humidity?.R2],
            backgroundColor: "rgba(252, 11, 3)",
            borderColor: "rgba(252, 11, 3)",
            borderWidth: 1,
          },
          {
            label: "Wind",
            data: [wind?.MAPE, wind?.MSE, wind?.RMSE, wind?.MAE, wind?.R2],
            backgroundColor: "rgba(252, 11, 3)",
            borderColor: "rgba(252, 11, 3)",
            borderWidth: 1,
          },
          {
            label: "Rainfall",
            data: [rainfall?.MAPE, rainfall?.MSE, rainfall?.RMSE, rainfall?.MAE, rainfall?.R2],
            backgroundColor: "rgba(252, 11, 3)",
            borderColor: "rgba(252, 11, 3)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [humidity?.MAE, humidity?.MAPE, humidity?.MSE, humidity?.R2, humidity?.RMSE, props, rainfall?.MAE, rainfall?.MAPE, rainfall?.MSE, rainfall?.R2, rainfall?.RMSE, temperature?.MAE, temperature?.MAPE, temperature?.MSE, temperature?.R2, temperature?.RMSE, wind?.MAE, wind?.MAPE, wind?.MSE, wind?.R2, wind?.RMSE]);

  return (
    <div>
      <canvas ref={chartRef} id={props.id} height={400} />
    </div>
  );
}

export default MultiBarChart;