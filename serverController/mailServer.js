var nodemailer =require('nodemailer');
var transporter = nodemailer.createTransport({
service: 'Gmail',
auth: {
    user: 'airfrance.airline.2016@gmail.com',
    pass: 'TheMeanStackBullies'
}
});

exports.SendEmail(receiverMail,subject,htmlBody,cb){
	// var mailOption = {
	// 	from: 'Hatem Morgan <hatemmorgan17@gmail.com>',
	// 	to: 'maha.ehab.elleci@gmail.com',
	// 	subject: 'Air France Comfirmation',
	// 	html: '<h1> Hello maha</h1> <br> <h4>welcome to AirFrance we are happy to serve you</h4> <br><br><br> <h5>mail is send by your scrum master :P</h5>',
	// }
       var mailOption = {
		from: 'AirFrance Team <airfrance.airline.2016@gmail.com>',
		to: receiverMail,
		subject: subject,
		html: htmlBody,

	};
	transporter.sendMail(mailOption,function(err,info){
	    if(err){
	    	return console.error(err);
	    }else{
	    	console.log("message sent");
	    }
	    cb(err);
	})	
}
