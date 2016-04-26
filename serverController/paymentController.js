var stripe = require("stripe")("sk_test_eI0A2eL166WZXsd51IOkmksT")


exports.chargeCard = function (stripeToken,cost,cb) { 
 
 console.log("in charge card");
 console.log(stripeToken);

var charge = stripe.charges.create({
  amount: cost, // amount in cents, again
  currency: "usd",
  source: stripeToken,
  description: "Example charge"
}, function(err, charge) {
  if (err) {
    console.log("CHARGE ERROR"); 
  } 
  else { 

   console.log("CHARGE CORRECT>>>" + charge); 
   cb(null,charge);
  }
});
 
	
}