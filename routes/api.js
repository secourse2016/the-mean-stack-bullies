var express = require('express');

     /**
       * requiring server controllers.
       */
var paymentController= require('../serverController/paymentController.js');
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
         console.log("in route");
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

  
        router.get('/api/getFlight/:origin/:dest/:departureTime', function(req, res) {

            router.post('/api/insertperson', function(req, res) {
                  personController.addPersonIntoDatabase(req.body.person[0],function(){
                    res.send('person added to the database');
                  });
            });       


              var flightData = [
              { 
              destination:req.params.dest,
              origin :req.params.origin,
              departureDateTime :req.params.departureTime
              }];

              flightControl.searchFlights(flightData,function(returnedFlights){
                res.json(returnedFlights);
               });

          
        });

       router.get('/api/getReservation/:refNum', function(req, res) {
              manageController.searchBookings (req.params.refNum,function(returnedRes,returnedBooking){
               

                  res.json( {reservation : returnedRes[0],booking:returnedBooking[0]});
               });
        });
        router.post('/api/cancelReservation', function(req, res) {
              manageController.cancelReservation (req.body.refNum,function(){
                  
                    res.send("Reservation cancelled successfuly");
                   
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
 
      router.get('/api/getPersonInfo', function(req, res) {
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

               saveAllBookingDataController.insertBookingData(sess.bookingData,function(err,booking){
                        if(err){
                          console.log(err);
                          res.send(err);
                        }else{
                                 console.log("new booking added"+booking);
                                 //saveAllBookingDataController.insertReservationData(.toString(),booking._id,function(){

                                 //});
                        }
               });
             

          //  res.send(sess.paymentData);
        
      });
          
       


module.exports = router;

    