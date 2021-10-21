import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import LogCustomModal from "./LogCustomModal";
import MainPageCard from "./MainPageCard";

function MainTable() {
  const [studentList, setStudentList] = useState([]);
  //const [day, setDay] = useState(new Date());

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
    //getLessons();
    // eslint-disable-next-line
  }, []);

 
  function addToList(studentID) {
    const absentStudent = { id: studentID };
    Axios.post(`http://localhost:3001/post_absent`, absentStudent).then(
      (res) => {
        if (res.status === 200) {
          console.log("Absence logged", studentID);
        } else if (res.status === 400) {
          console.log("No good status");
        }
      }
    );
  }

  function handleClick(event) {
    addToList(event.target.id);
    //Make this use state and if disabled === true, then remove it from the list, else add to the list again.
    event.target.disabled = true;
  }
  return (
    <>
      <Container>
        <h1 className="text-center mb-5 mt-5">God dag "user"</h1>

        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <MainPageCard />
          </Col>
          <Col md={6}>
            <Table striped bordered hover>
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
                    <tr key={students.studentID}>
                      <td>{students.studentID}</td>
                      <td>{students.firstName}</td>
                      <td>{students.lastName}</td>
                      <td>
                        <Button
                          id={students.studentID}
                          onClick={handleClick}
                          disabled={false}
                          size="sm"
                        >
                          Borte!
                        </Button>
                        <Button
                          size="sm"
                          id="sefravær"
                          href={`UserStats/${students.studentID}`}
                        >
                          Se Fravær
                        </Button>
                        <LogCustomModal
                          userid={students.studentID}
                          username={students.firstName + " " + students.lastName}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainTable;
