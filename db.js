var mongoose = require('mongoose');
var dbPath = "mongodb://localhost/AirFranceDB"
var db;
module.exports = {
	
	init :function(cb){
		mongoose.connect(dbPath);
		var database = mongoose.connection;
		database.on('error', console.error.bind(console, 'connection denied'));
		database.once('open', function() {
			console.log("connected to database");
            db = database;
            cb();
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
    var promise = new mongoose.Promise;
    model.create(entities, function(err) {
        if(err) { promise.reject(err); }
        else    { promise.resolve();
                  console.log("seeding completed");
                   }
    });
    return promise;
	}

};



