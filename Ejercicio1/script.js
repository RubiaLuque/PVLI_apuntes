function devuelveTextoDeAlerta() {
  return "Alerta";
}

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
  let elems = document.getElementsByClass(nombre);
  for(let i = 0; i < elems.length; ++i){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    elems[i].color = "#" + randomColor;
    elems[i].color.innerHTML = "#" + randomColor;
  }
}
