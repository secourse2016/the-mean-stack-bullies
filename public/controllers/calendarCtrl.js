app.controller('calendarCtrl', function($scope, $location) {

 	var Today=new Date();
 	console.log("today: "+Today.getDay());
 	var Year= Today.getFullYear();
 	$scope.Year=Year;
 	var month=Today.getUTCMonth()+1;
 	var month1=Today.getUTCMonth();
 	console.log("month"+month);
 	var d=Today.getUTCDate();
 	console.log("day"+d);
 	// $scope.ngclass="datepicker-td";
    


 	var i1={
 		day:1,
 		class:"datepicker-td"
 	};
 	var i2={
 		day:2,
 		class:"datepicker-td"
 	};
 	var i3={
 		day:3,
 		class:"datepicker-td"
 	};
 	var i4={
 		day:4,
 		class:"datepicker-td"
 	};
 	var i5={
 		day:5,
 		class:"datepicker-td"
 	};
 	var i6={
 		day:6,
 		class:"datepicker-td"
 	};
 	var i7={
 		day:7,
 		class:"datepicker-td"
 	};
 	var i8={
 		day:8,
 		class:"datepicker-td"
 	};
 	var i9={
 		day:9,
 		class:"datepicker-td"
 	};
 	var i10={
 		day:10,
 		class:"datepicker-td"
 	};
 	var i11={
 		day:11,
 		class:"datepicker-td"
 	};
 	var i12={
 		day:12,
 		class:"datepicker-td"
 	};
 	var i13={
 		day:13,
 		class:"datepicker-td"
 	};
 	var i14={
 		day:14,
 		class:"datepicker-td"
 	};
 	var i15={
 		day:15,
 		class:"datepicker-td"
 	};
 	var i16={
 		day:16,
 		class:"datepicker-td"
 	};
 	var i17={
 		day:17,
 		class:"datepicker-td"
 	};
 	var i18={
 		day:18,
 		class:"datepicker-td"
 	};
 	var i19={
 		day:19,
 		class:"datepicker-td"
 	};
 	var i20={
 		day:20,
 		class:"datepicker-td"
 	};
 	var i21={
 		day:21,
 		class:"datepicker-td"
 	};
 	var i22={
 		day:22,
 		class:"datepicker-td"
 	};
 	var i23={
 		day:23,
 		class:"datepicker-td"
 	};
 	var i24={
 		day:24,
 		class:"datepicker-td"
 	};
 	var i25={
 		day:25,
 		class:"datepicker-td"
 	};
 	var i26={
 		day:26,
 		class:"datepicker-td"
 	};
 	var i27={
 		day:27,
 		class:"datepicker-td"
 	};
 	var i28={
 		day:28,
 		class:"datepicker-td"
 	};
 	var i29={
 		day:29,
 		class:"datepicker-td"
 	};
 	var i30={
 		day:30,
 		class:"datepicker-td"
 	};
 	var i31={
 		day:31,
 		class:"datepicker-td"
 	};

 	var n1={
 		day:1,
 		class:"datepicker-td off"
 	};
 	var n2={
 		day:2,
 		class:"datepicker-td off"
 	};
 	var n3={
 		day:3,
 		class:"datepicker-td off"
 	};
 	var n4={
 		day:4,
 		class:"datepicker-td off"
 	};
 	var n5={
 		day:5,
 		class:"datepicker-td off"
 	};
 	var n6={
 		day:6,
 		class:"datepicker-td off"
 	};


 	var n31={
 		day:31,
 		class:"datepicker-td off"
 	};
 	var n30={
 		day:30,
 		class:"datepicker-td off"
 	};
 	var n29={
 		day:29,
 		class:"datepicker-td off"
 	};
 	var n28={
 		day:28,
 		class:"datepicker-td off"
 	};
 	var n27={
 		day:27,
 		class:"datepicker-td off"
 	};
 	var n26={
 		day:26,
 		class:"datepicker-td off"
 	};

 	var week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 	var firstDayInMonth=new Date(Year, month1,1);
	var dayInWeek = week[ firstDayInMonth.getDay() ];

	if(dayInWeek=="Sunday"){
		$scope.days1=[n26,n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5];
	}
	if(dayInWeek=="Monday"){
		$scope.days1=[i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4];
	}
	if(dayInWeek=="Tuesday"){
		$scope.days1=[n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3];
	}
	if(dayInWeek=="Wednesday"){
		$scope.days1=[n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2];
	}
	if(dayInWeek=="Thursday"){
		$scope.days1=[n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1];
	}
	if(dayInWeek=="Friday"){
		$scope.days1=[n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31];
	}
	if(dayInWeek=="Saturday"){
		$scope.days1=[n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5,n6];
	}
	var i=0;
	 	for(i=0;i<$scope.days1.length;i++){
	 		if($scope.days1[i].day==d && $scope.days1[i].class !="datepicker-td off" ){
	 			$scope.days1[i].class="datepicker-td today";
	 		}
	 	}
 	
 	


		if(month==1){
			$scope.Month="JAN";
		}
		if(month==2){
			$scope.Month="FEB";
		}
		if(month==3){
			$scope.Month="MAR";
		}
		if(month==4){
			$scope.Month="APR";
		}
		if(month==5){
			$scope.Month="MAY";
		}
		if(month==6){
			$scope.Month="JUN";
		}
		if(month==7){
			$scope.Month="JUL";
		}
		if(month==8){
			$scope.Month="AUG";
		}
		if(month==9){
			$scope.Month="SEP";
		}
		if(month==10){
			$scope.Month="OCT";
		}
		if(month==11){
			$scope.Month="NOV";
		}
		if(month==12){
			$scope.Month="DEC";
		}

	$scope.setDepartureDate=function(day){
		var prevMonth;
		if($scope.Month=="JAN"){
			prevMonth=12;
		}
		if($scope.Month=="FEB"){
			prevMonth=1;
		}
		if($scope.Month=="MAR"){
			prevMonth=2;
		}
		if($scope.Month=="APR"){
			prevMonth=3;
		}
		if($scope.Month=="MAY"){
			prevMonth=4;
		}
		if($scope.Month=="JUN"){
			prevMonth=5;
		}
		if($scope.Month=="JUL"){
			prevMonth=6;
		}
		if($scope.Month=="AUG"){
			prevMonth=7;
		}
		if($scope.Month=="SEP"){
			prevMonth=8;
		}
		if($scope.Month=="OCT"){
			prevMonth=9;
		}
		if($scope.Month=="NOV"){
			prevMonth=10;
		}
		if($scope.Month=="DEC"){
			prevMonth=11;
		}
	    var date=new Date($scope.Year,prevMonth,day);
		 $scope.depDate = date;
	  	 $('#retDateCalender').val(date+'');
    }

   $scope.getDepartureDate = function(){
    	return $scope.depDate;
    }
    $scope.setReturnDate=function(day){
	    var prevMonth;
		if($scope.Month=="JAN"){
			prevMonth=12;
		}
		if($scope.Month=="FEB"){
			prevMonth=1;
		}
		if($scope.Month=="MAR"){
			prevMonth=2;
		}
		if($scope.Month=="APR"){
			prevMonth=3;
		}
		if($scope.Month=="MAY"){
			prevMonth=4;
		}
		if($scope.Month=="JUN"){
			prevMonth=5;
		}
		if($scope.Month=="JUL"){
			prevMonth=6;
		}
		if($scope.Month=="AUG"){
			prevMonth=7;
		}
		if($scope.Month=="SEP"){
			prevMonth=8;
		}
		if($scope.Month=="OCT"){
			prevMonth=9;
		}
		if($scope.Month=="NOV"){
			prevMonth=10;
		}
		if($scope.Month=="DEC"){
			prevMonth=11;
		}
	    var date=new Date($scope.Year,prevMonth,day);
		 $scope.retDate=new Date(date);
	  	 $('#depDateCalender').val(date+'');
    }

   $scope.getReturnDate = function(){
    	return $scope.depDate;
    }
	$scope.perv=function(Month){
		
		var prevMonth;
		if(Month=="JAN"){
			$scope.Month="DEC";

			$scope.Year=$scope.Year-1;
			prevMonth=11;
		}
		if(Month=="FEB"){
			$scope.Month="JAN";
			prevMonth=12;
		}
		if(Month=="MAR"){
			$scope.Month="FEB";
			prevMonth=1;
		}
		if(Month=="APR"){
			$scope.Month="MAR";
			prevMonth=2;
		}
		if(Month=="MAY"){
			$scope.Month="APR";
			prevMonth=3;
		}
		if(Month=="JUN"){
			$scope.Month="MAY";
			prevMonth=4;
		}
		if(Month=="JUL"){
			$scope.Month="JUN";
			prevMonth=5;
		}
		if(Month=="AUG"){
			$scope.Month="JUL";
			prevMonth=6;
		}
		if(Month=="SEP"){
			$scope.Month="AUG";
			prevMonth=7;
		}
		if(Month=="OCT"){
			$scope.Month="SEP";
			prevMonth=8;
		}
		if(Month=="NOV"){
			$scope.Month="OCT";
			prevMonth=9;
		}
		if(Month=="DEC"){
			$scope.Month="NOV";
			prevMonth=10;
		}

		$scope.days1=[];
	var nextFirstDay=new Date($scope.Year, prevMonth,1);
	dayInWeek = week[ nextFirstDay.getDay() ];

	if(dayInWeek=="Sunday"){
		$scope.days1=[n26,n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5];
	}
	if(dayInWeek=="Monday"){
		$scope.days1=[i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4];
	}
	if(dayInWeek=="Tuesday"){
		$scope.days1=[n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3];
	}
	if(dayInWeek=="Wednesday"){
		$scope.days1=[n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2];
	}
	if(dayInWeek=="Thursday"){
		$scope.days1=[n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1];
	}
	if(dayInWeek=="Friday"){
		$scope.days1=[n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31];
	}
	if(dayInWeek=="Saturday"){
		$scope.days1=[n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5,n6];
	}
	var i=0;
	 	for(i=0;i<$scope.days1.length;i++){
	 		if($scope.days1[i].class !="datepicker-td off" ){
	 			$scope.days1[i].class="datepicker-td ";
	 		}
	 	}


	}


	$scope.next=function(Month){
		var nextMonth;

		if(Month=="JAN"){
			$scope.Month="FEB";
			nextMonth=1;
		}
		if(Month=="FEB"){
			$scope.Month="MAR";
			nextMonth=2;
		}
		if(Month=="MAR"){
			$scope.Month="APR";
			var nextMonth=3;
		}
		if(Month=="APR"){
			$scope.Month="MAY";
			var nextMonth=4;
		}
		if(Month=="MAY"){
			$scope.Month="JUN";
			var nextMonth=5;
		}
		if(Month=="JUN"){
			$scope.Month="JUL";
			var nextMonth=6;
		}
		if(Month=="JUL"){
			$scope.Month="AUG";
			var nextMonth=7;
		}
		if(Month=="AUG"){
			$scope.Month="SEP";
			var nextMonth=8;
		}
		if(Month=="SEP"){
			$scope.Month="OCT";
			var nextMonth=9;
		}
		if(Month=="OCT"){
			$scope.Month="NOV";
			var nextMonth=10;
		}
		if(Month=="NOV"){
			$scope.Month="DEC";
			var nextMonth=11;
		}
		if(Month=="DEC"){
			$scope.Month="JAN";
			$scope.Year=$scope.Year+1;
			var nextMonth=11;
		}

	$scope.days1=[];
	var nextFirstDay=new Date($scope.Year, nextMonth,1);
	dayInWeek = week[ nextFirstDay.getDay() ];

	if(dayInWeek=="Sunday"){
		$scope.days1=[n26,n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5];
	}
	if(dayInWeek=="Monday"){
		$scope.days1=[i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4];
	}
	if(dayInWeek=="Tuesday"){
		$scope.days1=[n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3];
	}
	if(dayInWeek=="Wednesday"){
		$scope.days1=[n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2];
	}
	if(dayInWeek=="Thursday"){
		$scope.days1=[n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1];
	}
	if(dayInWeek=="Friday"){
		$scope.days1=[n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31];
	}
	if(dayInWeek=="Saturday"){
		$scope.days1=[n27,n28,n29,n30,n31,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,n1,n2,n3,n4,n5,n6];
	}
	var i=0;
	 	for(i=0;i<$scope.days1.length;i++){
	 		if($scope.days1[i].day==d && $scope.days1[i].class !="datepicker-td off"  ){
	 			$scope.days1[i].class="datepicker-td today";
	 		}
	 	}



	}
	
 });