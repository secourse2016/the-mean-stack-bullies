$(document).ready(function()
{	var i;

		// document.getElementById("destNumb").innerHTML = 0;
	// for(i=0;i<10000;i++)
	// {
	// 	var x = i;
	// 	document.getElementById("destNumb").innerHTML = x;
	// }
	var counter=0;
$("#scrollLeftBtn").click(function(){
if(counter==0)	
{
$("#scrollLeftBtn").prop('disabled', true);
}
if(counter==1)
{
	$(".history").animate({left:'0%'},1000);
	counter--;
	console.log(counter);
}
if(counter==2)
{
	counter--;
	$(".history").animate({left:'-22%'},1000);
	console.log(counter);
}
if(counter==3)
{
	counter--;
	$(".history").animate({left:'-46%'},1000);
	console.log(counter);
}
if(counter==4)
{
	counter--;
	$(".history").animate({left:'-70%'},1000);
}

});
//
$("#scrollRightBtn").click(function(){

counter++;
console.log(counter)
if(counter==1)
{
	$(".history").animate({left:'-22%'},1000);
}
if(counter==2)
{
	$(".history").animate({left:'-47%'},1000);

}
if(counter==3)
{
	$(".history").animate({left:'-76%'},1000);
		$("#scrollRightBtn").prop('disabled', true);
}

if(counter==4)
{
	$(".history").animate({left:'-1000%'},1000);


}
});
var scrolled = false;
$(window).scroll(function() {
   var hT = $('.count').offset().top,
       hH = $('.count').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
   if (wS > (hT+hH-wH)){
   	if(scrolled==false)
   	{
   	scrolled=true;

      $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
  }
   }
});

// $(window).scroll(function() {
//    var hT = $('.count2').offset().top,
//        hH = $('.count2').outerHeight(),
//        wH = $(window).height(),
//        wS = $(this).scrollTop();
//    if (wS > (hT+hH-wH)){
//    	if(scrolled==false)
//    	{
//    	scrolled=true;

//       $('.count').each(function () {
//     $(this).prop('Counter',0).animate({
//         Counter: $(this).text()
//     }, {
//         duration: 1000,
//         easing: 'swing',
//         step: function (now) {
//             $(this).text(Math.ceil(now));
//         }
//     });
// });
//   }
//    }
// });
 // $(".login").animate({
 
	//  top:'10px'
	 
	//  },1500);
	$('#calendarDeparture').on('click', function () {
    $('#overlay, #overlay-back').fadeIn(500);

});



	$('#calendarReturn').on('click', function () {
    $('#overlay2, #overlay-back').fadeIn(500);
});
	$('.datepicker-body').on('click', function () {
	
    $('#overlay, #overlay-back').hide();
     $('#overlay2, #overlay-back').hide();
});
	

 
 });
 


