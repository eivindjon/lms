import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button, Col } from "react-bootstrap";
import { useLocation } from 'react-router-dom'



function AbsenseTable() {
  const [absenceList, setAbsenceList] = useState([]);
  
  const location = useLocation();


  // Gets students from database on load (using useEffect)
  function getStudentAbsense() {
    
    console.log("Value of useLocation.location.pathname: ", location.pathname);
    Axios.get(`http://localhost:3001${location.pathname}`).then((res) => {
      const absense = res.data;
      setAbsenceList(absense);
    });
  }
  // Making the request to get students from db only ONCE. When render is complete. Instead of ComponentDidMount();
  useEffect(() => {

    getStudentAbsense();
    // eslint-disable-next-line
  }, []);



  function handleClick(event) {
    console.log(event.target.id);
  }
  return (
    <>
      <Container fluid="sm">
      <Col sm={8}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Fornavn</th>
              <th>Etternavn</th>
              <th>Valg</th>
            </tr>
          </thead>
          <tbody>
            {absenceList.map((fravær) => {
              return (
                <tr key={fravær.id}>
                  <td>{fravær.dato}</td>
                  <td>{fravær.fornavn}</td>
                  <td>{fravær.etternavn}</td>
                  <td>
                    <Button
                      id={fravær.id}
                      onClick={handleClick}
                    >
                      Endre
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        </Col>
        <Col sm={4}>
        <h1>CHART HERE</h1> 
        </Col>
      </Container>
    </>
  );
}

export default AbsenseTable;
