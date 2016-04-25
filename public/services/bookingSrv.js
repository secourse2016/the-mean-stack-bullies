app.factory('bookingSrv',function ($http){ 
  
  return { 
     

     insertbooking : function(booking,cb){  
  console.log("sending wt");
      var req = {  
        method : 'POST', 
        url : '/api/booking', 
        data : {booking: booking} ,
       headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

              }
      };  

       console.log("in service");
       console.log("test nullsss in service ----------->"+booking[0].NumberOfAdults) ; 
       console.log("test nullsss in service ----------->"+booking[0].NumberOfChildren) ; 
       return $http(req)

              .success(function(response) {
                console.log("response --> "+response);
                  cb(response);
              })
              .error(function(response) {
                 return "error";
          });
    } 


    

  }  
   

});