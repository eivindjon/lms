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
  const today = new Date().toLocaleDateString("en-CA");
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
  db.query(
    "DELETE FROM absence WHERE absenceID = ?",
    absense,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getlessons/:date", (req, res) => {
  var date = req.params.date;
  console.log("Running query - Getting lessons for date: ", req.params.date);
  db.query("SELECT lesson.description, lesson.startTime, lesson.endTime, lesson.note, lesson.color, class.className, subject.subject FROM lesson, class, subject WHERE lesson.date = ? AND class.classID = lesson.class_classID AND subject.subjectID = lesson.Subject_subjectID", [date], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/insertlesson", (req,  res) => {
  console.log("inserting lessons..");
  console.log(req.body)
  //REQUEST OBJECT COMES IN THIS FORMAT:
  /* const subjectPlan = {
    defaultDescription: defaultDescription,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    defaultNote: defaultNote,
    subjectID: subjectID,
    classID: classID
  }; 
  
  DB FORMAT FOR DATE OBJECT
      const norskTid = Intl.DateTimeFormat("en-CA").format(value);
  */
  


  // Takes paramaters start and end. Both are date objects where start is first day of semester. End is end of semester. Returns MySQL query formatted for insert into lesson table. These will be placeholders to render in client.
  function insertQuery(start, end) {
    let theArray = [];
    
    while (start < end) {
      let date = start
      let subquery = [];
      let description = req.body.defaultDescription;
      let startTime = req.body.startTime;
      let endTime = req.body.endTime;
      let note = req.body.defaultNote;
      let subject_subjectID = req.body.subjectID;
      let class_classID = req.body.classID;
      let color = req.body.color
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
  var sql = "INSERT INTO `lesson`( `description`, `date`, `startTime`, `endTime`, `note`, `Subject_subjectID`, `class_classID`, `color`) VALUES ?"
  const inserts = insertQuery(new Date(req.body.startDate), new Date(req.body.endDate));
  
  console.log("Inserts:", inserts)
  db.query(
    sql, [inserts],
     (err, result) => {
      if (err) {
        console.log("Error message", err);
      } else {
        res.send(result);
      }
    })
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

// Lesson sql
//
