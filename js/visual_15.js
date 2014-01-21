function setPosAndLED(valueStore){

	var w = valueStore.w;
	var h = valueStore.h;
	var t = valueStore.t;
	var remote_init = valueStore.remote_init;
	var static_arr = valueStore.static_arr;

	var m1 = 0.01;
	var m2 = 0.01;
	var m3 = 0.01;

	var timeMultiplier = 5000;	

	var threshold = {
		low: 0.2,
		high: 0.6,
		diff: 0
	};

	if(!remote_init){
		populateStaticArray(w,h,static_arr);
		remote_init = true;
		valueStore.remote_init = remote_init;
	}

	threshold.diff = threshold.high - threshold.low;

	m1 = 0.05;

	var reflect = false;

	if(reflect){

		for(var x=0; x<5; x++){
			for(var y=0; y<5; y++){

				valueStore.pos[x][y] = (1 + noise.perlin3(1, (x+1) * m1, (y+1) * m1))/2 * (1+Math.sin( t/(static_arr[x][y]*10000) + (x)))/2;
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
				
				valueStore.pos[x][y] = (1 + noise.perlin3(1, static_arr[x][y], (y+1) * m1))/2 * (1+Math.sin(t/(static_arr[x][y]*25000) )/2);
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

function populateStaticArray(w,h,static_arr){

	for (var i=0;i<w;i++){
		for(var j=0;j<h;j++){

			static_arr[i][j] = (1+noise.perlin3(0.2,Math.random(),Math.random()))/2;
			console.log(static_arr[i][j]);

		}
	}

}

if(module){

	module.exports.setPosAndLED = setPosAndLED;

}