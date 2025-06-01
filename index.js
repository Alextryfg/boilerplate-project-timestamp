// index.js
// where your node app starts

// init project
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

app.get("/api/:datestring", function (req, res) {
  //Sacamos el dia de la url
  const dateString = req.params.datestring;
  let date;

  // comprobar si el parametro es un numero, si lo es, lo convertimos a fecha
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  // si la fecha es invalida, devolvemos un error
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // devolvemos la informacion en formato unix y utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

//Si se va a un endpoint sin hora, se devolvera la fecha actual en formato unix y utc en un objeto json
app.get("/api/", function (req, res) {
  // Get the current date
  const date = new Date();

  // devolvemos la informacion en formato unix y utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



// Escuchamos el puerto en el que se ejecutara la aplicacion
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
