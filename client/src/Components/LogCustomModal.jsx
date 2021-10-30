import React from "react";
import { useState, useRef } from "react";
import { Button, Form, Modal, Fade } from "react-bootstrap";
import Axios from "axios";
import DatePicker from "./DatePicker";
import DismissableAlert from "./DismissableAlert";
import { CalendarRange } from "react-bootstrap-icons";

function LogCustomModal(props) {
  const [show, setShow] = useState(false);
  const [pickDate, setpickDate] = useState(new Date());
  const userid = props.userid;
  const username = props.username;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const childRef = useRef();

  function addCustom(studentId, date) {
    const absentStudent = {
      student_studentID: studentId,
      date: date,
    };
    
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
  // Gets value from datepicker child component
  function getDate(value) {
    // Convert Date value to string accepted in DB: dd
    const norskTid = Intl.DateTimeFormat("en-CA").format(value);
    const norskTidString = norskTid.toLocaleString('en-CA') 
    setpickDate(norskTidString);

  }

  function handleClick(e) {
    addCustom(userid, pickDate);
    childRef.current.showAlert();
  }

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow} className="mb-2">
        <CalendarRange/> Egendefinert
      </Button>

      <Modal show={show} onHide={handleClose}>
        <DismissableAlert ref={childRef} in={Fade} />
        <Modal.Header closeButton>
          <Modal.Title>Logg nytt fravær for {username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker onChange={getDate} />
        </Modal.Body>
        <Modal.Footer>
          <Form.Select aria-label="Default select example">
            <option>Fraværsårsak</option>
            <option value="Korona høst 2021">Korona høst 2021</option>
            <option value="Permisjon">Permisjon</option>
            <option value="Lege/tannlege">Lege/tannlege</option>
          </Form.Select>
          <Button variant="secondary" onClick={handleClose}>
            Lukk
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Lagre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogCustomModal;
