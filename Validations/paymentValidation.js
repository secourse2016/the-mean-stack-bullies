exports.validatePayment = function(newPayment){
  String errMessage = '';
  Boolean isvalid = true;
       if(newPayment.CardHolderName == null||!(/^[a-z ,.'-]+$/i.test(newPayment.CardHolderName))){
                errMessage+="please enter a valid card name \n";
                isvalid = false;
                  }
       if(newPayment.CardHolderNo== null||!(/^[0-9]{16}$/.test(newPayment.CardHolderNo))){
                 errMessage+="please enter a valid card number \n";
                 isvalid = false;
                  }
       if((newPayment.Cvv == null)||!(/^[0-9]{3}$/.test(newPayment.Cvv ))){
                 errMessage+="please enter a valid CVV \n";
                 isvalid = false;

                  } 

       if(newPayment.ExpiryDate== null){
                errMessage+="please choose expiry year \n";
                isvalid = false;
                 }
       if(isvalid == true){
               errMessage =null;
                 }
  return errMessage;
}
 
