import React, { useState, useEffect } from 'react';
import Axios from "axios";


function MainTable() {
  const [id, setId] = useState(0)
  const [fornavn, setFornavn] = useState("")
  const [etternavn, setEtternavn] = useState("")

  const [studentList, setStudentList] = useState([])
  
  function getStudents () {
      Axios.get(`http://localhost:3001/getstudents`)
        .then(res => {
          const students = res.data;
          setStudentList(students);
        })
  }

  useEffect(() => {
    getStudents()
    console.log("effect");
  }, [])

  return (
    <>
      {studentList.map((val, key) => {
          return (
              <div>
                <h3>ID: {val.id}</h3>
                <h3>Fornavn: {val.fornavn}</h3>
                <h3>Etternavn: {val.etternavn}</h3>
              </div>)})
      }
    
    </>
  
  )};

export default MainTable;
