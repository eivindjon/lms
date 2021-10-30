import React from "react";
import { useState } from "react";
import {
  Container,
  Button,
  Row,
  Form,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import DatePicker from "./DatePicker";
import Axios from "axios";
import TimePicker from "./TimePicker";

function CreateSubjectPlan() {
  const [description, setDescription] = useState("desc");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState("10:00:00");
  const [note, setNote] = useState("note");
  const [subject_subjectID, setSubject_subjectID] = useState(99);
  const [class_classID, setClass_classID] = useState(99);
  const [color, setColor] = useState("");

  function getStartDate(value) {
    setStartDate(value);
  }

  function getEndDate(value) {
    setEndDate(value);
  }

  function getStartTime(value) {
    let localString = value.toLocaleTimeString("nb-NO");
    setStartTime(localString);
  }
  function getEndTime(value) {
    let localString = value.toLocaleTimeString("nb-NO");
    setEndTime(localString);
  }

  function getColor(value) {
    setColor(value.target.value);
  }

  function getDescription(value) {
    setDescription(value.target.value);
  }

  function getNote(value) {
    setNote(value.target.value);
  }

  const log = () => {
    console.log("StartDate: ", startDate);
    console.log("EndDate: ", endDate);
    console.log("StartTime: ", startTime);
    console.log("EndTime: ", endTime);
    console.log("Subject value: ", subject_subjectID);
    console.log("ClassID", class_classID);
    console.log("Description:", description);
    console.log("Note: ", note);
    console.log("Color:", color);
  };

  function insertSubject(
    defaultDescription,
    startDate,
    endDate,
    startTime,
    endTime,
    defaultNote,
    subjectID,
    classID,
    color
  ) {
    const subjectPlan = {
      defaultDescription: defaultDescription,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      defaultNote: defaultNote,
      subjectID: subjectID,
      classID: classID,
      color: color,
    };
    console.log("Firing insertSubject with req:", subjectPlan)
    Axios.post(`http://localhost:3001/insertlesson`, subjectPlan).then(
      (res) => {
        if (res.status === 200) {
          console.log("Inserted plan for subject");
        } else if (
          res.status === 400 ||
          res.status === 404 ||
          res.status === 500
        ) {
          console.log("No good status");
        }
      }
    );
  }
  // TODO: fortsette å lage form. Legge inn validation før submit-button. Viktig at det ikke blir lagt inn verdier på feil format i database.
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Button onClick={log} className="mt-3 mb-3">
              Log values
            </Button>
            <Row className="mb-3">
              <Col md={6}>
                <h6>Semesterstart</h6>
                <DatePicker onChange={getStartDate} />
              </Col>
              <Col md={6}>
                <h6>Semesterslutt</h6>
                <DatePicker onChange={getEndDate} />
              </Col>
            </Row>

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="chooseSubject">
                  <Form.Label>Fag</Form.Label>
                  <Form.Select
                    aria-label="Velg fag"
                    onChange={(e) => setSubject_subjectID(e.target.value)}
                  >
                    <option>Velg fag</option>
                    <option value="1">Matematikk</option>
                    <option value="2">Naturfag</option>
                    <option value="3">Programmering</option>
                    <option value="4">Fysak</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="chooseClass">
                  <Form.Label>Klasse</Form.Label>
                  <Form.Select
                    aria-label="Velg klasse"
                    onChange={(e) => setClass_classID(e.target.value)}
                  >
                    <option>Velg Klasse</option>
                    <option value="1">9E</option>
                    <option value="2">8D</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Timen begynner..</Form.Label>
                  <TimePicker onChange={getStartTime} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Timen slutter..</Form.Label>
                  <TimePicker onChange={getEndTime} />
                </Form.Group>
              </Row>
              <Form.Label>Standardtekst</Form.Label>
              <FloatingLabel
                controlId="Tekst som vises når det ikke er planlagt noe"
                label="Tekst som vises når det ikke er planlagt noe"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Dette vil vises når du ikke har lagt inn en plan for timen"
                  style={{ height: "100px" }}
                  className="mb-3"
                  onInput={getDescription}
                />
              </FloatingLabel>
              <Form.Label>Standardnotat</Form.Label>
              <FloatingLabel
                controlId="Notat"
                label="Notat som vises når det ikke er lagt inn notat til timen."
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="standardtekst"
                  onInput={getNote}
                />
              </FloatingLabel>
              <Form.Label htmlFor="lessonColorInput">Velg en farge</Form.Label>
              <Form.Control
                type="color"
                id="ColorInput"
                defaultValue="#563d7c"
                title="Velg en farge"
                className="mb-3"
                onChange={getColor}
              />
            </Form>
            <Button
              variant="primary"
              onClick={() => insertSubject(
                description,
                startDate,
                endDate,
                startTime,
                endTime,
                note,
                subject_subjectID,
                class_classID,
                color
              )}
            >
              Legg Til Fag
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateSubjectPlan;
