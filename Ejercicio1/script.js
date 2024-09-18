/*
function devuelveTextoDeAlerta() {
  return "Alerta";
}
*/

function desaparece(nombre) {
	let elems = document.getElementsByName(nombre);
  for(let i = 0; i < elems.length; ++i){
    if(elems[i].style.visibility==='hidden'){
      elems[i].style.visibility ='visible';
    }
    else elems[i].style.visibility ='hidden';
  }
}

function colores(nombre){
  var elems = document.getElementsByClassName(nombre);
  for(let i = 0; i<elems.length; i++){
    console.log(elems[i])
    elems[i].style.color = randomColor();
  }
}


function randomColor() {
  let letras = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}
