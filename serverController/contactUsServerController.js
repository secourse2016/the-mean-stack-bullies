var mailServices = require('./mailServer');
/**
 * sending comfirmation mail to guest who submit the form
 */
exports.sendUserContactUsComfirmation = function(contactUSForm ,cb){
	var subject = "Your message was received successfully";
	var htmlBody = "<p>Dear+'"contactUSForm.firstName"'</p> <br> <p>AirFrance customer service received your message and they will procces it soonly and reply to you </p> <br> <p>Thank you for keeping in touch </p> <br> <p>AirFrance customer service team</p>"
   mailServices.SendEmail(contactUSForm.email,subject,htmlBody,function(err){
       if(err){
       	cd(err);
       }else{
       	cb(null);
       }
   })
};
/**
 * sending mail to Airfrance Mail who submit the form
 */

exports.sendUserContactUsComfirmation = function(contactUSForm ,cb){
	toMail ="airfrance.airline.2016@gmail.com";
	var subject = "ContactUS form is received";
	var htmlBody = "<h3>UserName : +'"contactUSForm.firstName"'+" "+'"contactUSForm.lastName"'+</h3><br><h3>email : +'"contactUSForm.email"'+ </h3><br><h3>Message : +'"contactUSForm.message"'+ </h3> "
   mailServices.SendEmail(toMail,subject,htmlBody,function(err){
       if(err){
       	cd(err);
       }else{
       	cb(null);
       }
   })
}

 
