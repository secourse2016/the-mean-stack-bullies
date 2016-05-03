var express = require('express');

var bookControl = require('../serverController/bookingController.js');
var paymentController= require('../serverController/paymentController.js');
var paymentValidation= require('../Validations/paymentValidation.js'); 

     /**
       * requiring database files.
       */


var Db = require('../db.js');
var mongoose = require('mongoose');
var Seed = require('../models/Seed.js');

     /**
       * requiring server controllers.
       */

var contactUsController= require('../serverController/contactUsServerController.js');
var saveAllBookingDataController= require('../serverController/saveAllBookingDataController.js');
var bookControl = require('../serverController/bookingController.js');
var paymentController= require('../serverController/paymentController.js');
var flightControl =  require('../serverController/flightController.js');
var AirportsController =  require('../serverController/airportsServerController.js');
var paymnetController= require('../serverController/paymentController.js');
var pingingOtherAirlinesServerController = require('../serverController/pingingOtherAirlinesServerController.js');
    /**
     * requiring server validations.
     */
var paymentValidation= require('../Validations/paymentValidation.js'); 
var personController= require('../serverController/personController.js');
var personValidation= require('../Validations/personValidation.js');
var bookingValidation = require('../Validations/bookingValidation.js'); 

var manageController =  require('../serverController/ManageBookingController.js');

var sess;

var router = express.Router();



/*
|==========================================================================
| Database Routes
|==========================================================================
|
| These routes are related to the Database.
  |
  */   

  router.get('/db/seed', function(req, res) {
        Db.init(function(){
             Db.drop(function(){
             console.log("dropped");
                 Seed.seedingFunction(function(){
                     console.log("seeding database completed successfully");
                 });

           });
         
        }); 
 });            

    /* DELETE DB */
    router.get('/db/delete', function(req, res) {
      Db.drop(function(){
             console.log("dropped");
           });
    });    



/*
|==========================================================================
| Validation Routes
|==========================================================================
|
| These routes are related server validations.
|
*/

                 /**
                   * validating of contactUs middleware.
                   */
              router.post('/api/contactUs', function(req, res,next) {
                        next();
               
              
                  });
              
                 /**
                   * validating of personInformation middleware.
                   */

              router.post('/api/insertperson', function(req, res,next) {
                 console.log("inside the main insertperson");
                 var i;
                 var bool="";
                 for(i=0;i<req.body.people.length;i++){
                    personValidation.validatePerson(req.body.people[i],function(errmessage){
                      if(errmessage){
                        bool+=errmessage;
                       }  
                    });

                 }
                 if(bool!=""){
                    res.send(bool);
                 }
                 else{
                    next();
                 }
                 
                     
              });

                    /**
                     * validating of payment middleware.
                     */
              router.post('/api/insertpayment', function(req,res,next) {
                 sess = req.session;
                 paymentValidation.validatePayment(req.body.payment[0],function(errmessage){
                   if(errmessage){
                    res.send(errmessage);
                   }else{ 
                        console.log(req.body.token);
                        paymentController.chargeCard(req.body.token,sess.payAmount, function(err){
                           if(err){ 
                             res.send(err);
                           }
                         else{ 
     
                            next();
                         }

                        });
                    
                   }
                });
  
  
            });   

              router.post('/api/booking', function(req, res, next) { 

                bookingValidation.validateBooking(req.body.booking[0], function(err){ 
                           if(err){ 
                             res.send(err);
                             console.log("THERE IS A FORM ERROR"+err);
                           } 
                           else{ 

                                next();
                           }
                });

            });

/*
|==========================================================================
| Airports Routes
|==========================================================================
|
| These routes are related Airports.
|
*/
   router.get('/api/airports',function(req,res){
       AirportsController.getAirports(function(err,airports){
          //console.log("airports ->"+airports);
          res.json(airports);
       });
   });


/*
|==========================================================================
| Payment Routes
|==========================================================================
|
| These routes are related to the Payments.
|
*/
          


       
              /**
               * Inserting payment route.
               */
            router.post('/api/insertpayment',function(req,res,next){  
                
                            sess = req.session;
   
                           sess.paymentData = req.body.payment[0];
                           console.log("payment data added to session --->"+req.body.payment[0]);
                        // paymentController.addPaymentIntoDatabase(req.body.payment[0],function(){
                          res.send('payment added to the session');
                        // });
              


                }); 
  
  

/*
|==========================================================================
| Booking Routes
|==========================================================================
|
| These routes are related to the Booking.
|
*/

    /**
     * Inserting Booking route.
     */
 
router.post('/api/booking', function(req,res){ 
                      sess = req.session;
                     sess.bookingData = req.body.booking[0]; 
                     console.log("test nullsss in api book ----------->"+sess.bookingData.NumberOfAdults) ; 
                     console.log("test nullsss in api book ----------->"+sess.bookingData.NumberOfChildren) ; 
                  
        bookControl.comapreFlights(req.body.booking[0],function(err,outFlights,inFlights){ 
                    
                   
                     

                     console.log("sesssion = "+ sess.bookingData);
                     if(err){
                      returnedjson = {
                          err:err,
                          outFlights:null,
                          inFlights:null
                        };
                       res.send(returnedjson);
                     }else{
                        returnedjson = {
                          err:null,
                          outFlights:outFlights,
                          inFlights:inFlights
                        };
                        //sess = req.session;
                        sess.flightData = returnedjson;
                       res.json(returnedjson);
                     }
                           
        }); 

});


        router.get('/api/getBookingNumberOfAdultsAndChildren', function(req, res) {
              sess = req.session;
              console.log("test nullsss in api route ----------->"+sess.bookingData.NumberOfAdults) ; 
              console.log("test nullsss in api rouet----------->"+sess.bookingData.NumberOfChildren) ; 
              var numbers={
                NumberOfAdults : sess.bookingData.NumberOfAdults,
                NumberOfChildren : sess.bookingData.NumberOfChildren
              };
              res.send(numbers);
        }); 





/*
|==========================================================================
| ContactUs Routes
|==========================================================================
|
| These routes are related to the ContactUS.
|
*/

              /**
               * Inserting ContactUs route.
               */
              router.post('/api/contactUs', function(req, res) {
                var errMessage ="";
                console.log("in contact api");
                contactUsController.sendUserContactUsComfirmation(req.body.newContactUs[0],function(err){
                     if(err){
                      console.log(err);
                      message+=err+"\n";
                      res.send(message); 
                     }
                contactUsController.sendMailContactUsTeam(req.body.newContactUs[0],function(err){
                   if(err){
                    console.log(err);
                     message+=err+"\n";
                     res.send(message); 
                   }
                
                 res.send(null); 
                });

              });
          });



/*
|==========================================================================
| PersonInformation Routes
|==========================================================================
|
| These routes are related to the PersonInformation.
|
*/
     
            /**
             * Inserting PersonInformation route.
             */

          router.post('/api/insertperson', function(req, res) {
                  sess = req.session;
                  // sess.personData = req.body.people[0];
                  sess.personArray=req.body.people;
                  paymnetController.calculateAmount(sess.flightIDs.inFlight_id , sess.flightIDs.ouFlight_id,function(err,amount){
                      if(err){
                        res.send('Error in the calculate payment method');
                      }
                      else{
                            sess.payAmount=((sess.personArray.length)* amount);
                            console.log("the amount is ------------------------------>"+sess.payAmount)
                            console.log(req.body.people);
                            // console.log("req body.people--------------->"+req.body);
                            console.log("person data added to the session");
                          // personController.addPersonIntoDatabase(req.body.person[0],function(){
                            res.send('person added to the session');
                      }
                  })
                
                // });
                });


 
/*
|==========================================================================
| Flights Routes
|==========================================================================
|
| These routes are related to the Flights.
  |
  */
     
        

            /**
             * get Flights route.
             */
           router.get('/api/flights',function(req,res){
              sess = req.session;
              res.send(sess.flightData);
           }); 

           router.get('/api/getPaymentAmount',function(req,res){
              sess = req.session;
              res.json(sess.payAmount);
           }); 

            /**
             * insert Flights route.
             */  

           router.post('/api/insertFlight',function(req,res){
                  sess = req.session;
                  sess.flightIDs = req.body.flightsID;
                  console.log("flight added to session");
                  console.log("flight id ---->"+ req.body.flightsID.inFlight_id+"   "+req.body.flightsID.ouFlight_id);
                // personController.addPersonIntoDatabase(req.body.person[0],function(){
                  res.send('person added to the session');

           });   
 
/*
|==========================================================================
| Cancel Reservation Routes
|==========================================================================
|
| These routes are related to the Reservation.
  |
  */
     
            /**
             * get Reservations route.
             */
       router.get('/api/getReservation/:refNum', function(req, res) {
              manageController.searchBookings (req.params.refNum,function(returnedRes
                ,returnedBooking,returnedPerson,err){

                console.log("test");
                  if (err == true)
                  {
                    res.json("not found");
                  }
                  else
                  {
                     if (returnedRes != undefined)
                  res.json( {reservation : returnedRes[0],booking:returnedBooking[0],
                    person:returnedPerson[0]});
                else
                  res.json("not found");

                  }
               });
        });       
            
            /**
             * get Reservations route.
             */
        router.post('/api/cancelReservation', function(req, res) {
          console.log(req.body);
              manageController.cancelReservation (req.body.ref,function(){
                  
                    res.send("Reservation cancelled successfuly");
                   
                });
               
        });



        router.get('/api/flightsForTimetable', function(req, res) {
                 flightControl.getFlightsForTimeTable(function(outfli,infli){
                      var x={
                        outF:outfli,
                        inF:infli
                      };
                      // console.log("outdocs dsfsf :      --------------------->"+outfli);
                      // console.log("indocs  sdfdf :      --------------------->"+infli);
                      res.send(x);
                 });
               
        });



/*
|==========================================================================
| comfirmation Routes
|==========================================================================
|
| These routes are related to the comfirmation.
  |
  */         
            /**
             * getting payment information from session route.
             */
      router.get('/api/PaymentInfocomfirmation', function(req, res) {
    sess = req.session;
    console.log("Ahmed nazih");

    res.send(sess.paymentData);
        
      });


      router.get('/api/BookingInfocomfirmation', function(req, res) {
          sess = req.session;
          console.log("Session booking dataaaaaa ----------------------------------------");

          res.send(sess.bookingData);

        
      });
 
      router.get('/api/getPersonInfocomfirmation', function(req, res) {
        sess = req.session;
        res.send(sess.personArray);
    
      });  
      router.get('/api/sendBookingId', function(req, res) {
        sess = req.session; 
        //console.log(sess.bookinId);
        res.send(sess.bookinId);
    
      });  

           

/*
|==========================================================================
| Sessions Routes
|==========================================================================
|
| These routes are related to the Sessions.
  |
  */         
            /**
             * getting payment information from session route.
             */
              router.get('/api/completeBookingData', function(req, res) {
                sess = req.session;
                 console.log("in the completeBookingData route");
               saveAllBookingDataController.insertBookingData(sess.bookingData,function(err,booking){
                        if(err){
                          console.log(err);
                          res.send(err);
                        }else{
                                 console.log("new booking added"+booking);
                                 saveAllBookingDataController.insertReservationData(sess.flightIDs.inFlight_id , sess.flightIDs.ouFlight_id , booking._id,function(err, reserve){
                                       if(err){
                                        console.log(err);
                                       }else{
                                        console.log("new reservation added"+reserve);
                                        var i;
                                        
                                        saveAllBookingDataController.insertPersonalInformation(sess.personArray,booking._id,0,function(err,flag){
                                              
                                            if(err){
                                                 console.log("error"+err);
                                            }
                                            else{
                                                sess.bookinId=booking._id;
                                                console.log("new person added"+flag);
                                                saveAllBookingDataController.insertPaymentInformation(sess.paymentData,booking._id,function(err,payment){

                                                        saveAllBookingDataController.decreaseSeatsByNumber( sess.personArray.length,sess.flightIDs.ouFlight_id ,sess.flightIDs.inFlight_id ,function(err1,docs){
                                                        console.log("ID------------------------->"+sess.flightIDs.inFlight_id);
                                                            if(err1){
                                                              console.log("error---------------------------------->"+err1);
                                                              // res.send(err1);
                                                            }
                                                            else{
                                                              console.log("new payment added"+payment);
                                                              var message = "Booking is comfirmed";
                                                              res.send(message);
                                                           }
                                                       });  
                                                });    
                                            }

                                          });
                                            

                                        
                             
                                       }
                                 });
                        }
               });
             

          //  res.send(sess.paymentData);
        
      });
          
 
 /*
|==========================================================================
| Pinging Other Airlines Routes
|==========================================================================
|
| These routes are related to Pinging Other Airlines.
  |
  */      
  router.get('/api/flights/search/:origin/:destination/:departingDate/:class',function(req,res){
     var bookingData = {
      origin:req.params.origin,
      destination:req.params.destination,
      departingDate:req.params.departingDate,
      class:req.params.class,
      seats:req.params.seats
     }
      pingingOtherAirlinesServerController.getOneTripFlights(bookingData,function(returnedObject){
        res.json(returnedObject);
      });

  });
  router.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class',function(req,res){
     var bookingData = {
      origin:req.params.origin,
      destination:req.params.destination,
      departingDate:req.params.departingDate,
      returningDate: req.params.returningDate,
      class:req.params.class,
      seats:req.params.seats
     }
      pingingOtherAirlinesServerController.getRoundTripFlights(bookingData,function(returnedObject){
        res.json(returnedObject);
      });

  }); 
/*end point to send our publishable key and recieve the partenering airline publishable key*/
  router.get('/api//stripe/pubkey', function(req,res) {
      var AirFranceKey = {key : "pk_test_ULcStxFLM4quhm4JacResvRo"}; 
      
      req.send(AirFranceKey);


  });


  router.post('/booking', function(req, res) {
    
    var outgoingFlightId ;
    var returnedFlightId ;
    var errMessage = "";
   if(req.body.outgoingFlightId){
    outgoingFlightId = req.body.outgoingFlightId
   }else{
    outgoingFlightId = null ;
   }

    if(req.body.returnFlightId){
        returnedFlightId = req.body.returnFlightId
       }else{
        returnedFlightId = null ;
       }

    saveAllBookingDataController.fligtInformationsByID(outgoingFlightId,returnedFlightId,function(err,outgoingFlight,returnedFlight){
      if(err){
        console.log("err1 ------>"+err);
        errMessage+= err+"\n";
      }else{


      var ReturnDate;
      var Trip;
      if(returnedFlight){
        ReturnDate = returnedFlight.departureDateTime;
        trip = "round";
      }else{
        ReturnDate = null;
        trip = "one";
      }

      var bookingDate = {
                          trip:Trip,
                          from:outgoingFlight.origin,
                          To:outgoingFlight.destination,
                          DepartureDate:outgoingFlight.departureDateTime,
                          ReturnDate:ReturnDate,
                          NumberOfAdults:req.body.passengerDetails.length,
                          NumberOfChildren:0
                         };
     saveAllBookingDataController.insertBookingData(bookingData,function(err2,booking){
      if(err2){
      console.log("err2 ---->"+err2);
      errMessage+= err2+"\n";
    }else{
     console.log("new booking added"+booking);
     saveAllBookingDataController.insertReservationData(outgoingFlightId ,returnedFlightId, booking._id,function(err3, reserve){
           if(err3){
            console.log("err3---->"+err3);
            errMessage+= err3+"\n";
           }else{
            console.log("new reservation added"+reserve);
            var i;
            
            saveAllBookingDataController.insertPersonalInformation(req.body.passengerDetails,booking._id,0,function(err4,flag){
                  
                if(err4){
                     console.log("error4----->"+err4);
                     errMessage+= err4+"\n";
                }
                else{
                sess.bookinId=booking._id;
                console.log("new person added"+flag);
                //saveAllBookingDataController.insertPaymentInformation(sess.paymentData,booking._id,function(err,payment){

                        saveAllBookingDataController.decreaseSeatsByNumber( req.body.passengerDetails.length,outgoingFlightId ,returnedFlightId ,function(err5,docs){
                        console.log("ID------------------------->"+sess.flightIDs.inFlight_id);
                            if(err5){
                                      console.log("error---------------------------------->"+err5);
                                      errMessage+=err5+"\n";
                                    }
                                    else{

                                              // retrieve the token
                                              var stripeToken = req.body.paymentToken;
                                              var flightCost  = req.body.cost;


                                             // attempt to create a charge using token
                                            stripe.charges.create({
                                              amount: flightCost,
                                              currency: "usd",
                                              source: stripeToken,
                                              description: "test"
                                            }, function(err, data) {
                                            if (err) res.json({ refNum: null, errorMessage: err});
                                            else{
                                                var e = JSON.stringify(req.body);
                                                console.log(e);
                                                res.end("DONE" + e);
                                               // payment successful
                                               // create reservation in database
                                               // get booking reference number and send it back to the user
                                            }
                                            });
                                      var message = "Booking is comfirmed";
                                      if(booking._id){
                                        var returnedObject =  {
                                            refNum: booking._id,
                                            errorMessage: errMessage
                                        }
                                      res.json(returnedObject);
                                      }
                                       
                                   }
                               });  
                        // });    
                    }

                  });
                        

                    
         
                   }
             });
    }
     });

   }
    });   
    



});

module.exports = router;

    