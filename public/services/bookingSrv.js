app.factory('bookingSrv', function($http){ 
  
  return { 

    validateData : function(data){ 

      var req = {  
        method : "GET", 
      	url : "/api/validateData", 
      	data : {data: data}

      } 
       return $http(req);


    }



  }









});