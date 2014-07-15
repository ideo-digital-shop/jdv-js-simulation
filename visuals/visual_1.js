(function(module){

	static_arr = new Array(10);
	static_arr_2 = new Array(10);
	random_arr = new Array(10);

	for(var a = 0; a < 10; a++){
		static_arr[a] = new Array(10);
		static_arr_2[a] = new Array(10);
		random_arr[a] = new Array(10);
	}

	bulb_init = false;

	function setPosAndLED(valueStore){

		var w = valueStore.w;
		var h = valueStore.h;
		var t = valueStore.t;

		var m1 = 0.01;
		var m2 = 0.03;
		var m3 = 0.01;

		var timeMultiplier = 500000;

		if(!bulb_init){
			populateStaticArray(w,h,static_arr);
			bulb_init = true;
			for(var x = 0; x < w; x++){
				for(var y = 0; y < h; y++){
					random_arr[x][y] = Math.random();
				}
			}

		}



		for(var x=0; x<5; x++){
			for(var y=0; y<5; y++){

			valueStore.pos[x][y] = (1+Math.sin( random_arr[x][y] * t/timeMultiplier ))/2 * ( 1 + (x/4)*Math.sin((( y + 1 ) * h) * t/timeMultiplier))/ 2;

			//reflect horizontally
			valueStore.pos[(w-1)-x][y] = valueStore.pos[x][y];
			valueStore.pos[x][(h-1)-y] = valueStore.pos[x][y];
			valueStore.pos[(w-1)-x][(h-1)-y] = valueStore.pos[x][y];

			valueStore.led[x][y] = static_arr[x][y]*(1+Math.sin(static_arr_2[x][y]*t/timeMultiplier)/2);
			valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
			valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
			valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];


		}
	}

	}

	function map(x, a, b, c, d){
		return (x-a)/(b-a) * (d-c) + c;
	}

	//set bulb ultimate brightness and bulb period
	function populateStaticArray(w,h,static_arr){
		for (var i=0;i<w;i++){
			for(var j=0;j<h;j++){
				static_arr[i][j] = (1+noise.perlin3(0.2,Math.random(),Math.random()))/2;
				static_arr_2[i][j] = (1+noise.perlin3(0.2,Math.random(),Math.random()))/2;
			}
		}

	}

	function getRandomInt (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	if(module){
		module.exports.setPosAndLED = setPosAndLED;
	}

})(module);