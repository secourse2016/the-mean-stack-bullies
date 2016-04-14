var mongoose = require('mongoose');
var dbPath = "mongodb://localhost/AirFranceDB"
var db = null;
module.exports = {
	
	init :function(cb){
		mongoose.connect(dbPath);
		var database = mongoose.connection;
		database.on('error', function(){
			console.error("database connection denied");
			cb("database connection denied",null);
		});
		database.once('open', function() {
			console.log("connected to database");
            db = database;
            cb(null,db);
          });
	},
	db: function(){
		if(db != null){
			return db;
		}else{
		return console.error("Access denied");
		}
		
		
	},
	close:function(db,cb){
		db.close();
		cb();
	},
	drop:function(cb){
		mongoose.model('Airport').remove({}, function(err) { 
			if(err) console.log("connot be removed");
   			console.log('Airport removed') ;
   			mongoose.model('outFlight').remove({}, function(err) {
   			    if(err) console.log("connot be removed"); 
   				console.log('out going Flights removed') ;
   				mongoose.model('inFlight').remove({}, function(err) { 
   					if(err) console.log("connot be removed");
   					console.log('returned Flights removed') ;
	   				mongoose.model('Reservation').remove({}, function(err) {
	   					if(err) console.log("connot be removed"); 
	   					console.log('Reservation removed') ;
	   					mongoose.model('Booking').remove({}, function(err) { 
	   						if(err) console.log("connot be removed");
	   						console.log('Booking removed') ;
	   						mongoose.model('Payment').remove({}, function(err) { 
	   							if(err) console.log("connot be removed");
	   							console.log('Payment removed') ;
	   							cb();
							});
						});
					});
				});		
			});
		});
			
		
	},
	seed:function(model,entities,cb) {  
	    model.count( {}, function(err, count) {
	          if(count==0){
	          	var promise = new mongoose.Promise;
	    		model.create(entities, function(err) {
	      			if(err) 
	      			{ 
	      				promise.reject(err); 
	      				cb(null);
	      			}
	      		  	else{ 
	        			promise.resolve();
	      	            console.log("seeded correctly");
	      	           cb(promise);
	           		 }
	   			});
	    		   return promise;
				}
				else
				{
					 console.log("already seeded");
					 cb(null);
				}
	    		
	    });


    }
    

};



