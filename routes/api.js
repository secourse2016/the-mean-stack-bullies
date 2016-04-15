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
       console.log("in the payment api");
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

      contactUsController.addPaymentIntoDatabase(req.body.payment[0],function(){
        res.send('payment added to the database');
      });


module.exports = router;

    