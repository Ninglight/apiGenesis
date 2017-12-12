//Require dependencies
const express = require("express");
const nunjucks = require("nunjucks");
var moment = require('moment');
var xssFilters = require('xss-filters');
var bodyParser = require('body-parser');
var cors = require('cors');
var cors = require('md5');
var auth = require('./api/auth.js'); //Authentification by Token



moment.locale("fr");

//Init app
const app = express();
//Enable json request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');


// Configuring CORS w/ Dynamic Origin
var whitelist = ['http://localhost:3000', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Crée un serveur en lui passant notre application express
const http = require('http').Server(app);

//Récupération des models
const elementModel = require('./api/models/elementModel.js');

//Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//Controller
const elementController = require("./api/controllers/elementController.js");

//Routing
var routes = require('./api/routes'); //importing route
routes(app); //register the route

//Déclaration du dossier assets comme static dans le routage
app.use(express.static('assets'));

//Declare port used
if (module.parent === null) {
    http.listen(3000, function(){
        console.log("Express écoute à http://localhost:%d", http.address().port);
    });
}




