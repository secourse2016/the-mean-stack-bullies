var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');

describe("Test Payment routes", function() { 		
		   	  request = request(app);
			 it('/api/insertpayment should add a static value in the database', function(done) {
        				 var pa=[{
				            visa:true,
				            MasterCard: false,
				            CardHolderName: "Shereen Taha",
				            CardHolderNo: 1234567890123456,
				            Cvv: 264,
				            ExpiryDate: "09 JAN 2017"
			          }];
        			request.post('/api/insertpayment')
                       .send({ payment: pa })
                       .expect(200)
           			   .end(function(err, res) {
				                if (err) done(err);
				                var string = res.text;
				                console.log(string);
				                assert(string=='payment added to the database' , "payment must have been added successfully but it wasn't added to the database");
				                done();
           			   });
            });



			 it('/api/insertpayment this static value mustnot be added because validations would not accept', function(done) {
        				 var pa=[{
				            visa:true,
				            MasterCard: false,
				            CardHolderName: "Shereen 123Taha",
				            CardHolderNo: 1234567890123456,
				            Cvv: 264,
				            ExpiryDate: "09 JAN 2017"
			          }];
        			request.post('/api/insertpayment')
                       .send({ payment: pa })
                       .expect(200)
           			   .end(function(err, res) {
				                if (err) done(err);
				                var string = res.text;
				                console.log(string);
				                assert(string=="please enter a valid card name \n" , "payment should not be added because but it was added");
				                done();
           			   });
            });	 	
});