function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	
	var m1 = 0.01;
	var m2 = 0.01;
	var m3 = 0.01;
	
	var timeMultiplier = 5000;
		

	var threshold = {
		low: 0.2,
		high: 0.6,
		diff: 0
	};

	threshold.diff = threshold.high - threshold.low;

	m1 = 0.05;

	var reflect = false;

	if(reflect){

		for(var x=0; x<5; x++){
			for(var y=0; y<5; y++){


			valueStore.pos[x][y] = (1 + noise.perlin3(1, (x+1) * m1, (y+1) * m1) * Math.sin( t/10000 + (x) * (y)))/2;
			valueStore.pos[(w-1)-x][y] = valueStore.pos[x][y];
			valueStore.pos[x][(h-1)-y] = valueStore.pos[x][y];
			valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];

			valueStore.led[x][y] = 0.2;

			valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
			valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
			valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];

			if (valueStore.pos[x][y] >= threshold.low && valueStore.pos[x][y] <= threshold.high){

				var n_a = Math.abs(valueStore.pos[x][y] - threshold.low);
				var n_b = map(n_a, 0, threshold.diff, 0, 1.0);
				
				if (n_b <= 0.5){
					valueStore.led[x][y] += (n_b/0.5);
				}

				else {
					valueStore.led[x][y] += map(n_b,0.5,1.0,1.0,0.0);
				}

				valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
				valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
				valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];
			}

		}
	}


	}

	else{

		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){
				
				valueStore.pos[x][y] = (1 + noise.simplex2(x,y))/2 * (1+Math.sin((y/h)*t/10000 + ((x/w)*(y/h)) ))/2
				valueStore.led[x][y] = 0.2;

				if (valueStore.pos[x][y] >= threshold.low && valueStore.pos[x][y] <= threshold.high){

					var n_a = Math.abs(valueStore.pos[x][y] - threshold.low);
					var n_b = map(n_a, 0, threshold.diff, 0, 1.0);
					
					if (n_b <= 0.5){
						valueStore.led[x][y] += (n_b/0.5);
					}

					else {
						valueStore.led[x][y] += map(n_b,0.5,1.0,1.0,0.0);
					}

				}
			}
		}
	
	}

}

function map(x, a, b, c, d){
	return (x-a)/(b-a) * (d-c) + c;
}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}