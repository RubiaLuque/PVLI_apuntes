function devuelveTextoDeAlerta() {
  return "Alerta";
}

function desaparece(nombre) {
	var button = document.getElementsByName(nombre);
  for(let i = 0; i < button.length; ++i){
    if(button.style.visibility=='visible'){
      button.style.visibility='hidden';
    }
    else button.style.visibility='visible';
  }
}
