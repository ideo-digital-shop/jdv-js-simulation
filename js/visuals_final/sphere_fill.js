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

		var timeMultiplier = 2000;

		if(!bulb_init){
			populateStaticArray(w,h,static_arr);
			bulb_init = true;
			for(var x = 0; x < w; x++){
				for(var y = 0; y < h; y++){
					random_arr[x][y] = Math.random();
				}
			}

		}


		for(var x = 0; x < w; x++){
			for(var y = 0; y < h; y++){
				valueStore.pos[x][y] = (1+noise.perlin3(1, random_arr[x][y], random_arr[y][x]))/2 * (1+Math.sin( random_arr[x][y] * t/10000 ))/2;
			}
		}

		var sinValue = (1+Math.sin(t/timeMultiplier))/4;

		for(var x=0; x<5; x++){
			for(var y=0; y<5; y++){

				var sphereVolume = Math.sqrt(Math.pow(sinValue,2) - Math.pow((x/8)-sinValue,2) - Math.pow((y/8)-sinValue,2));
				var dist = Math.sqrt(Math.pow((x-4.5)/9,2) + Math.pow((y-4.5)/9,2) + Math.pow((valueStore.pos[x][y]),2));
				if (dist>sinValue){
					valueStore.led[x][y] = 1;
				}
				else{
					valueStore.led[x][y] = 0;
				}

				valueStore.led[(w-1)-x][y] = valueStore.led[x][y];
				valueStore.led[x][(h-1)-y] = valueStore.led[x][y];
				valueStore.led[(w-1)-x][(h-1)-y] = valueStore.led[x][y];



			}
		}



	}

	function map(x, a, b, c, d){
		return (x-a)/(b-a) * (d-c) + c;
	}

	function cot(aValue)
	{
		return 1/Math.tan(aValue);
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
