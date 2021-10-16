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
        <Card.Title>Dagsoversikt</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugit
          sint minima ipsum iure totam necessitatibus! Eveniet natus recusandae
          itaque ipsam officia fugit molestiae deleniti. Adipisci excepturi iure
          veritatis nemo molestias blanditiis, commodi veniam ipsum qui rerum
          odio perspiciatis nihil cum libero explicabo voluptas porro odit, id,
          dolorum hic aliquid.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MainPageCard;
