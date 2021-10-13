import React from "react";
import { useState, useEffect } from "react";
import { Container, Button, Col, Row, Form, Modal } from "react-bootstrap";
import Axios from "axios";
import DatePicker from "./DatePicker";

function LogCustomModal(props) {
  const [show, setShow] = useState(false);
  const [pickdate, setpickDate] = useState(new Date())
  const user = props.userid
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addCustom(studentId, Date) {
    const absentStudent = { 
      id: studentId,
      dato: Date
    };
    // TODO Create server route to post custom absent students
    Axios.post(`http://localhost:3001/post_absent_custom`, absentStudent).then(
      (res) => {
        if (res.status === 200) {
          console.log("Absence logged", studentId);
        } else if (res.status === 400) {
          console.log("No good status");
        }
      }
    );
  }

  function getDate() {
    setpickDate(date);
  }


  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        Egendefinert tidsrom
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logg nytt fravær</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker onChange={getDate}/>
        </Modal.Body>
        <Modal.Footer>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogCustomModal;
