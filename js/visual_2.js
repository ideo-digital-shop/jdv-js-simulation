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
			var mult = 1;
			if ( x % 2 == true ) {
				mult = -1; 
			}
			
			valueStore.pos[x][y] = (1+Math.sin( ((y+1)/h)*mult*t/10000  + (x/w)))/2;
			valueStore.led[x][y] = valueStore.pos[x][y];


		}

	}
	
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}