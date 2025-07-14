var express = require('express');
var cors = require("cors");
var path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Add this

var app = express();
app.use(cors());
app.use(bodyParser.json()); // Add this to parse JSON bodies

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student'
});

connection.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('MySql Connected...');
});

// Fixed login endpoint - changed to POST and fixed response handling
app.post('/signup', function(req, res) {
  console.log("Login request received");
  var UserName = req.body.uname; // Added username
  var Useremail = req.body.uemail;
  var Usercontact = req.body.ucontact; // Added contact
  var Userpassword = req.body.upassword;

  connection.query(
    "INSERT INTO data(email, password, username, contact) VALUES(?,?, ?, ?)", // Fixed typo in column name
    [Useremail,Userpassword, UserName, Usercontact], // Added username and contact
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Database error");
      }
      console.log("Record has been updated");
      res.status(200).send("SginUp successful");
    }
  );
});

//api for login
app.post('/login', function(req, res) {
  console.log("Login request received");
  var Useremail = req.body.uemail;
  var Userpassword = req.body.upassword;

  connection.query(
    "SELECT * FROM data WHERE Email = ? AND password = ?",
    [Useremail, Userpassword],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Database error");
      }
      if (result.length > 0) {
        console.log("Login successful");
        res.status(200).send("Login successful");
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;