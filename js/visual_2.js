function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var m1 = valueStore.m1;
	var m2 = valueStore.m2;
	var m3 = valueStore.m3;
		
	for(var x = 0; x < w; x++){
		for(var y = 0; y < h; y++){

			//m1 = 0.01
			//m1 = 0.033
			var mult = 1;
			if ( x % 2 == true ) {
				mult = -1; 
			}
			
			valueStore.pos[x][y] =  0.5*Math.sin( ((y+1)/h)*mult*t/10000  + (x/w));
			//valueStore.pos[x][y] = noise.perlin3(1, (x+1) * m1, (y+1) * m1) * Math.sin( t/10000 + (x) * (y));
			valueStore.led[x][y] = 0.2 + valueStore.pos[x][y];
			//valueStore.led[x][y] = 0.1 + Math.abs( noise.perlin3(1, y * m1, x * m1) * Math.sin( t/10000 + x * y) );	

		}

	}
	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}