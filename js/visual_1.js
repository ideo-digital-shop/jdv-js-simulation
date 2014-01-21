function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var m1 = 0.01;
	var m2 = 0.01;
	var m3 = 0.01;
	for(var x = 0; x < w; x++){
		for(var y = 0; y < h; y++){

			//m1 = 0.01
			//m1 = 0.033

			valueStore.pos[x][y] = (1 + noise.perlin3(1, (x+1) * m1, (y+1) * m1) * Math.sin( t/10000 + (x) * (y)))/2;
			valueStore.led[x][y] = valueStore.pos[x][y];

		}

	}
	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}