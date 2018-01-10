// server.js

// BASE SETUP
// =======================================  ======================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 7001;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/listeElevesApi', function(req, res)
{
    var horraire = req.query.horraire;
    var semaine = req.query.semaine;
    var salle = req.query.salle;

    var liste1 = [];
    var liste2 = [];

    liste1 = {0:{INE:11310461,Nom:"Ulrich",Photo:"../img/Me.jpg"},1:{INE:11254521,Nom:"Rolor",Photo:"../img/Me2.jpg"}};
    liste2 = {0:{INE:11310461,Nom:"Hollande",Photo:"../img/index.jpg"},1:{INE:11254521,Nom:"Macron",Photo:"../img/brigitte.jpg"}};

    if(horraire === "10h" && semaine === "2" && salle === "F202" )
    {
        res.json(liste1);
    }
    else
    {
        res.json(liste2);
    }

});
router.get('/HSS', function(req, res)
{
    var liste = [];
    liste = {0:["10h","11h","12h"],1:["2","3","4"],2:["F202","F203","Copernic"]};
    res.json(liste);
});
router.get('/presenceElevesApi', function(req, res) {
    console.log("reception message");
    console.log(res);
});

router.post('/presenceElevesApi', function(req, res) {
    console.log("reception message");
    console.log(res);
});

router.put('/', function(req, res) {
    res.json({ message: 'there is nothing you can put' });
});

router.post('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
