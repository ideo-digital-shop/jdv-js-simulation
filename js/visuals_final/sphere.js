(function(module){

	var currentSide = 0;
	bulb_led_arr = new Array(10);

	for(var a = 0; a < 10; a++){
		bulb_led_arr[a] = new Array(10);
	}

	bulb_init = false;

	var height = 1;
	


//awesome sinusoidal wave that finds harmonics
function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	
	var m1 = 0.01;
	var m2 = 0.01;
	var m3 = 0.01;

	var timeMultiplier = 5000;
		
	if(!bulb_init){
		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){
			}
		}
		bulb_init = true;
	}

	for(var x=0; x<5; x++){
		for(var y=0; y<5; y++){

			//var tx = x*(1 + Math.sin(t/timeMultiplier))/2;
			//var ty = y*(1 + Math.sin(t/timeMultiplier))/2;
			var mult = 1;
				if ( x % 2 == true ) {
					mult = -1; 
				}


			var zPos = Math.sqrt(Math.pow(0.5,2) - Math.pow((x/8)-0.5,2) - Math.pow((y/8)-0.5,2));
			valueStore.pos[x][y] = mult*zPos;

			//valueStore.pos[x][y] *= -1;
			//valueStore.pos[x][y] += 1;

			valueStore.pos[(w-1)-x][y] = valueStore.pos[x][y];
			valueStore.pos[x][(h-1)-y] = valueStore.pos[x][y];
			valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];



			valueStore.led[x][y] = 1-valueStore.pos[x][y];
			valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
			valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
			valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];

			

		}
	}

	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}

})(module);

