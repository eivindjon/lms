import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button } from "react-bootstrap";

function MainTable() {
  const [studentList, setStudentList] = useState([]);
  //const [absenceList, setAbsenceList] = useState([]);

  // Gets students from database on load (using useEffect)
  function getStudents() {
    Axios.get(`http://localhost:3001/getstudents`).then((res) => {
      const students = res.data;
      setStudentList(students);
    });
  }
  // Making the request to get students from db only ONCE. When render is complete. Instead of ComponentDidMount();
  useEffect(() => {
    getStudents();
    console.log(studentList);
    // eslint-disable-next-line
  }, []);

  // poster dobbelt når man refresher osv.. Vet ikke helt hva som skjer her. Tror jeg må fikse noe med .then funksjonen. Legge inn en if res = 200 ->all good eller no.
  function addToList(studentId) {
    const absentStudent = { id: studentId };
    Axios.post(`http://localhost:3001/post_absent`, absentStudent).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("all good. Request status 200");
        } else if (res.status === 400) {
          console.log("No good status");
        }
      }
    );
  }

  function handleClick(event) {
    console.log(event.target.id);
    addToList(event.target.id);
    event.target.disabled = true;
  }
  return (
    <>
      <Container>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>#</th>
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

export default MainTable;
