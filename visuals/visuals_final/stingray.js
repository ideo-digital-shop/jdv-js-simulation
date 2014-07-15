(function(module){
	
	var maxD = 12.73;
	var timeFact = 0;
	var timeFactTimer = 0;
	var timeUp = 1;

	function setPosAndLED(valueStore){

		var w = valueStore.w;
		var h = valueStore.h;
		var t = valueStore.t;
		var m1 = 0.01;
		var m2 = 0.01;
		var m3 = 0.01;
		var atten = 0;
		var attenO = 0;
		var attenI = 0;		

		if( t - timeFactTimer > 1 ){
			timeFactTimer = t;
			if( timeUp == 1 ) timeFact += .01;
			else timeFact -= .01;			
		}

		if( timeFact >= 100 ) timeUp = 0;
		else if( timeFact <= 0 ) timeUp = 1;

		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){								
				attenO = (maxD - distToCenerLine( x , y ))/maxD;
				attenI = distToCenerLine( x , y )/maxD;
				atten = timeMix( attenO , attenI );				
				atten = Math.pow(atten,1.5);			
				valueStore.pos[x][y] = atten * .5 * Math.sin( 2*Math.PI * t/60000 + 2 * Math.PI * pythag((x+1)/w , (y+1)/h)) + .5;
				valueStore.led[x][y] = 2 * Math.abs(valueStore.pos[x][y] - .5) ;				
			}
		}		
	}

	if(module){

		module.exports.setPosAndLED = setPosAndLED;

	}

	function pythag( a , b ){
		return Math.pow( Math.pow(a,2)+Math.pow(b,2) , .5 );
	}

	function distToCenerLine( a , b ){
		return pythag( (b-a) , (a-b) ); 				
	}

	function phase(){
		return 2*Math.PI * pythag((x+1)/w , (y+1)/h);
	}

	function timeMix( a , b ){
		return ( timeFact/100 * a + (100 - timeFact)/100 * b );
	}

})(module);