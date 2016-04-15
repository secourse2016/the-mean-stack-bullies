var express = require('express');
var paymentController= require('../serverController/paymentController.js');
var paymentValidation= require('../Validations/paymentValidation.js');
var router = express.Router();

/*
|==========================================================================
| Payment Routes
|==========================================================================
|
| These routes are related to the Payments.
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
     * Inserting payment route.
     */
router.post('/api/insertpayment', function(req, res) {

			paymentController.addPaymentIntoDatabase(req.body.payment[0],function(){
				res.send('payment added to the database');
			});
	
  
});

module.exports = router;

    