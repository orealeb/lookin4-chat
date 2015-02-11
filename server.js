var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || '5000');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
mongoose.connect("mongodb://josneville:bananaman@ds041861.mongolab.com:41861/heroku_app33821378");

var gigSchema = new Schema({
	userid: {type: String, required: true},
	position: {type: String, required: true},
	rate: {type: Number, required: true},
	date: {type: Date, required: true},
	name: {type: String, required: true},
  description: {type: String, required: true}
}, {versionKey:false});


var Gig = mongoose.model('Gig', gigSchema);

app.post('/api/gig/all', function(req, res){
	Gig.find({}, function(err, gigs){
		res.status(200).send(gigs);
	});
});

app.post('/api/gig/new', function(req, res){
	console.log(req.body);
	var newGig = new Gig({
		userid: req.body.userID,
		position: req.body.position,
		rate: req.body.rate,
		date: req.body.date,
		name: req.body.name.
    description: req.body.description
	});
	newGig.save(function(err, gig){
		if (err) {
			console.log(err);
			res.status(400).send("Unknown Error");
			return;
		}
		res.status(200).send("Success");
	});
});

app.listen(app.get('port'));
