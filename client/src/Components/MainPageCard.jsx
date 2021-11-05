import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft, PencilSquare } from "react-bootstrap-icons";
import Axios from "axios";

function MainPageCard(props) {
  const [day, setDay] = useState(new Date());
  const [weekday, setWeekday] = useState(day.getDay());
  const [staticLessons, setStaticLessons] = useState(false);
  const [lessons, setLessons] = useState([{}]);

  const dailyLessons = {
    0: [],
    1: ["Matematikk 9E", "Matematikk 8D", "Samfunnsfag 9E"],
    2: ["Naturfag 9E", "Matematikk 9E", "Samfunnsfag 9E", "Programmering"],
    3: ["Naturfag 8D", "Matematikk 8D"],
    4: ["Naturfag 9E", "Fysak"],
    5: ["Matematikk 9E", "Samfunnsfag 9E", "Matematikk 8D"],
    6: [],
  };

  const renderLessons = (object, weekday) => {
    console.log(object[weekday]);
  };

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
    setWeekday(result.getDay());
    return result;
  };

  /*   const addHours = (date, hours) => {
    const result = new Date(date);
    result.setTime(result.getTime()+ hours);
    return result;
  } */

  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    setWeekday(result.getDay());
    return result;
  };

  const handleClickNext = () => {
    if (weekday === 5) {
      setDay(addDays(day, 3));
    } else {
      setDay(addDays(day, 1));
    }
  };

  const handleClickPrev = () => {
    if (weekday === 1) {
      setDay(subDays(day, 3));
    } else {
      setDay(subDays(day, 1));
      console.log(day.toLocaleString("en-CA").substr(0, 10));
    }
  };

  useEffect(() => {
    console.log(day, "->Day - Has changed");

    function getLessons() {
      Axios.get(
        `http://localhost:3001/getlessons/${day
          .toLocaleString("en-CA")
          .substr(0, 10)}`
      ).then((res) => {
        const result = res.data;
        setLessons(result);
        console.log(result);
        if (res.length < 1) {
          console.log("No lessons found!");
        }
      });
    }
    getLessons();
  }, [day]); // <-- here put the parameter to listen

  //Querys if there are any planned lessons
  //if result.length < 1
  // setStatic(true)
  // else setLessons(result)
  if (lessons.length > 0) {
    return (
      <Card>
        <Card.Header as="h5">
          {capper(day)}
          <div className="float-end">
            <Button onClick={handleClickPrev}>
              <ArrowLeft />
            </Button>
            <Button className="ms-2" onClick={handleClickNext}>
              <ArrowRight />
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {lessons.map((lesson) => {
            let style = {
              width: "18rem",
              backgroundColor: lesson.color,
            };
            let startTime =
              lesson.startTime && lesson.startTime.substring(0, 5);
            let endTime = lesson.endTime && lesson.endTime.substring(0, 5);
            return (
              <Card style={style} className="mb-2">
                <Card.Body>
                  <Card.Title>{lesson.subject}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    {lesson.className} Kl {startTime} - {endTime}
                  </Card.Subtitle>
                  <Card.Text>{lesson.description}</Card.Text>
                  <div className="float-end">
                    <Button variant="link">
                      <PencilSquare style={{ color: "#000000" }} />
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Card.Text>{lesson.note}</Card.Text>
                </Card.Footer>
              </Card>
            );
          })}
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Header as="h5">
          {capper(day)}
          <div className="float-end">
            <Button onClick={handleClickPrev}>
              <ArrowLeft />
            </Button>
            <Button className="ms-2" onClick={handleClickNext}>
              <ArrowRight />
            </Button>
          </div>
        </Card.Header>
        <Card.Body>No lessons today...</Card.Body>
      </Card>
    );
  }
}

export default MainPageCard;
