//awesome sinusoidal wave that finds harmonics
function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var m1 = valueStore.m1;
	var m2 = valueStore.m2;
	var m3 = valueStore.m3;

	var timeMultiplier = 5000;
		


	for(var x=0; x<5; x++){
		for(var y=0; y<5; y++){


			valueStore.pos[x][y] = ( y / 4 ) * Math.sin(( y / 5 ));
			valueStore.pos[x][y] *= -(1 + Math.sin(t/timeMultiplier))/2;
			valueStore.pos[x][y] += 1;
			//reflect horizontally
			valueStore.pos[(w-1)-x][y] = valueStore.pos[y][x];
			valueStore.pos[x][(h-1)-y] = valueStore.pos[y][x];
			valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];

			valueStore.led[x][y] = 1-valueStore.pos[x][y];
			valueStore.led[(w-1)-x][y] = 1-valueStore.pos[(w-1)-x][y];
			valueStore.led[x][(h-1)-y] = 1-valueStore.pos[x][(h-1)-y];
			valueStore.led[(w-1)-x][(h-1)-y] = 1-valueStore.pos[(w-1)-x][(h-1)-y];


		}
	}

	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}