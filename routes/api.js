var express = require('express');
     /**
       * requiring server controllers.
       */
var paymentController= require('../serverController/paymentController.js');
var contactUsController= require('../serverController/contactUsServerController.js');
    /**
     * requiring server validations.
     */

var paymentValidation= require('../Validations/paymentValidation.js');

var personController= require('../serverController/personController.js');
var personValidation= require('../Validations/personValidation.js');

var flightControl =  require('../serverController/flightController.js');

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

            			paymentController.addPaymentIntoDatabase(req.body.payment[0],function(){
            				res.send('payment added to the database');
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
                personController.addPersonIntoDatabase(req.body.person[0],function(){
                  res.send('person added to the database');
                });
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
                console.log("I am in the route guys");

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
   


module.exports = router;

    