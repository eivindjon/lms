import React from "react";

const Summary = (props) => {
    const months =["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
    const data = props.data;
    const mergedMonthsData = data.reduce(function(result, field, index) {
        result[months[index]] = field;
        return result;
      }, {})
    const totalAbsent = data.reduce((a, b) => a + b, 0)
    console.log("total days absent: ", totalAbsent)
  return (
  <div>
      <h3>Antall fraværsdager hittil: {totalAbsent} </h3>
      <p>Januar: {mergedMonthsData.Januar}</p>
      <p>Februar: {mergedMonthsData.Februar}</p>
      <p>Mars: {mergedMonthsData.Mars}</p>
      <p>April: {mergedMonthsData.April}</p>
      <p>Mai: {mergedMonthsData.Mai}</p>
      <p>Juni: {mergedMonthsData.Juni}</p>
      <p>Juli: {mergedMonthsData.Juli}</p>
      <p>August: {mergedMonthsData.August}</p>
      <p>September: {mergedMonthsData.September}</p>
      <p>Oktober: {mergedMonthsData.Oktober}</p>
      <p>November: {mergedMonthsData.November}</p>
      <p>Desember: {mergedMonthsData.Desember}</p>
  
  </div>
  );
};

export default Summary;
