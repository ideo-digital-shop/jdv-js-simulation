function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	
	var m1 = 0.01;
	var m2 = 0.01;
	var m3 = 0.01;

	var timeMultiplier = 5000;
	
	// constants
	var TWOPI = 2 * Math.PI;

	// Sine properties
	var amplitude = 0.25;
	var phase = 0;
	var bias = amplitude; //this brings the scale to 0 to 2*amplitude
	var time = (t+4000)/timeMultiplier;
	var brightness = 0.1;
	var freq = 4;

	for (var y=0; y<10; y++) {

		brightness = y / 9;
		phase += (y / 9) * 100;
		for (var x=0; x<10; x++) {
			// y = amp * sin(freq * time + phase) + bias
			// full cycle sine wave visualized in height across 1 row
			//freq = (y / 9) * TWOPI;
			time = (x / 9);
			valueStore.pos[x][y] = bias + (amplitude * Math.sin(freq * time + phase));
			valueStore.led[x][y] = brightness;

//* (t / timeMultiplier)
/*
			
			for(var y=0; y<5; y++){


				valueStore.pos[x][y] =  (( y / 4 ) * Math.cos(( y / 5 )));
				valueStore.pos[x][y] *= -(1 + Math.sin(t/timeMultiplier))/2;
				valueStore.pos[x][y] += 1;

				valueStore.pos[(w-1)-x][y] = valueStore.pos[x][y];
				valueStore.pos[x][(h-1)-y] = valueStore.pos[x][y];
				valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];

				valueStore.led[x][y] = 1-valueStore.pos[x][y];
				valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
				valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
				valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];

*/

		}
	}
}


function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}