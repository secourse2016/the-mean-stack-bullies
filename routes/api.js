var express = require('express');
var payControl= require('../serverController/paymentController.js'); 
var bookControl = require('../serverController/bookingController.js');
var router = express.Router();

/* APIs */
router.post('/api/insertpayment', function(req, res) {
	//console.log(req.body.payment[0]);
	payControl.addPaymentIntoDatabase(req.body.payment[0],function(){
		res.send('payment added to the database');
	});
  
}); 


router.post('/api/validateData', function(req,res) { 
  
    
    

});

module.exports = router;

    