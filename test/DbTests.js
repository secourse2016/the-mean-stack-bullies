var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var db = require('../db.js');
var mongoose = require('mongoose');
var model=require('../models/models.js');
var flightscount=0;




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
     	model.seedingFunction();
         });
          done();
      });
      	
    	
		    	console.log("-----------------------------------Seeded----------------------------");
		    	 it("should seed flights database if not seeded", function(done) {
		       		 this.timeout(0);
		       		 mongoose.model('outFlight').count( {}, function(err, count) {
		        		console.log("count="+count);
		        		assert(count!=0,"Flights is not seeded correctly");
		        		done();
		        	});

		    	});
		    	it("should seed flights database if not seeded", function(done) {
		       		 this.timeout(0);
		       		 mongoose.model('inFlight').count( {}, function(err, count) {

		        		console.log("count="+count);
		        		assert(count!=0,"Flights is not seeded correctly");
		        		done();
		        	});

		    	});
		    	it("should seed payments database if not seeded", function(done) {
		        	this.timeout(0);
		        	mongoose.model('Payment').count( {}, function(err, count) {
		        		console.log("count="+count);
		        		assert(count!=0,"Payments is not seeded correctly");
		        		done();
		        	}); 
		    	});
		    	it("should seed airports database if not seeded", function(done) {
		        	this.timeout(0);
		        	mongoose.model('Airport').count( {}, function(err, count) {
		        		console.log("count="+count);
		        		assert(count!=0,"Airports is not seeded correctly");
		        		done();
		        	}); 
		    	});
		    	it("should seed Bookings database if not seeded", function(done) {
		        	this.timeout(0);
		        	mongoose.model('Booking').count( {}, function(err, count) {
		        		console.log("count="+count);
		        		assert(count!=0,"Bookings is not seeded correctly");
		        		done();
		        	}); 
		    	});
		    	it("should seed Reservations database if not seeded", function(done) {
		       	 	this.timeout(0);
		       	 	mongoose.model('Reservation').count( {}, function(err, count) {
		       	 		console.log("count="+count);
		        		assert(count!=0,"Reservations is not seeded correctly");
		        		done();
		        	}); 
		    	}); 
		    	
		

   	 
    
});

// describe("Seeding the database when it is already seeded  ", function() {
//     model.seedingFunction(function(){
//     	it("it shouldn't seed again", function(done) {
//     		this.timeout(20000);
// 		    mongoose.model('Flight').count( {}, function(err, count) {
// 		        	console.log("flightscount="+flightscount);
// 		        	console.log("count="+count);
// 		        	assert(count==flightscount,"flights must not be seeded again");
// 		        	done();
// 		       	}); 
//     	});
//     });
    
// });


// describe("Seeding Payments Database ", function() {
//     var arr = [1, 2, 3, 43, 5];
//     it("should seed Payments.json if not seeded", function() {
//         assert.include(arr, Quote.getElementByIndexElseRandom(arr));
//     });
//     it("should not seed if it was seeded before", function() {
//         assert.equal(Quote.getElementByIndexElseRandom(arr, 0), 1);
//     });
// });
// describe("Seeding Bookings Database ", function() {
//     var arr = [1, 2, 3, 43, 5];
//     it("should seed Bookings.json if not seeded", function() {
//         assert.include(arr, Quote.getElementByIndexElseRandom(arr));
//     });
//     it("should not seed if it was seeded before", function() {
//         assert.equal(Quote.getElementByIndexElseRandom(arr, 0), 1);
//     });
// });
// testing of database seeding and connection 