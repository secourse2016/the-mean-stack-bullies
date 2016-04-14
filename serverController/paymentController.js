var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.addPaymentIntoDatabase =function(payment,cb){
	//console.log("hereees"+payment.CardHolderName);
  var PaymentModel = mongoose.model('Payment');
	var newpayment = new PaymentModel(payment);
     console.log("heree");
	newpayment.save(function (err,payment) {
       if (err) {
       	return console.error(err);
       }
        console.log(payment);
         cb(payment);
      });
	
}