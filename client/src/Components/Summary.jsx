import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";

const Summary = (props) => {
  const months = [
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
  ];
  const mergedMonthsData = props.data.reduce(function (result, field, index) {
    result[months[index]] = field;
    return result;
  }, {});

  const totalAbsent = props.data.reduce((a, b) => a + b, 0);

  console.log("total days absent: ", totalAbsent);
  return <Container></Container>;
};

export default Summary;
