var express = require('express');

     /**
       * requiring server controllers.
       */
var paymentController = require('../serverController/paymentController.js');
var contactUsController= require('../serverController/contactUsServerController.js');
var saveAllBookingDataController= require('../serverController/saveAllBookingDataController.js');
var bookControl = require('../serverController/bookingController.js');
var paymentController= require('../serverController/paymentController.js');
var flightControl =  require('../serverController/flightController.js');
    /**
     * requiring server validations.
     */

var paymentValidation= require('../Validations/paymentValidation.js');
var paymentValidation= require('../Validations/paymentValidation.js'); 
var personController= require('../serverController/personController.js');
var personValidation= require('../Validations/personValidation.js');


var manageController =  require('../serverController/ManageBookingController.js');

var sess;

var router = express.Router();

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
                 
                personValidation.validatePerson(req.body.person[0],function(errmessage){
                   if(errmessage){
                    res.send(errmessage);
                   }else{

                    next();
                   }
                });     
          });

                    /**
                     * validating of payment middleware.
                     */
              router.post('/api/insertpayment', function(req, res,next) {
                 
                paymentValidation.validatePayment(req.body.payment[0],function(errmessage){
                   if(errmessage){
                    res.send(errmessage);
                   }else{

                    next();
                   }
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
            router.post('/api/insertpayment', function(req, res) {
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
      
        bookControl.comapreFlights(req.body.booking[0],function(err,outFlights,inFlights){ 
                    sess = req.session;
                     sess.bookingData = req.body.booking[0];
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
                        sess = req.session;
                        sess.flightData = returnedjson;
                       res.json(returnedjson);
                     }
                           
        }); 

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
                  sess.personData = req.body.person[0];
                  console.log("person data added to the session");
                // personController.addPersonIntoDatabase(req.body.person[0],function(){
                  res.send('person added to the session');
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
             * Inserting Flights route.
             */

  
        // router.get('/api/getFlight/:origin/:dest/:departureTime', function(req, res) {

        //     router.post('/api/insertperson', function(req, res) {
        //           personController.addPersonIntoDatabase(req.body.person[0],function(){
        //             res.send('person added to the database');
        //           });
        //     });       


        //       var flightData = [
        //       { 
        //       destination:req.params.dest,
        //       origin :req.params.origin,
        //       departureDateTime :req.params.departureTime
        //       }];

        //       flightControl.searchFlights(flightData,function(returnedFlights){
        //         res.json(returnedFlights);
        //        });

          
        // });

            /**
             * get Flights route.
             */
           router.get('/api/flights',function(req,res){
              sess = req.session;
              res.send(sess.flightData);
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
                  if (err == true)
                    res.json("not found");

                  res.json( {reservation : returnedRes[0],booking:returnedBooking[0],
                    person:returnedPerson[0]});
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
                      console.log("outdocs dsfsf :      --------------------->"+outfli);
                      console.log("indocs  sdfdf :      --------------------->"+infli);
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
 
      router.get('/api/getPersonInfocomfirmation', function(req, res) {
        sess = req.session;
        res.send(sess.personData);
    
      });  
           

/*
|==========================================================================
| Seesions Routes
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
                                        saveAllBookingDataController.insertPersonalInformation(sess.personData,booking._id,function(err,person){
                                               if(err){
                                                console.log(err);
                                               }else{
                                                console.log("new person added"+person);
                                            saveAllBookingDataController.insertPaymentInformation(sess.paymentData,booking._id,function(err,payment){
                                               console.log("new payment added"+payment);
                                               var message = "Booking is comfirmed";
                                               res.send(message);
                                            });    
                                                }

                                              });
                                       }
                                 });
                        }
               });
             

          //  res.send(sess.paymentData);
        
      });
          
       


module.exports = router;

    