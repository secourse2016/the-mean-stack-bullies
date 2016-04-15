exports.validatePayment = function(newPayment){
 if(req.body.payment[0].CardHolderName == null||!(/^[a-z ,.'-]+$/i.test(req.body.payment[0].CardHolderName))){
          res.send("please enter a valid card name");
        }else if(req.body.payment[0].CardHolderNo== null||!(/^[0-9]{16}$/.test(req.body.payment[0].CardHolderNo))){
           res.send("please enter a valid card number");

        }else if((req.body.payment[0].Cvv == null)||!(/^[0-9]{3}$/.test(req.body.payment[0].Cvv ))){
           res.send("please enter a valid CVV");

        }else if(req.body.payment[0].ExpiryDate== null){
           res.send("please choose expiry year");

        }
        else{}
}
 
