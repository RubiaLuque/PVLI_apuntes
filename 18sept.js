/** JAVASCRIPT
 * -----------------------------------------------------------------------------------------------------------
 * En los proyectos mejor usar let y no var, para que no ocurra que muestre undefined si hacemos var.
 * var --> variables globales, deja una variable como undefined hasta que se defina
 * let --> variables locales
 * 
 * 
 * CONDICIONALES
 */
let a = 10;
if(true){
    let a = 5;
}
console.log(a); //Muestra 10, no 5 porque let es local. CUIDADO CON LOS ÁMBITOS

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * COMPARACIONES CON == Y ===
 * 
 * Tipos de variables primitivos:
 * - string
 * - int
 * - double
 * - booleanos
 * - NO HAY floats
 * 
 * El comparador === hace una comparacion de tipos. El comparador == es mas laxo.
 * 
 * Ademas se pueden tener objetos como {} con propiedades.
 */
let ab = {}; //Objeto
ab.x = 5;
ab.y = 5; //No importa que no haya ; ni que la asignacion se haga en una linea distinta
ab.hola = 1;
console.log(ab["hola"]); //Tambien se puede poner entre corchetes el nombre de la propiedad. Hay que poner las comillas sí o sí
console.log(ab.hola); //Es lo mismo que lo anterior

//Tambien se puede hacer:

ab["hola gente"] = 1;
let nombre = "hola gente";
console.log(a[nombre]); //Funciona y muestra 1

let abc = {sword: {edge:1000000, handle: 1}, y: 1};
console.log(a.sword.edge); //Muestra 1000000

//--------------------------------------------------------------------------
//ARRAYS
//No hace falta que los arrays tengan los mismos tipos en sus miembros

const c = [];
const b = [1, "hola", 3]
console.log(c[0]); // undefined
console.log(b[0]); // 1

//Los arrays se pueden extender y su tamaño cambiar
c[1000] = 1; //Todos los elementos anteriores se crean un son undefined

//Tambien se pueden tener indices negativos (???)

//Ademas, se pueden indexar nuevas variables:
c.prop = "hola"; // se veria [1, "hola", 3, prop: "hola"]
//Si se hace:
console.log(C.prop); //Se muestra "hola"

//Se pueden comprobar los tipos de las cosas con typeof. Los arrays los define como object
console.log(typeof c); // object
const ac = {} //object
const bc = 1; //number
const c = true; //boolean
const d = 1.0; // number
const e = [1,2,3]; //object
const f = null; //object --> POR CONVENIO Y DEFINICION
const g = undefined; // undefined



//------------------------------------------------------------------------------------------------------------------
//FUNCIONES

const fb = function(){console.log("function")}; //Las funciones son objetos

function fun(){
    console.log("function2");
}

console.log(f); // Muestra Function fb
console.log(fun); // Muestra Function fun

console.log(f()); //Muestra "function" y undefined, que es lo que devuelve la funcion
console.log(fun()); //Muestra "function2" y undefined, que tambien es como si devolviese eso

let o = { //Los objetos tambien tienen funciones
    saludar: function(){console.log("hola")}
}

let ax = {}

o.saludar(); //Muestra "hola"
ax.saludar = o.saludar(); //Se ejecuta la funcion y devuelve undefinded, salta error
ax.saludar = o.saludar; //Aqui si se ejecuta la funcion de o
ax.saludar(); //Ejecuta la funcion
ax.saludar; //Devuelve la funcion y sale el nombre de la funcion


//-------------------------------------------------------------------------------------------------------------
//PALABRA RESERVADA THIS
let ob={
    x: 5,
    y: 10,
    saludar: function(){
        console.log(this); //Devuelve el objeto, es como escribirlo en consola
    }
}


