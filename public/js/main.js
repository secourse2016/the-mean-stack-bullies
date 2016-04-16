$(document).ready(function()
{	var i;
	for(i=0;i<10000;i++)
	{
		console.log(i);
	}
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
 // $(".login").animate({
 
	//  top:'10px'
	 
	//  },1500);
});