import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import DoughnutSummary from "./DoughnutSummary";

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
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Januar} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Februar} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Mars} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.April} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Mai} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Juni} />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Juli} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.August} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.September} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Oktober} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.November} />
        </Col>
        <Col md={2} className="summary-month">
          <DoughnutSummary data={mergedMonthsData.Desember} />
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
