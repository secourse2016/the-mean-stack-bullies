var express = require('express');
var payControl= require('../serverController/paymentController.js');
var router = express.Router();

/* APIs */
router.post('/api/insertpayment', function(req, res) {
	//console.log(req.body.payment[0]);
	payControl.addPaymentIntoDatabase(req.body.payment[0],function(){
		res.send('payment added to the database');
	});
  
}); 


// router.get('/api/validateData', function(req,res) { 

  


// })

module.exports = router;

    