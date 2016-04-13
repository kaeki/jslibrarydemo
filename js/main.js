"use strict";
(function($) {
$(window).load(function() {
	jQuery('#raptor').raptorize();
/*
	//For the Timer version
	$(window).load(function() {
		$('.button').raptorize({
			'enterOn' : 'timer',
			'delayTime' : 2000
		});
	});	

	*/
	//Retrieves 
	function getTrainDelay(trainArray){
		jQuery.get( "http://rata.digitraffic.fi/api/v1//live-trains?station=HKI&arriving_trains=1", function( data ) {
	  		console.log(data);
	  		console.log(data[0].timeTableRows[0].differenceInMinutes);
	  		for(var i = 0; i < data.length; i++){
	  			for(var k = 0; k < data[i].timeTableRows.length; k++){
	  				var differenceInMinutes = data[i].timeTableRows[k].differenceInMinutes;
	  				if(differenceInMinutes != "undefined"){
	  					trainArray.push(differenceInMinutes);
	  					console.log(differenceInMinutes);
	  				}
	  			}
	  		}
		});
		return trainArray;
	}
	function sortTrainArray(arrayOfTrains){
		var trainOnTime = [];
		var trainOneMinuteLate = [];
		var trainTwoMinuteLate = [];
		var trainTreeOrMoreLate = [];
		for (var i=0; i<arrayOfTrains.length; i++){
			console.log(arrayOfTrains.length);
			if(arrayOfTrains[i] === 0){
				trainOnTime.push(arrayOfTrains[i]);
			}
			else if(arrayOfTrains[i] === 1){
				trainOneMinuteLate.push(arrayOfTrains[i]);
			}
			else if(arrayOfTrains[i] === 2){
				trainTwoMinuteLate.push(arrayOfTrains[i]);
			}
			else if(arrayOfTrains[i] >= 3){
				trainTreeOrMoreLate.push(arrayOfTrains[i]);
			}
		} 
		return {
			onTime: trainOnTime.length,
			minuteLate: trainOneMinuteLate.length,
			twoMinuteLate: trainTwoMinuteLate.length,
			treeOrMore: trainTreeOrMoreLate.length
		};
	}
	jQuery('#train').click(function(){
		var arrayOfTrains = [];
		var trains;
		getTrainDelay(arrayOfTrains);
		
		console.log(arrayOfTrains);
		setTimeout(function() {
		    trains = sortTrainArray(arrayOfTrains);
		    console.log("JEHEES "+trains.onTime);
		}, 1000);


		setTimeout(function(){
			var pieLegendElement = document.getElementById('pieLegend');
			pieLegendElement.innerHTML += '<li data-value="'+trains.onTime+'">Train on schedule('+trains.onTime+')</li>';
			pieLegendElement.innerHTML += '<li data-value="'+trains.minuteLate+'">1 minute late('+trains.minuteLate+')</li>';
			pieLegendElement.innerHTML += '<li data-value="'+trains.twoMinuteLate+'">2 minutes late('+trains.twoMinuteLate+')</li>';
			pieLegendElement.innerHTML += '<li data-value="'+trains.treeOrMore+'">3 or more minutes late('+trains.treeOrMore+')</li>';
		}, 1100);
		setTimeout(function(){
		console.log('PIZZAAAAA');
		Pizza.init()}, 1500);
	});
	
});
})(jQuery);