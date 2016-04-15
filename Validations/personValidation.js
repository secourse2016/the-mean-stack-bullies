exports.validatePerson = function(newPerson,cb){
  var errMessage ="";
  var isvalid = true;

           if(newPerson.firstName == null||!(/^[a-z ,.'-]+$/i.test(newPerson.firstName))){
          errMessage+="please enter a valid First name \n";
          isvalid = false;
          }
         if(newPerson.lastName == null||!(/^[a-z ,.'-]+$/i.test(newPerson.lastName))){
          errMessage+="please enter a valid Last name \n";
          isvalid = false;
          }
          if(newPerson.nationality == null||!(/^[a-z ,.'-]+$/i.test(newPerson.nationality))){
          errMessage+="please enter a valid Nationality \n";
          isvalid = false;
          }
         if((newPerson.age == null)||!(/^[0-9]{2}$/.test(newPerson.age ))){
           errMessage+="please enter a valid age \n";
           isvalid =false;
          }
         if(newPerson.passportNumber == null||!(/^[0-9]{8}$/.test(newPerson.passportNumber))){
          errMessage+="please enter a valid Passport Number \n";
          isvalid = false;
          }
         if(newPerson.issueDate== null){
           errMessage+="please choose the issue date \n";
           isvalid =false;
          } 
         if(newPerson.expiryDate== null){
           errMessage+="please choose choose expiry date \n";
           isvalid =false;
          }
         if(isvalid == true){
          errMessage = null;
         } 
  cb(errMessage);
}