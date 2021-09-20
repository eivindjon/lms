import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";

// const [studentList, setStudentList] = useState([]);

// const getStudents = () => {
//   Axios.get("http://localhost:3001/getstudents").then((response) => {
//     setStudentList(response.data);
//   });
// };

function MainTable() {
  return (
    <Container className="mt-5">
      <Button onClick={console.log("Hey")}> Hey</Button>
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default MainTable;
