const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
// const { google } = require("googleapis");

// const { OAuth2 } = google.auth;

// const oAuth2Client = new OAuth2(
//   "603651358266-2g6u8hmfsj5p9cnennbo9ri8q466k5sk.apps.googleusercontent.com",
//   "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"
// );

// oAuth2Client.setCredentials({
//   refresh_token:
//     "1//04LrMoZ1pra_GCgYIARAAGAQSNwF-L9IrhMw9ngmVZ9qLa6hVvs6Q-Qo4sG2dMVzvPZJjoC1cmSHlURfCNgL5ySc9teJm9PnnTe0",
// });

//------------TODO---------------//

// SET UP GET REQUEST FROM FRONT PAGE TO PULL CAL EVENTS.
// FIX TIMERANGE. START DATE AND END DATE.

// const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// let eventStartTime = new Date();
// eventStartTime.setDate(eventStartTime.getDay() + 2);

// let eventEndTime = new Date();
// eventEndTime.setDate(eventEndTime.getDay() + 2);
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// const event = {
//   summary: "Matematikk 8D",
//   location: "....",
//   description: "Jobbe videre med onenote. Minecraft.. sjekk ",
//   start: {
//     dateTime: eventStartTime,
//     timeZone: "Europe/Oslo",
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: "Europe/Oslo",
//   },
//   colorId: 1,
// };

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: "Europe/Oslo",
//       items: [{ id: "primary" }],
//     },
//   },
//   (err, res) => {
//     if (err) return console.log("Freebusy error: ", err);
//     const eventsArray = res.data.calendars.primary.busy;

//     if (eventsArray.length === 0)
//       return calendar.events.insert(
//         { calendarId: "primary", resource: event },
//         (err) => {
//           if (err) return console.log("Calendar event creation error: ", err);

//           return console.log("calendar event created.");
//         }
//       );
//     return console.log("Im busy");
//   }
// );

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