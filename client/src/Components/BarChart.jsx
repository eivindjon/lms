import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  console.log(props)
  
  return (
    <div>
    <Bar
      
      width={400}
      height={300}
    />
    </div>
  );
};

export default BarChart;
