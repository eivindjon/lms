import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom'

function UserDetails() {
  const [absenceList, setAbsenceList] = useState([]);

  // Gets students from database on load (using useEffect)
  function getStudentAbsense() {
    const id = useLocation();
    Axios.get(`http://localhost:3001/getstudents/`+id.location.pathname).then((res) => {
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
      <Container>
        <Table striped bordered hover size="sm">
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
                      id={students.id}
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
      </Container>
    </>
  );
}

export default UserDetails;
