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
  database: "test",
});

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

app.post("/post_absent", (req, res) => {
  console.log("Posting Absent: ", req.body.id);
  const absentStudent = { personID: req.body.id };
  db.query("INSERT INTO fravær SET ?", absentStudent, (err, result) => {
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
