// calling the packages that we need

var express = require('express');  // call express
var app = express(); // initializing express

// configuration for the app
app.use(express.json()); // parses our request body

// Environment Variables
var port = process.env.PORT || 8080; // set our port 

// Routes for our apis
var router = express.Router();

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/api/movies')

var routes = require('./app/routes/movieRoutes');
routes.routeHandler(router);

app.listen(port);
console.log(`Listening on Port: ${port}`);