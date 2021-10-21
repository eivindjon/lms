const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "lms",
});

//Gets all students in DB
app.get("/getstudents", (req, res) => {
  console.log("Running query GET STUDENTS");
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Gets userName for userStats page
app.get("/UserStats/:id/username", (req, res) => {
  var id = req.params.id;
  console.log("Running query - Getting username: ", id);
  db.query(
    "SELECT firstName, lastName FROM student WHERE studentID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Gets all absense from ONE student.

app.get("/UserStats/:id", (req, res) => {
  var id = req.params.id;
  console.log("Running query - Getting absense for student: ", req.params.id);
  db.query(
    "SELECT student.studentID, student.firstName, student.lastName, absence.date, absence.absenceID FROM student, absence WHERE absence.student_studentID = ? AND student.studentID=? ORDER BY absence.date ASC;",
    [id, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Post absent from button in maintable "Borte!"
app.post("/post_absent", (req, res) => {
  console.log("Posting Absent: ", req.body.id);
  // get todays date on format yyyy-mm-dd
  const today = new Date().toLocaleDateString('en-CA')
  const absentStudent = {
    date: today,    
    student_studentID: req.body.id,
  };
  db.query("INSERT INTO absence SET ?", absentStudent, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// Post absent from "egendefinert" in maintable
app.post("/post_absent_custom", (req, res) => {
  console.log("Posting Absent: ", req.body.id);
  const absentStudent = req.body;
  db.query("INSERT INTO absence SET ?", absentStudent, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_absense", (req, res) => {
  console.log("Deleting absense: ", req.body.absenceID);

  const absense = [req.body.absenceID];
  db.query("DELETE FROM absence WHERE absenceID = ?", absense, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});


// Lesson sql
// 