var mongoose = require('mongoose');
var dbPath = "mongodb://localhost/AirFranceDB"
var db;
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
		if(db){
			return db;
		}
		
	},
	close:function(db,cb){
		db.close();
		cb();
	},
	seed:function(model,entities) {  
	    model.count( {}, function(err, count) {
	          if(count==0){
	          	var promise = new mongoose.Promise;
	    		model.create(entities, function(err) {
	      			if(err) 
	      			{ 
	      				promise.reject(err); 
	      			}
	      		  	else{ 
	        			promise.resolve();
	      	            console.log("seeded correctly");
	           		 }
	   			});
	    		return promise;
				}
				else
				{
					console.log("already seeded");
				}
	    		
	    });

    }
    

};



