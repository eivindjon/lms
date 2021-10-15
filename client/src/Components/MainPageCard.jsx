import React from "react";
import { Card, Button } from "react-bootstrap";

function MainPageCard(props) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("nb-NO", options);
  const todayCap = today.charAt(0).toUpperCase() + today.slice(1);
  return (
    <Card>
      <Card.Header as="h5">{todayCap}</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MainPageCard;
