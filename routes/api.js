var express = require('express');
var payControl= require('../serverController/paymentController.js');
var router = express.Router();

/* APIs */

router.post('/api/insertpayment', function(req, res) {

			payControl.addPaymentIntoDatabase(req.body.payment[0],function(){
				res.send('payment added to the database');
			});
	
  
});

module.exports = router;

    