function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var m1 = valueStore.m1;
	var m2 = valueStore.m2;
	var m3 = valueStore.m3;

	//console.log(w + ", " + h + ", " + t);
		
	for(var x = 0; x < w; x++){
		for(var y = 0; y < h; y++){

			valueStore.pos[x][y] = noise.perlin3(1, x * m1, y * m1) * Math.sin( t/10000 + x * y);
			valueStore.led[x][y] = 0.1 + Math.abs( noise.perlin3(1, y * m1, x * m1) * Math.sin( t/10000 + x * y) );	
			
		}

	}
	

}


if(module){

module.exports.setPosAndLED = setPosAndLED;

}