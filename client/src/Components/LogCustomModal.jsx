import React from "react";
import { useState, useEffect } from "react";
import { Container, Button, Col, Row, Form, Modal } from "react-bootstrap";
import Axios from "axios";
import DatePicker from "./DatePicker";

function LogCustomModal(props) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [pickDate, setpickDate] = useState(new Date());
  const userid = props.userid;
  const username = props.username;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAlert = () => setAlert(true);
  const handleAlertClose = () => setAlert(false);


  function addCustom(studentId, date) {
    const absentStudent = {
      id: studentId,
      dato: date,
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
  // Gets value from datepicker child component
  function getDate(value) {
    // Convert Date value to string accepted in DB: dd
    const norskTid = Intl.DateTimeFormat("en-GB").format(value)
    const norskTidString = norskTid.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/").join("-");
    
    setpickDate(norskTidString);
  }

  function handleClick(e) {
    addCustom(userid, pickDate);
  }
  // TODO: Make a small popup that confirms logging of absense --- Example from bootstrap docs to take a look at for creating alert child component
  // function AlertDismissibleExample() {
  //   const [show, setShow] = useState(true);
  
  //   if (show) {
  //     return (
  //       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
  //         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  //         <p>
  //           Change this and that and try again. Duis mollis, est non commodo
  //           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
  //           Cras mattis consectetur purus sit amet fermentum.
  //         </p>
  //       </Alert>
  //     );
  //   }
  //   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  // }
  
  // render(<AlertDismissibleExample />);
  
  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        Egendefinert tidsrom
      </Button>

      <Modal show={show} onHide={handleClose}>
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
      Lagre</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogCustomModal;
