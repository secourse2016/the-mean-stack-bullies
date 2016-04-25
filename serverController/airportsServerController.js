var models = require('../models/models.js');
var mongoose = require('mongoose');   

exports.getAirports = function(cb){
    mongoose.model('Airport').find({},function(err,airports){
        if(err){
        	console.log(err);
      
        }else{
            cb(null,airports);
        }
    });
}