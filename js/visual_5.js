//awesome sinusoidal wave that finds harmonics
function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var m1 = valueStore.m1;
	var m2 = valueStore.m2;
	var m3 = valueStore.m3;

	var timeMultiplier = 10000;
		
	for(var x = 0; x < w; x++){
		for(var y = 0; y < h; y++){

			var mult = 1;
			if ( x % 2 == true ) {
				mult = -1; 
			}
			
			valueStore.pos[x][y] = ( 1 + Math.sin((( y + 1 ) / h) * t/timeMultiplier  + ( x / w )))/ 2;
			valueStore.led[x][y] = valueStore.pos[x][y];;


		}

	}
	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}