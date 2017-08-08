var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

// gets all the burgers, passes in all the burgers for handlebars
//renders index file
router.get('/', function(req, res) {
	burger.selectAll(function(data) {
		var burgersObj = {burgers: data};
		res.render('', burgersObj);
	});
});

// adds new burger, displays, redirects to index route
router.post('/burgers/insertOne', function(req, res) {
	burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function() {
		res.redirect('/');
	});
});

// updates status of burger, redirects to index route
router.put('/burgers/updateOne/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;
	burger.updateOne({devoured: req.body.devoured}, condition, function() {
		res.redirect('/');
	});
});

module.exports = router;