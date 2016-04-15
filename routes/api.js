var express = require('express');
var payControl= require('../serverController/paymentController.js');
var flightControl =  require('../serverController/flightController.js');
var router = express.Router();

/* APIs */
router.post('/api/insertpayment', function(req, res) {
	//console.log(req.body.payment[0]);
	payControl.addPaymentIntoDatabase(req.body.payment[0],function(){
		res.send('payment added to the database');
	});
  
});

router.get('/api/getFlight/:origin/:dest/:departureTime/:arrivalTime', function(req, res) {
		console.log("I am in the route guys");

	var flightData = [
	{
	destination:req.params.dest,
	origin :req.params.origin,
	departureDateTime :req.params.departureTime,
	arrivalDateTime :req.params.arrivalTime
	}];

	flightControl.searchFlights(flightData,function(returnedFlights){
	 	res.json(returnedFlights);
	 });

  
});


module.exports = router;

    