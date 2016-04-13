var mongoose = require('mongoose');
var db = "mongodb://localhost/AirFranceDB"

module.exports = {
	connect :   function(cb){

	                        mongoose.connect(db);

                         cb();

             },
        disconnect:  function(db,cb){
                        db.close();
                        cb();
                        }
                              

}

