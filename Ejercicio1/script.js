function devuelveTextoDeAlerta() {
  return "Alerta";
}

function desaparece(nombre) {
	let buttons = document.getElementsByName(nombre);
  for(let i = 0; i < buttons.length; ++i){
    if(buttons[i].style.visibility==='visible'){
      buttons[i].style.visibility='hidden';
    }
    else buttons[i].style.visibility='visible';
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
