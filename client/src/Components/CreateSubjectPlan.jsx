import React from "react";
import { useState } from "react";
import { Container, Button, Row, Form, Col } from "react-bootstrap";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

function CreateSubjectPlan() {
  const [description, setDescription] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState("10:00:00");
  const [note, setNote] = useState("note");
  const [subject_subjectID, setSubject_subjectID] = useState(99);
  const [class_classID, setClass_classID] = useState(99);

  function getStartDate(value) {
    // Convert Date value to string accepted in DB: dd
    const norskTid = Intl.DateTimeFormat("en-CA").format(value);
    const norskTidString = norskTid.toLocaleString("en-CA");
    setStartDate(norskTidString);
  }

  function getEndDate(value) {
    // Convert Date value to string accepted in DB: dd
    const norskTid = Intl.DateTimeFormat("en-CA").format(value);
    const norskTidString = norskTid.toLocaleString("en-CA");
    setEndDate(norskTidString);
  }

  function getStartTime(value) {
    let localString = value.toLocaleTimeString("nb-NO");
    setStartTime(localString);
  }
  function getEndTime(value) {
    let localString = value.toLocaleTimeString("nb-NO");
    setEndTime(localString);
  }

  const log = () => {
    console.log("StartDate: ", startDate);
    console.log("EndDate: ", endDate);
    console.log("StartTime: ", startTime);
    console.log("EndTime: ", endTime);
    console.log("Subject value: ", subject_subjectID);
  };
  // TODO: fortsette å lage form. Legge inn validation før submit-button. Viktig at det ikke blir lagt inn verdier på feil format i database.
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <DatePicker onChange={getStartDate} />
            <DatePicker onChange={getEndDate} />
            <TimePicker onChange={getStartTime} />
            <TimePicker onChange={getEndTime} />
            <Button onClick={log} className="mt-3">
              Log values
            </Button>

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Select aria-label="Velg fag" onChange={(e) => setSubject_subjectID(e.target.value)}>
                    <option>Velg fag</option>
                    <option value="1">Matematikk</option>
                    <option value="2">Naturfag</option>
                    <option value="3">Programmering</option>
                    <option value="4">Fysak</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateSubjectPlan;
