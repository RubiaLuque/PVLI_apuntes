/*

VIDEOJUEGOS EN LA RED

--> <canvas>: elemento añadido a HTML5 que permite dibujar graficos. Es donde estará el juego embebido.
--> webaudio: control sobre reproducción y formato. Se puede programar un sintetizador propio
--> Input: pantallas tactiles, gamepads, etc

Javascript se puede usar en cualquier navegador y tiene una buena API.

Se pueden distribuir los juegos webs para que parezca que son nativos gracias a los wrappers.

Los juegos web, al estar en el codigo de la propia página web, se puede obtener el código fácilmente. Se puede OFUSCAR para hacerlo 
ilegible. (nosotros no tenemos que hacer esto)

No se sabe si el acceso al juego será con PC, movil, etc. y debe adaptarse.

En nuestro caso nuestro código es abierto porque se ejecuta en el cliente y no en el servidor.

Probar el juego en local: localhost:8080 en el navegador. Se inicializa como npx http-server en la consola de git.

----------------------------------------------------------------------------------------------------------------------------------------

TIPOS DE LENGUAJES

Lenguajes interpretados: no tienen compilador, sino intérprete y no se ejecuta sobre el procesador sino sobre el propio intérprete
linea a linea. 

Lenguajes dinámicos: javascript también es un lenguaje dinámico. Estos son capaces de hacer en tiempo de ejecución lo que otros en 
compilacion. Puede evaluar el propio codigo generado dinamicamente con la funcion 'eval'. Contiene objetos dinamicos, que cambian sus 
propiedades con el tiempo.
*/

//Ejemplo objeto dinamico: se pueden cambiar sus valores o propiedades en cualquier momento
const obj = {};
obj.a = 5;
console.log(obj);

/*
TIPADO DINAMICO Y ESTATICO

El tipado dinamico es que las variables pueden cambiar de tipo con el tiempo. Por ejemplo, si hacemos
> 1 +"1"
'11'

Se obtiene un 11 en un formato de string al sumar un 1 int y un 1 string. Tambien se puede hacer:
*/

function resta(x,y) {return x-y;}
resta(4,"Juan"); //No da error, sino NaN (not a number)

//Tampoco da error lo siguiente
resta(4,3,2,1); //Se obtiene 1 porque coge los dos primeros parametros e ignora el resto

//A su vez tampoco da error
resta(4); //Se obtiene NaN

resta(4, null); //Se obtiene 4 porque null lo interpreta como 0.

/*
POSIBLES SALIDAS DE JAVASCRIPT

NaN: not a number
Undefined: algo no existe. Es un tipo en sí.
null: sí existe pero no tiene valor
*/
