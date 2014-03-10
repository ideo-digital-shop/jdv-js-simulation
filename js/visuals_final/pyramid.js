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

	var timeMultiplier = 1000;
		
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
			if(x==0 || y==0){
				valueStore.pos[x][y] =  0;
			}
			else if(x>=4 && y>=4){
				valueStore.pos[x][y] =  4/4;
			}
			else if(x>=3 && y>=3){
				valueStore.pos[x][y] =  3/4;
				console.log("x " + x + "y " + y + " val: " + valueStore.pos[x][y]);
			}
			else if(x>=2 && y>=2){
				valueStore.pos[x][y] =  2/4;
			}
			else if(x>=1 && y>=1){
				valueStore.pos[x][y] =  1/4;
			}
			//valueStore.pos[x][y] *= -1;
			//valueStore.pos[x][y] += 1;

			valueStore.pos[(w-1)-x][y] = valueStore.pos[x][y];
			valueStore.pos[x][(h-1)-y] = valueStore.pos[x][y];
			valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];

			var ledPos = (1 + Math.asin(Math.sin(t/timeMultiplier)))/2;

			valueStore.led[x][y] = 1-(Math.abs(valueStore.pos[x][y] - ledPos));

			//valueStore.led[x][y] = 1-valueStore.pos[x][y];
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