// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// requested API endpoint from user stories--get the IP address, preferred languages, and system infos from the header
app.get("/api/whoami", (req, res) => {
  let myIP = req.header("X-Forwarded-For").split(',')[0];  // X-Forwarded-For method gets three IP addresses--client, proxy1, proxy 2
  let myLanguage = req.header('Accept-Language');
  let mySystem = req.header('User-Agent');
  res.json({
    ipaddress: myIP,
    language: myLanguage,
    software: mySystem
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
