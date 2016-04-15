var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.addPaymentIntoDatabase =function(payment,cb){
	//console.log("hereees"+payment.CardHolderName);
  var PaymentModel = mongoose.model('Payment');
	var newpayment = new PaymentModel(payment);
     console.log("new payment"+newpayment);
	newpayment.save(function (err,payment) {
    console.log("in the save function");
       if (err) {
       	return console.error(err);
       }
        console.log("lo");
         cb(payment);
      });
	console.log("ereeee");
}