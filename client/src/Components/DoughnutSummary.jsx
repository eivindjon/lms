import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  const propdata = [props.data];
  console.log(propdata);
  const data = {
    labels: ["dager"],
    datasets: [
      {
        label: "Fraværsdager",
        data: propdata,
        backgroundColor: ["rgba(255, 99, 132)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
