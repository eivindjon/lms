import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

function MainPageCard(props) {
  const [day, setDay] = useState(new Date());
  const [weekday, setWeekday] = useState("Unknown");

  const capper = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    };
    let toString = date.toLocaleDateString("nb-NO", options);
    let capitals = toString.charAt(0).toUpperCase() + toString.slice(1);
    return capitals;
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const handleClickNext = () => {
    console.log("Nextday");
    setDay(addDays(day, 1));
  };

  const handleClickPrev = () => {
    console.log("Prevday");
    setDay(subDays(day, 1));
  };

  return (
    <Card>
      <Card.Header as="h5">
        {capper(day)}
        <div className="float-end">
          <Button  onClick={handleClickPrev}>
            <ArrowLeft/>
          </Button>
          <Button className="ms-2" onClick={handleClickNext}><ArrowRight/>
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card variant="success">
          <Card.Header as="h7">
            Samfunnsfag
          </Card.Header>
          <Card.Body>
              <Card.Text>
                YOYOYO
              </Card.Text>
            </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default MainPageCard;
