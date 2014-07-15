//awesome sinusoidal wave that finds harmonics
function setPosAndLED(valueStore){

  var w = valueStore.w;
  var h = valueStore.h;
  var t = valueStore.t;
  var m1 = 0.01;
  var m2 = 0.01;
  var m3 = 0.01;

  var timeMultiplier = 5000;

  var final_val = new Array(10);

  for(var i=0;i<10;i++){
    final_val[i] = new Array(i);
  }

final_val[0][0] = 0.003921569;
final_val[0][1] = 0.99215686;
final_val[0][2] = 1.0;
final_val[0][3] = 1.0;
final_val[0][4] = 0.99607843;
final_val[0][5] = 0.99607843;
final_val[0][6] = 0.99607843;
final_val[0][7] = 1.0;
final_val[0][8] = 1.0;
final_val[0][9] = 0.0;
final_val[1][0] = 0.99607843;
final_val[1][1] = 1.0;
final_val[1][2] = 1.0;
final_val[1][3] = 0.99215686;
final_val[1][4] = 1.0;
final_val[1][5] = 1.0;
final_val[1][6] = 0.0;
final_val[1][7] = 1.0;
final_val[1][8] = 0.99607843;
final_val[1][9] = 1.0;
final_val[2][0] = 1.0;
final_val[2][1] = 1.0;
final_val[2][2] = 0.0;
final_val[2][3] = 0.0;
final_val[2][4] = 1.0;
final_val[2][5] = 0.99607843;
final_val[2][6] = 0.0;
final_val[2][7] = 0.0;
final_val[2][8] = 1.0;
final_val[2][9] = 0.99607843;
final_val[3][0] = 0.99607843;
final_val[3][1] = 1.0;
final_val[3][2] = 1.0;
final_val[3][3] = 1.0;
final_val[3][4] = 0.99607843;
final_val[3][5] = 0.99607843;
final_val[3][6] = 0.011764706;
final_val[3][7] = 0.0;
final_val[3][8] = 0.0;
final_val[3][9] = 1.0;
final_val[4][0] = 1.0;
final_val[4][1] = 0.99215686;
final_val[4][2] = 0.99607843;
final_val[4][3] = 0.99215686;
final_val[4][4] = 1.0;
final_val[4][5] = 1.0;
final_val[4][6] = 0.0;
final_val[4][7] = 0.0;
final_val[4][8] = 0.0;
final_val[4][9] = 1.0;
final_val[5][0] = 1.0;
final_val[5][1] = 1.0;
final_val[5][2] = 1.0;
final_val[5][3] = 1.0;
final_val[5][4] = 0.99215686;
final_val[5][5] = 1.0;
final_val[5][6] = 0.0;
final_val[5][7] = 0.003921569;
final_val[5][8] = 0.0;
final_val[5][9] = 1.0;
final_val[6][0] = 1.0;
final_val[6][1] = 1.0;
final_val[6][2] = 0.99607843;
final_val[6][3] = 0.99607843;
final_val[6][4] = 1.0;
final_val[6][5] = 0.99215686;
final_val[6][6] = 0.015686275;
final_val[6][7] = 0.0;
final_val[6][8] = 0.0;
final_val[6][9] = 1.0;
final_val[7][0] = 1.0;
final_val[7][1] = 1.0;
final_val[7][2] = 0.003921569;
final_val[7][3] = 0.0;
final_val[7][4] = 0.99607843;
final_val[7][5] = 1.0;
final_val[7][6] = 0.0;
final_val[7][7] = 0.003921569;
final_val[7][8] = 1.0;
final_val[7][9] = 1.0;
final_val[8][0] = 1.0;
final_val[8][1] = 0.99607843;
final_val[8][2] = 1.0;
final_val[8][3] = 1.0;
final_val[8][4] = 1.0;
final_val[8][5] = 1.0;
final_val[8][6] = 0.0;
final_val[8][7] = 1.0;
final_val[8][8] = 1.0;
final_val[8][9] = 1.0;
final_val[9][0] = 0.0;
final_val[9][1] = 1.0;
final_val[9][2] = 1.0;
final_val[9][3] = 1.0;
final_val[9][4] = 1.0;
final_val[9][5] = 1.0;
final_val[9][6] = 1.0;
final_val[9][7] = 1.0;
final_val[9][8] = 1.0;
final_val[9][9] = 0.0;

  for(var x=0; x<10; x++){
    for(var y=0; y<10; y++){
      valueStore.pos[x][y] = 0.5*final_val[x][y] * ((( 1 + Math.sin(t/timeMultiplier))/ 2));
      valueStore.led[x][y] = 0.5*final_val[x][y] * ((( 1 + Math.sin(t/timeMultiplier))/ 2));
    }
  }


}

if(module){

  module.exports.setPosAndLED = setPosAndLED;

}
