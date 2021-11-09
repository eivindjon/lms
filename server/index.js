const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { connectors } = require("googleapis/build/src/apis/connectors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const mysql_pool = mysql.createPool({
  connectionLimit: 100,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

//Gets all students in DB
app.get("/getstudents", (req, res) => {
  console.log("Running query GET STUDENTS");

  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    //Using connection
    connection.query("SELECT * FROM student", (err, result) => {
      connection.release();
      if (!err) {
        res.send(result);
      } else {
        console.log("Errormessage from query:", err);
      }
      console.log("Query result:", result);
    });
  });
});

// Gets userName for userStats page
app.get("/UserStats/:id/username", (req, res) => {
  var id = req.params.id;
  console.log("Running query - Getting username: ", id);
  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "SELECT firstName, lastName FROM student WHERE studentID = ?",
      [id],
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
        } else {
          console.log("There was an error", err);
        }
        connection.release();
      }
    );
  });
});

//Gets all absense from ONE student.

app.get("/UserStats/:id", (req, res) => {
  var id = req.params.id;
  console.log("Running query - Getting absense for student: ", req.params.id);

  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "SELECT student.studentID, student.firstName, student.lastName, absence.date, absence.absenceID FROM student, absence WHERE absence.student_studentID = ? AND student.studentID=? ORDER BY absence.date DESC;",
      [id, id],
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
        } else {
          console.log("there was an error:", err);
        }
      }
    );
  });
});

// Post absent from button in maintable "Borte!"
app.post("/post_absent", (req, res) => {
  console.log("Posting Absent: ", req.body.id);
  // get todays date on format yyyy-mm-dd
  const today = new Date().toLocaleDateString("en-CA");
  const absentStudent = {
    date: today,
    student_studentID: req.body.id,
  };

  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "INSERT INTO absence SET ?",
      absentStudent,
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
          console.log("Posted! :", result);
        } else {
          console.log("there was an error", err);
        }
      }
    );
  });
});

// Post absent from "egendefinert" in maintable
app.post("/post_absent_custom", (req, res) => {
  console.log("Posting Absent: ", req.body.student_studentID);
  const absentStudent = req.body;
  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "INSERT INTO absence SET ?",
      absentStudent,
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
        } else {
          console.log("There was an error", err);
        }
      }
    );
  });
});

// Post edited lesson plan
// TODO: THIS HAS NOT BEEN COMPLETED!!!
app.post("/updatelesson", (req, res) => {
  console.log("Updating post: ", req.body.postId);
  const absentStudent = req.body;
  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "INSERT INTO absence SET ?" // ALTER ROW WHERE lessonID = postID,
      absentStudent,
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
        } else {
          console.log("There was an error", err);
        }
      }
    );
  });
});

// Delete absence from student.
app.post("/delete_absense", (req, res) => {
  console.log("Deleting absense: ", req.body.absenceID);

  const absense = [req.body.absenceID];
  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "DELETE FROM absence WHERE absenceID = ?",
      absense,
      (err, result) => {
        connection.release();
        if (!err) {
          res.send(result);
        } else {
          console.log("There was an error:", err);
        }
      }
    );
  });
});

// Gets all lessons for a given date.
app.get("/getlessons/:date", (req, res) => {
  var date = req.params.date;
  console.log("Running query - Getting lessons for date: ", req.params.date);

  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);

    connection.query(
      "SELECT lesson.lessonID, lesson.description, lesson.startTime, lesson.endTime, lesson.note, lesson.color, class.className, subject.subject FROM lesson, class, subject WHERE lesson.date = ? AND class.classID = lesson.class_classID AND subject.subjectID = lesson.Subject_subjectID",
      [date],
      (err, result) => {
        connection.release();
        if (!err) {
          console.log(result);
          res.send(result);
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.post("/insertlesson", (req, res) => {
  console.log("inserting lessons..");
  console.log(req.body);

  // Takes paramaters start and end. Both are date objects where start is first day of semester. End is end of semester. Returns MySQL query formatted for insert into lesson table. These will be placeholders to render in client.
  function insertQuery(start, end) {
    let theArray = [];

    while (start < end) {
      let date = start;
      let subquery = [];
      let description = req.body.defaultDescription;
      let startTime = req.body.startTime;
      let endTime = req.body.endTime;
      let note = req.body.defaultNote;
      let subject_subjectID = req.body.subjectID;
      let class_classID = req.body.classID;
      let color = req.body.color;
      date = date.toLocaleString("en-CA").substr(0, 10);
      subquery.push(
        description,
        date,
        startTime,
        endTime,
        note,
        subject_subjectID,
        class_classID,
        color
      );
      console.log("Subquery looks like: ", subquery);
      theArray.push(subquery);
      start.setDate(start.getDate() + 7);
    }
    return theArray;
  }
  //Nested arrays are turned into grouped lists (for bulk inserts), //e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
  var sql =
    "INSERT INTO `lesson`( `description`, `date`, `startTime`, `endTime`, `note`, `Subject_subjectID`, `class_classID`, `color`) VALUES ?";
  const inserts = insertQuery(
    new Date(req.body.startDate),
    new Date(req.body.endDate)
  );

  console.log("Inserts:", inserts);

  mysql_pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("Connected as ID:", connection.threadId);
    connection.query(sql, [inserts], (err, result) => {
      connection.release();
      if (!err) {
        res.send(result);
      } else {
        console.log("Error message", err);
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

// Lesson sql
//
