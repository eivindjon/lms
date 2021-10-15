import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const propdata = props.data;
  //https://gist.github.com/mlocati/7210513 -- Gets a gradient from red to green based on percentage
  function percentToColor(perc, min, max) {
    var base = max - min;

    if (base === 0) {
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

  console.log("Raw data", propdata);
  let colors = [];
  function percentageColors(array) {
    array.forEach(function (data) {
      colors.push(percentToColor(data, 5, 0));
    });
  }
  percentageColors(propdata);

  const data = {
    labels: [
      "Januar",
      "Februar",
      "Mars",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Fraværsdager",
        data: propdata,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          display: true,
          gridLines: {
            color: "rgb(210,210,211)",
          },
        },
      ],
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
