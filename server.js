// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
// const { param } = require('../boilerplate-express/myApp');
// const { application } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


let year, month, day;
// your first API endpoint... 
app.get("/api/:date", function (req, res) {

  const inputDate = req.params.date;;
  if (+inputDate == inputDate){
    let dateObj = new Date(+inputDate).toUTCString();
    res.json({unix:inputDate,utc: dateObj});
  }else{
    const utcDate = new Date(inputDate).toUTCString();
    const unixDate = new Date(utcDate);
    if (utcDate == 'Invalid Date'){
      res.json({error: utcDate});
    }else {
      res.json({unix:unixDate.getTime(),utc: utcDate});
    }
  }
});

app.get('/api',function (req,res){
  const currentUtcDate = new Date();
  res.json({unix:currentUtcDate.getTime(),utc: currentUtcDate.toUTCString()});
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
