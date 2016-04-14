var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var db = require('../db.js');
var mongoose = require('mongoose');
var model=require('../models/models.js');





before(function(done) {
    db.init(function(err, db) {
        if (err){
        	
        	return done(err);
        } 
        else{
        	console.log("hereees");
        	 done();
        }
    });
});


   
describe("Seeding the Databases for the first time", function() {

 		before(function(done){
       	   db.drop(function(){
     		//	model.seedingFunction();
     		console.log("dropped");
     		  done();
        	 });
        
		});
      

      	
    	
		    	console.log("-----------------------------------Seeded----------------------------");
		    	 it("should seed Airport database if not seeded", function(done) {
		       		 this.timeout(0);

		       		 db.seed(mongoose.model('Airport'),require('../airports.json'),function(){
		       		 	mongoose.model('Airport').count( {}, function(err, count) {
		       		 		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"Airport is not seeded correctly");
		        			
		       		 		}
		        			done();

		    	});
		      }); 
		    }); 		 	
		    	
		    	it("should seed flights database if not seeded", function(done) {
		       		 this.timeout(0);
		       		  db.seed(mongoose.model('inFlight'),require('../returnflights.json'),function(){
		       		 mongoose.model('inFlight').count( {}, function(err, count) {

		        		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"inFlight is not seeded correctly");
		        			
		       		 		}
		        			done();
		        	});
                  });
		    	});
		    	it("should seed payments database if not seeded", function(done) {
		        	this.timeout(0);
		        db.seed(mongoose.model('Payment'),require('../payments.json'),function(){	
		        	mongoose.model('Payment').count( {}, function(err, count) {

		        		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"Payment is not seeded correctly");
		        			
		       		 		}
		        			done();

		        		
		        	}); 
                  });
		         	
		    	});
		    	it("should seed airports database if not seeded", function(done) {
		        	this.timeout(0);

		        	db.seed(mongoose.model('outFlight'),require('../outflights.json'),function(){

		        	mongoose.model('outFlight').count( {}, function(err, count) {
		        		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"outFlight is not seeded correctly");
		        			
		       		 		}
		        			done();
		        	});

		        	}); 
		    	});
		    	it("should seed Bookings database if not seeded", function(done) {
		        	this.timeout(0);
		        db.seed(mongoose.model('Booking'),require('../bookings.json'),function(){	
		        	mongoose.model('Booking').count( {}, function(err, count) {

		        		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"Booking is not seeded correctly");
		        			
		       		 		}
		        			done();
		        	});
		        }); 
		    });

		    	it("should seed Reservations database if not seeded", function(done) {
		       	 	this.timeout(0);
		       	 db.seed(mongoose.model('Reservation'),require('../reservations.json'),function(){	
		       	 	mongoose.model('Reservation').count( {}, function(err, count) {

		       	 		if(err){
		       		 		  console.error(err);
		       		 		}else{
		       		 			console.log("count="+count);
		        			assert(count!=0,"Reservation is not seeded correctly");
		        			
		       		 		}
		        			done();
		        	});
                 });
		        	 
		    	});

});

describe("Seeding the database when it is already seeded  ", function() {
   
      		it("it shouldn't seed again", function(done) {
    			this.timeout(0);
		    	mongoose.model('Airport').count( {}, function(err, count) {
		    		airportscount = count;
		        	console.log("second test airportscount="+airportscount);
					console.log("second test airportscount="+count);
		        	 db.seed(mongoose.model('Airport'),require('../airports.json'),function(){
		       		 	mongoose.model('Airport').count( {}, function(err, count) {
		        	assert(count==airportscount,"Airports must not be seeded again");
		        	done();
		       	}); 
		     });   
		  });    		 	
     });
      
});