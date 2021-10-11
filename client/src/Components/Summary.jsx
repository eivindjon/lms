import React from "react";
import { Container, Row, Col } from "react-bootstrap";

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
  const data = props.data;
  const mergedMonthsData = data.reduce(function (result, field, index) {
    result[months[index]] = field;
    return result;
  }, {});
  const totalAbsent = data.reduce((a, b) => a + b, 0);
  console.log("total days absent: ", totalAbsent);
  return (
    <Container>
      <h3>Antall fraværsdager hittil: {totalAbsent} </h3>
      <Row>
        <Col>
          <p>Januar: {mergedMonthsData.Januar}</p>
        </Col>
        <Col>
          <p>Februar: {mergedMonthsData.Februar}</p>
        </Col>
        <Col>
          <p>Mars: {mergedMonthsData.Mars}</p>
        </Col>
        <Col>
          <p>April: {mergedMonthsData.April}</p>
        </Col>
        <Col>
          <p>Mai: {mergedMonthsData.Mai}</p>
        </Col>
        <Col>
          <p>Juni: {mergedMonthsData.Juni}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Juli: {mergedMonthsData.Juli}</p>
        </Col>
        <Col>
          <p>August: {mergedMonthsData.August}</p>
        </Col>
        <Col>
          <p>September: {mergedMonthsData.September}</p>
        </Col>
        <Col>
          <p>Oktober: {mergedMonthsData.Oktober}</p>
        </Col>
        <Col>
          <p>November: {mergedMonthsData.November}</p>
        </Col>
        <Col>
          <p>Desember: {mergedMonthsData.Desember}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
