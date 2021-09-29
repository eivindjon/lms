import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container, Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BarChart from "./BarChart";
import Summary from "./Summary";

function AbsenseTable() {
  const [absenceList, setAbsenceList] = useState([]);
  const [monthCounter, setMonthCounter] = useState(new Array(12).fill(0));
  const [userName, setUserName] = useState("Unknown user")
  const location = useLocation();


  //Function to get month part of absense, a part of the dataset prep for the chart on UserStats.
  function convertDates(object) {
    const dates = object;
    let months = [];
    // Splits dates object into array of strings
    dates.forEach((date) => months.push(date.dato.split("-")));

    //Double map for å komme inn i subarray [[],[]] og konvertere disse til INT.
    var monthsInt = months.map(function (subarray) {
      return subarray.map(function (string) {
        return parseInt(string);
      });
    });
    return monthsInt;
  };

  function updateMonthsCounterFromArray(monthsInt) {
    // Stage changes før setstate
    let stagedMonths = new Array(12).fill(0);
    //Phew, denne var støgg.. Pusher inn i array monthsCounter som teller hvor mange forekomster det er i hver måned. Prepper datamateriale for chart.

    for (var i = 0; i < monthsInt.length; i++) {
      if (monthsInt[i][1] === 1) {
        stagedMonths[0] += 1;
      } else if (monthsInt[i][1] === 2) {
        stagedMonths[1] += 1;
      } else if (monthsInt[i][1] === 3) {
        stagedMonths[2] += 1;
      } else if (monthsInt[i][1] === 4) {
        stagedMonths[3] += 1;
      } else if (monthsInt[i][1] === 5) {
        stagedMonths[4] += 1;
      } else if (monthsInt[i][1] === 6) {
        stagedMonths[5] += 1;
      } else if (monthsInt[i][1] === 7) {
        stagedMonths[6] += 1;
      } else if (monthsInt[i][1] === 8) {
        stagedMonths[7] += 1;
      } else if (monthsInt[i][1] === 9) {
        stagedMonths[8] += 1;
      } else if (monthsInt[i][1] === 10) {
        stagedMonths[9] += 1;
      } else if (monthsInt[i][1] === 11) {
        stagedMonths[10] += 1;
      } else if (monthsInt[i][1] === 12) {
        stagedMonths[11] += 1;
      } else {
        console.log("outside month range");
      }
    }

    setMonthCounter(stagedMonths);
  }


  // Gets students from database on load (using useEffect)
  function getStudentAbsense() {
    // Using useLocation() to get path with studentID. This is passed to backend to perform query.
    Axios.get(`http://localhost:3001${location.pathname}`).then((res) => {
      const absense = res.data;
      setAbsenceList(absense);
      updateMonthsCounterFromArray(convertDates(absense));
      if (absense.length !== 0) {
        setUserName(absense[0].fornavn + " " + absense[0].etternavn)
      } else {
        // TODO: CREATE A FUNCTION THAT PULLS STUDENT NAME FROM DB AND CALLS IT HERE.
        Axios.get(`http://localhost:3001${location.pathname}/username`).then((res) => {
          let user = res.data[0].fornavn + " " + res.data[0].etternavn;
          setUserName(user);
        })
      };
    });
  }
  // Making the request to get students from db only ONCE. When render is complete. Instead of ComponentDidMount();
  useEffect(() => {
    getStudentAbsense();
    // eslint-disable-next-line
  }, []);

  function deleteAbsense(absenseID) {
    const deleteAbsense = { fraværID: absenseID };
    Axios.post(`http://localhost:3001/delete_absense`, deleteAbsense).then(
      (res) => {
        if (res.status === 200) {
          console.log("deleted", absenseID);
        } else if (res.status === 400) {
          console.log("No good status");
        }
      }
    );
  }

  function handleClick(event) {
    deleteAbsense(event.target.id);
    function removeAbsenceTable(event) {
      let row = parseInt(event);
      // To get rid of references to the original array
      let arrCopy = [...absenceList];
      //to return all objects in array that doesnt have id of event.target.id
      arrCopy = arrCopy.filter((fravær) => fravær.fraværID !== row);
      //update state
      setAbsenceList(arrCopy);
      updateMonthsCounterFromArray(convertDates(arrCopy));
      
    }
    removeAbsenceTable(event.target.id);
  }
  return (
    <>
      <Container className="mt-5">
        <div><h1>Detaljert fravær for {userName}</h1></div>
        <Row>
          <Col className="mt-4">
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
                    <tr key={fravær.fraværID}>
                      <td>{fravær.dato}</td>
                      <td>{fravær.fornavn}</td>
                      <td>{fravær.etternavn}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          id={fravær.fraværID}
                          onClick={handleClick}
                        >
                          Slett
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col sm={6}>
            <BarChart data={monthCounter} />
            <Summary data={monthCounter} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AbsenseTable;
