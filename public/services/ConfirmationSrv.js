app.factory('ConfirmationSrv', function(){ 
return{ 
   
   getReservation : function(){ 
     
      var reservation = [{ 

    FlightNum:1408,
    Origin:"Lyon",
    Airport:"Lyon-Saint Exupéry Airport", 
    Destination:"Ulm", 
    Terminal:"5", 
    Gate:"380",
    date:"22/3/2016", 
    DepartureTime: "12:30:00", 
    EstimatedArrivalTime: "5:15:00",  
    Duration:"4", 
    SeatClass:"Economy",
    SeatNum:"H-11"

}];
    return reservation;
   }, 

   

   getPayments : function(){ 
       

    var payment = [{  

        PaymentMethod : "../images/Visa2015.png",
        CardNum :"443 997 654 332",
        CVV : 775,
        Amount : "29.99$",
        IssueDate : "2/4/2016",
        PassportNum : "A11452437"

       }]; 
       


       return payment;



   }

} 






});
