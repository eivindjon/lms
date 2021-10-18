const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "603651358266-2g6u8hmfsj5p9cnennbo9ri8q466k5sk.apps.googleusercontent.com",
  "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"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//04LrMoZ1pra_GCgYIARAAGAQSNwF-L9IrhMw9ngmVZ9qLa6hVvs6Q-Qo4sG2dMVzvPZJjoC1cmSHlURfCNgL5ySc9teJm9PnnTe0",
});

//------------TODO---------------//

// SET UP GET REQUEST FROM FRONT PAGE TO PULL CAL EVENTS.
// FIX TIMERANGE. START DATE AND END DATE.

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

let eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

let eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "Matematikk 8D",
  location: "....",
  description: "Jobbe videre med onenote. Minecraft.. sjekk ",
  start: {
    dateTime: eventStartTime,
    timeZone: "Europe/Oslo",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "Europe/Oslo",
  },
  colorId: 1,
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: "Europe/Oslo",
      items: [{ id: "primary" }],
    },
  },
  (err, res) => {
    if (err) return console.log("Freebusy error: ", err);
    const eventsArray = res.data.calendars.primary.busy;

    if (eventsArray.length === 0)
      return calendar.events.insert(
        { calendarId: "primary", resource: event },
        (err) => {
          if (err) return console.log("Calendar event creation error: ", err);

          return console.log("calendar event created.");
        }
      );
    return console.log("Im busy");
  }
);

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "test",
});

//Gets all students in DB
app.get("/getstudents", (req, res) => {
  console.log("Running query GET STUDENTS");
  db.query("SELECT * FROM navn", (err, result) => {
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
    "SELECT fornavn, etternavn FROM navn WHERE id = ?",
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
    "SELECT navn.id, navn.fornavn, navn.etternavn, fravær.dato, fravær.fraværID FROM navn, fravær WHERE fravær.personID = ? AND navn.id=? ORDER BY STR_TO_DATE(fravær.dato, '%d-%m-%Y') ASC;",
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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  // get todays date on format dd-mm-yyyy
  today = dd + "-" + mm + "-" + yyyy;
  const absentStudent = {
    personID: req.body.id,
    dato: today,
  };
  db.query("INSERT INTO fravær SET ?", absentStudent, (err, result) => {
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
  const absentStudent = {
    personID: req.body.id,
    dato: req.body.dato,
  };
  db.query("INSERT INTO fravær SET ?", absentStudent, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_absense", (req, res) => {
  console.log("Deleting absense: ", req.body.fraværID);

  const absense = [req.body.fraværID];
  db.query("DELETE FROM fravær WHERE fraværID = ?", absense, (err, result) => {
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
