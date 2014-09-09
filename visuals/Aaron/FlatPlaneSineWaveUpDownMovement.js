(function(module){
    

	function setPosAndLED(valueStore){

		var w = valueStore.w;
		var h = valueStore.h;
		var t = valueStore.t; // in milliseconds
		
		var m1 = 0.01;
		var m2 = 0.01;
		var m3 = 0.01;

		var timeMultiplier = 5000;
		
		// constants
		var TWOPI = 2 * Math.PI;

		// Sine properties
		var amplitude = 0.5;
		var phaseDeg = 0;
		var phaseRad = toRadians(phaseDeg);
		var bias = amplitude; //this brings the scale to 0 to 2*amplitude
		var timeInSeconds = t / 1000; // convert milliseconds to seconds
		var brightness = 0.1;
		var freqHz = 15; // in Hertz
		var freqRad = toRadians(freqHz); // in Radians

		console.log(t);

		//phaseRad = timeInSeconds;
		for (var y=0; y<10; y++) {

			brightness = y / 9;
			//phaseRad += toRadians((y + timeInSeconds) / 0.1);
			for (var x=0; x<10; x++) {
				// y = amp * sin(freq * time + phase) + bias
				// full cycle sine wave visualized in height across 1 row
				//freq = (y / 9) * TWOPI;
				sineSample = (x / 9);

				// Math.sin() expects radians
				valueStore.pos[x][y] = bias + (amplitude * Math.sin(freqRad * (timeInSeconds + sineSample) + phaseRad));
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
})(module);