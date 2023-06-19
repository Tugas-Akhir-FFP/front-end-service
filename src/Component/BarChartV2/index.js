import { Chart as ChartJS } from "chart.js/auto";
import React, { useRef, useEffect } from "react";

const MultiBarChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: ["MAPE", "MSE", "RMSE", "MAE"],
        datasets: [
          {
            label: "Rendah",
            data: [0.1, 0.2, 0.3, 0.4],
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
      <canvas ref={chartRef} id={props.id} height={400} />
    </div>
  );
}

export default MultiBarChart;