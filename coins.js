var coins=0;
var workshop=0;
//var ck_rut=/^()[0-9]{7,8})[k0-9]$/;


function check_my_coins(){
  var id=document.getElementById("rut");
  coins = 15;
  taller = document.getElementById("workshop");
  var workshop = taller.options[taller.selectedIndex].value;
//  if(!ck_rut.test(id)){
//    errors[errors.length] = "Formato de RUT incorrecto";
//  }
  if (id=""){// anotar ruts con bonus
    coins += 5;
  }
  document.getElementById("my-coins").innerHTML=coins;
}

function check_comp(){
  var c=0;
  //Alumnos taller de computación
  var c01 = document.getElementById('c01').getvalue();
  c+= c01.options[c01.selectedIndex].value;
  var c02 = document.getElementById('c02').getvalue();
  c+= c02.options[c02.selectedIndex].value;
  var c03 = document.getElementById('c03').getvalue();
  c+= c03.options[c03.selectedIndex].value;
  var c04 = document.getElementById('c04').getvalue();
  c+= c04.options[c04.selectedIndex].value;
  var c05 = document.getElementById('c05').getvalue();
  c+= c05.options[c05.selectedIndex].value;
  var c06 = document.getElementById('c06').getvalue();
  c+= c06.options[c06.selectedIndex].value;
  var c07 = document.getElementById('c07').getvalue();
  c+= c07.options[c07.selectedIndex].value;
  var c08 = document.getElementById('c08').getvalue();
  c+= c08.options[c08.selectedIndex].value;
  var c09 = document.getElementById('c09').getvalue();
  c+= c09.options[c09.selectedIndex].value;
  var c10 = document.getElementById('c10').getvalue();
  c+= c10.options[c10.selectedIndex].value;
  var c11 = document.getElementById('c11').getvalue();
  c+= c11.options[c11.selectedIndex].value;
  var c12 = document.getElementById('c12').getvalue();
  c+= c12.options[c12.selectedIndex].value;
  var c13 = document.getElementById('c13').getvalue();
  c+= c13.options[c13.selectedIndex].value;

  if ((workshop = 1) && (c != 0)){
    document.getElementById('warning-comp').style.display="block";
  }
  return c;
}

function check_dis(){
  var d=0;
  //Alumnos taller de diseño
  var d01 = document.getElementById('d01').getvalue();
  d+= d01.options[d01.selectedIndex].value;
  var d02 = document.getElementById('d02').getvalue();
  d+= d02.options[d02.selectedIndex].value;
  var d03 = document.getElementById('d03').getvalue();
  d+= d03.options[d03.selectedIndex].value;
  var d04 = document.getElementById('d04').getvalue();
  d+= d04.options[d04.selectedIndex].value;
  var d05 = document.getElementById('d05').getvalue();
  d+= d05.options[d05.selectedIndex].value;
  var d06 = document.getElementById('d06').getvalue();
  d+= d06.options[d06.selectedIndex].value;
  var d07 = document.getElementById('d07').getvalue();
  d+= d07.options[d07.selectedIndex].value;
  var d08 = document.getElementById('d08').getvalue();
  d+= d08.options[d08.selectedIndex].value;
  var d09 = document.getElementById('d09').getvalue();
  d+= d09.options[d09.selectedIndex].value;
  var d10 = document.getElementById('d10').getvalue();
  d+= d10.options[d10.selectedIndex].value;
  var d11 = document.getElementById('d11').getvalue();
  d+= d11.options[d11.selectedIndex].value;
  var d12 = document.getElementById('d12').getvalue();
  d+= d12.options[d12.selectedIndex].value;
  var d13 = document.getElementById('d13').getvalue();
  d+= d13.options[d13.selectedIndex].value;
  var d14 = document.getElementById('d14').getvalue();
  d+= d14.options[d14.selectedIndex].value;
  var d15 = document.getElementById('d15').getvalue();
  d+= d15.options[d15.selectedIndex].value;

  if ((workshop = 2) && (d != 0)){
    document.getElementById('warning-dis').style.display="block";
  }
  return d;
}

function check_model(){
  var m=0;
  //Alumnos taller de modelo digital
  var m01 = document.getElementById('m01').getvalue();
  m+= m01.options[m01.selectedIndex].value;
  var m02 = document.getElementById('m02').getvalue();
  m+= m02.options[m02.selectedIndex].value;
  var m03 = document.getElementById('m03').getvalue();
  m+= m03.options[m03.selectedIndex].value;
  var m04 = document.getElementById('m04').getvalue();
  m+= m04.options[m04.selectedIndex].value;
  var m05 = document.getElementById('m05').getvalue();
  m+= m05.options[m05.selectedIndex].value;
  var m06 = document.getElementById('m06').getvalue();
  m+= m06.options[m06.selectedIndex].value;
  var m07 = document.getElementById('m07').getvalue();
  m+= m07.options[m07.selectedIndex].value;
  var m08 = document.getElementById('m08').getvalue();
  m+= m08.options[m08.selectedIndex].value;
  var m09 = document.getElementById('m09').getvalue();
  m+= m09.options[m09.selectedIndex].value;
  var m10 = document.getElementById('m10').getvalue();
  m+= m10.options[m10.selectedIndex].value;
  var m11 = document.getElementById('m11').getvalue();
  m+= m11.options[m11.selectedIndex].value;
  var m12 = document.getElementById('m12').getvalue();
  m+= m12.options[m12.selectedIndex].value;
  var m13 = document.getElementById('m13').getvalue();
  m+= m13.options[m13.selectedIndex].value;

  if ((workshop = 3) && (m != 0)){
    document.getElementById('warning-model').style.display="block";
  }
  return m;
}

function check_sale(){
  var cnt=0;
  //tomar valores de los campos
  cnt= check_comp() + check_dis() + check_model();
  var rst= coins - cnt;
  document.getElementByName('resto').innerHTML=rst;
  if(rst < 0 ){
    document.getElementById('final-error').style.display="block";
  } else {
    //mostrar el resto
    document.getElementById('final-bueno').style.display="block";
  }
}