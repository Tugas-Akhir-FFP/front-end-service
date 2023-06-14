import { Chart as ChartJS } from "chart.js/auto";
import React, { useRef, useEffect } from "react";
const Chart = ({data}) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    const hoveredXLinePlugin = {
      afterDatasetsDraw: (chart) => {
        const { ctx } = chart;
        if (chart?.tooltip?._active && chart?.tooltip?._active.length) {
          const activePoint = chart?.tooltip?._active[0];
          const { x, y } = activePoint.element
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, chart.chartArea.bottom);
          ctx.lineTo(x, y);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(25, 40, 65, 0.5)';
          ctx.stroke();
          ctx.restore();
        }
      },
    };

    const hoverPointShadowPlugin = {
      afterDatasetsDraw: (chart) => {
        const { ctx } = chart;
        if (chart?.tooltip?._active && chart?.tooltip?._active.length) {
          const activePoint = chart.tooltip._active[0];
          const { x, y } = activePoint.element
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = 'transparent';
          ctx.fill();
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(25, 40, 65, 0.5)';
          ctx.stroke();
          ctx.restore();
        }
      },
    };
    const hoveredYLinePlugin = {
      afterDatasetsDraw: (chart) => {
        const { ctx } = chart;
        if (chart?.tooltip?._active && chart?.tooltip?._active.length) {
          const activePoint = chart?.tooltip?._active[0];
          const { x, y } = activePoint.element
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, y);
          ctx.lineTo(x, y);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(25, 40, 65, 0.5)';
          ctx.stroke();
          ctx.restore();
        }
      },
    };
    const plugins = [hoveredXLinePlugin, hoverPointShadowPlugin, hoveredYLinePlugin];
 
    new ChartJS(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [
          {
            label: "Fire Weather Index",
            data: data[0],
            borderColor: "#192841",
            backgroundColor: "#192841",
            tension: 0.4,
            borderCapStyle: "butt",
            pointHoverRadius: 5,
            pointRadius: 1,
            borderWidth: 6,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "#192841",
            pointHoverBorderColor: "#192841",
            pointHoverBorderWidth: 2,
            pointStyle: "circle",
            pointRotation: 0,
            pointBorderWidth: 1,
            pointBorderColor: "#192841",
            pointBackgroundColor: "#192841",

            
          },
          
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        fillStyle:"red",
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              color: "#000000",
              font: {
                size: 10,
                weight: 500,
              },
            },
          },
          // tooltip: {
          //   mode: "index",
          //   callbacks: {
          //     label: function (tooltipItem) {
          //       if (tooltipItem.formattedValue <= 1) {
          //         return "Intensitas Kebakaran Rendah";
          //       } else if (tooltipItem.formattedValue <= 1.5) {
          //         return "Intensitas Kebakaran Mendekati Rendah";
          //       } else if (tooltipItem.formattedValue < 2) {
          //         return "Intensitas Kebakaran Mendekati Sedang";
          //       } else if (tooltipItem.formattedValue <= 6) {
          //         return "Intensitas Kebakaran Sedang";
          //       } else if (tooltipItem.formattedValue <= 6.5) {
          //         return "Intensitas Kebakaran Mendekati Sedang"
          //       } else if (tooltipItem.formattedValue < 7) {
          //         return "Intensitas Kebakaran Mendekati Tinggi"
          //       } else if (tooltipItem.formattedValue <= 13) {
          //         return "Intensitas Kebakaran Tinggi"
          //       } else if (tooltipItem.formattedValue > 13) {
          //         return "Intensitas Kebakaran Sangat Tinggi"
          //       }
          //     },
          //     title: function (tooltipItem) {
          //       return tooltipItem[0].label;
          //     },
          //     labelColor: function (tooltipItem) {
          //       if (tooltipItem.formattedValue < 1) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "#0c00ef",
          //         };
          //       } else if (tooltipItem.formattedValue <= 1.5) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "#0c00ef",
          //         };
          //       }
          //       else if (tooltipItem.formattedValue < 2) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "green",
          //         };
          //       } else if (tooltipItem.formattedValue <= 6) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "green",
          //         };
          //       } else if (tooltipItem.formattedValue <= 6.5) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "green",
          //         };
          //       } else if (tooltipItem.formattedValue < 7) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "#f0f00f",
          //         };
          //       } else if (tooltipItem.formattedValue <= 13) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "#f0f00f",
          //         };
          //       } else if (tooltipItem.formattedValue > 13) {
          //         return {
          //           borderColor: "#FFF",
          //           backgroundColor: "#f00",
          //         };
          //       }
          //     },
          //   }
          // },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            }
          },
          y: {
            grid: {
              display: true,
              drawBorder: false,
            }
          },
        },

      },
      plugins: plugins,
    });
  }, [data]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
}

export default Chart;