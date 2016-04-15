var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.addPersonIntoDatabase =function(person,cb){
  var PersonModel = mongoose.model('Person');
	var newPerson = new PersonModel(person);
	newPerson.save(function (err,person) {
       if (err) {
       	return console.error(err);
       }
        console.log(person);
         cb(person);
      });
	
}