import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const DoughnutChart = (props) => {
  const propdata = [props.data];

  //https://gist.github.com/mlocati/7210513 -- Gets a gradient from red to green based on percentage
  function percentToColor(perc, min, max) {
    var base = max - min;

    if (base == 0) {
      perc = 100;
    } else {
      perc = ((perc - min) / base) * 100;
    }
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }
  const percentage = percentToColor(props.data, 5, 0);

  console.log(propdata);
  const data = {
    labels: ["dager"],
    datasets: [
      {
        data: propdata,
        backgroundColor: [percentage],
        borderColor: [percentage],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        textAlign: "center",
        align: "center",
        color: "black",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
