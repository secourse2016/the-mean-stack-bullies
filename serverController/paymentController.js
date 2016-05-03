var models = require('../models/models.js');
var mongoose = require('mongoose');
var stripe = require("stripe")("sk_test_eI0A2eL166WZXsd51IOkmksT");


	exports.chargeCard = function (stripeToken,cost,cb) { 
	 	
		 console.log("in charge card");
		 console.log(stripeToken);
		 cost=cost*100;

		var charge = stripe.charges.create({
		  amount: cost, // amount in cents, again
		  currency: "usd",
		  source: stripeToken,
		  description: "Example charge"
		}, function(err, charge) {
		  if (err) {
		    console.log(err); 
		  } 
		  else { 

		   console.log(charge); 
		   cb(null,charge);
		  }
		});
	 
		
	}

	exports.calculateAmount=function(inFlight_id,ouFlight_id,cb){
		    var OutFlightModel = mongoose.model('outFlight');
			var InFlightModel = mongoose.model('inFlight');
			var outquery = OutFlightModel.find();
	        var inquery = InFlightModel.find();
		    var amount=0;

		    console.log(inFlight_id);

            if(inFlight_id!=null){
					inquery.where('_id',inFlight_id);
					if(ouFlight_id!=null ){
                      outquery.where('_id',ouFlight_id);
                      outquery.exec(function (err, outdocs) {
                      	if(err){

                      		console.log("hello from inside paymentserver error");
                      		cb(err,null);
                      	}
                      	else{
							inquery.exec(function (err, indocs) {
								if(err){
									console.log("hello from inside paymentserver error");
									cb(err,null);
								}
								else{
									console.log("heree");
									console.log(outdocs[0]);
									console.log(indocs[0]);
									amount=(outdocs[0].cost+indocs[0].cost);
									console.log("hello from inside paymentserver two not null"+amount);
									cb(null,amount);
								}
							});
						}
					  });	
            		}
            		else{
						inquery.exec(function (err, indocs) {
							if(err){
								console.log("hello from inside paymentserver error");
								cb(err,null);
							}
							else{

								amount=indocs[0].cost;
								console.log("hello from inside paymentserver indocs not null"+amount);
								cb(null,amount);
							}
						}); 
					} 
            }
            else{
            	if(ouFlight_id!=null ){
                      outquery.where('_id',ouFlight_id);
                      outquery.exec(function (err, outdocs) {
                      	if(err){
                      		console.log("hello from inside paymentserver error");
                      		cb(err,null);
                      	}
                      	else{
                      		 amount=outdocs[0].cost;
                      		if(outdocs.length >0){
          			 			console.log("hello from inside paymentserver outdocs not null"+amount);
	                     
	                      	cb(null,amount);
	                      }else{
	                      	cb(null,0);
	                      }
                     
	                    }
					  });
            	}
            	else{
            		cb(null,null);
            	}
            }
            
	}
