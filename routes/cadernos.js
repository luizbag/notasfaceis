var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Caderno = require('../models/Caderno.js');

router.get('/', function(req, res, next) {
  Caderno.find(function(err, cadernos) {
    if(err) return next(err);
    res.json(cadernos);
  });
});

module.exports = router;
