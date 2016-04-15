var models = require('../models/models.js');
var mongoose = require('mongoose');  
var DB = require('../db.js');



exports.comapreFlights = function(formdata, cb){

      if(formdata.trip == "one"){ 
      	 compareOnewayFlights(formdata,function(err,found){ 
              if(err) { 
                  cb(err,found);
              } 
              else{  
              	  cb(null,found);

               }
      	 });  

      	} 


      	if(formdata.trip=="round"){ 
           
           comapreRoundtripFlights(formdata, function(err,found){ 
               if(err){ 
                    cb(err,found); 
               } 

               else{ 

                   cb(null,found);
               }
           });
      	}

}




exports.compareOnewayFlights = function (formdata, cb) {

    



} 

exports.comapreRoundtripFlights = function(formdata, cb){ 





}

