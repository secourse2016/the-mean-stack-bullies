var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');

describe("Test PersonalInfo routes", function() { 		
		   	  request = request(app);
			 it('/api/insertperson should add a static value in the database', function(done) {
        				var pe=[{
				               firstName      : "Omar",
				     		   secondName    : "Tag",
				    		   age            : 21,
				    		   nationality    : "Egyptian",
				      		   passportNumber: 12312323,
				     		   issueDate      : "09 JAN 2017",
				     		   expiryDate     : "15 JAN 2017"
				          }];

        			request.post('/api/insertperson')
                       .send({ person: pe })
                       .expect(200)
           			   .end(function(err, res) {
				                if (err) done(err);
				                var string = res.text;
				                console.log(string);
				                assert(string=='person added to the database' , "personal Info must have been added successfully but it wasn't added to the database");
				                done();
           			   });
            });



			 it('/api/insertperson this static value mustnot be added because validations would not accept', function(done) {
        				var pe=[{
				               firstName      : "Omar",
				     		   secondName    : "Tag",
				    		   age            : 21,
				    		   nationality    : "Egyptian",
				      		   passportNumber: 12312323134134134,
				     		   issueDate      : "09 JAN 2017",
				     		   expiryDate     : "15 JAN 2017"
				          }];
        			request.post('/api/insertperson')
                       .send({ person: pe })
                       .expect(200)
           			   .end(function(err, res) {
				                if (err) done(err);
				                var string = res.text;
				                console.log(string);
				                assert(string=="please enter a valid Passport Number \n" , "person should not be added because but it was added");
				                done();
           			   });
            });	 	
});