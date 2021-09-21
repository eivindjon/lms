import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container } from "react-bootstrap";

function MainTable() {
  const [studentList, setStudentList] = useState([]);
  // let absenceList = [];

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

  // function addToAbcenseList(id) {
  //   absenceList.push(id);
  //   console.log(id, " pushed to absenceList");
  // }

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
            {studentList.map((val, key) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.fornavn}</td>
                  <td>{val.etternavn}</td>
                  <td>SE FRAVÆR</td>
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
