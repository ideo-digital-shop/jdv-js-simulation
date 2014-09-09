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
	var amplitude = 0.5;
	var phase = 0;
	var bias = amplitude; //this brings the scale to 0 to 2*amplitude
	var time = (t + timeMultiplier) / 1000;
	var brightness = 0.1;
	var freq = 4;
	
	for (var y=0; y<10; y++) {

		brightness = y / 9;
		phase += (t / 4000) * toRadians(((y + 1) / 10) * 10);  //
		for (var x=0; x<10; x++) {
			// y = amp * sin(freq * time + phase) + bias
			// full cycle sine wave visualized in height across 1 row
			//freq = (y / 9) * TWOPI;
			time = (x / 9);
			valueStore.pos[x][y] = bias + (amplitude * Math.sin(freq * time + phase));
			valueStore.led[x][y] = heightToBrightness(valueStore.pos[x][y]);


		}
	}
}

// Normalize height to 0-1 range for brightness
// TODO: could be a transfer function to define a brightness compression
function heightToBrightness(height){
  return height / 1;
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