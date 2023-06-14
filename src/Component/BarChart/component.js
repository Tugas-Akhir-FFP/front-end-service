import { Chart as ChartJS } from "chart.js/auto";
import React, { useRef, useEffect } from "react";

const MultiBarChart = (props) => {
  console.log(props)
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: props.label[0],
        datasets: [
          {
            label: "Rendah",
            data: props.rendah[0],
            backgroundColor: "rgba(11, 2, 250, 1)",
            borderColor: "rgba(11, 2, 250, 1)",
            borderWidth: 1,
          },
          {
            label: "Sedang",
            data: props.sedang[0],
            backgroundColor: "rgba(3, 255, 11)",
            borderColor: "rgba(3, 255, 11)",
            borderWidth: 1,
          },
          {
            label: "Tinggi",
            data: props.tinggi[0],
            backgroundColor: "rgba(250, 229, 2)",
            borderColor: "rgba(250, 229, 2)",
            borderWidth: 1,
          },
          {
            label: "Sangat Tinggi",
            data: props.sangatTinggi[0],
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
  }, [props]);

  return (
    <div>
      <canvas ref={chartRef} id="myBarChart" height={400}/>
    </div>
  );
}

export default MultiBarChart;