import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button } from "react-bootstrap";

function UserDetails() {
  const [absenceList, setAbsenceList] = useState([]);

  // Gets students from database on load (using useEffect)
  function getStudentAbsense(id) {
    const id = 
    Axios.get(`http://localhost:3001/getstudents/`).then((res) => {
      const students = res.data;
      setStudentList(students);
    });
  }
  // Making the request to get students from db only ONCE. When render is complete. Instead of ComponentDidMount();
  useEffect(() => {
    getStudentAbsense();
    // eslint-disable-next-line
  }, []);



  function handleClick(event) {
    console.log(event.target.id);
    event.target.disabled = true;
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
            {studentList.map((students) => {
              return (
                <tr key={students.id}>
                  <td>{students.id}</td>
                  <td>{students.fornavn}</td>
                  <td>{students.etternavn}</td>
                  <td>
                    <Button
                      id={students.id}
                      onClick={handleClick}
                      disabled={false}
                    >
                      Borte!
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
