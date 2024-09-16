function devuelveTextoDeAlerta() {
  return "Alerta";
}

function desaparece(nombre) {
	let buttons = document.querySelectorAll(nombre);
  for(let i = 0; i < buttons.length; ++i){
    if(buttons[i].style.visibility=='visible'){
      button[i].style.visibility='hidden';
    }
    else button[i].style.visibility='visible';
  }
}
