//vamos a trabajar con k6 

import http from 'k6/http'; //importar el modulo http de k6 
import { sleep } from 'k6'; //libreria de k6 para hacer pausas 

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    http.get('https://test.k6.io'); //realizar una peticion get a la url indicada
    console.log('Hola, mundo!'); //imprimir un mensaje en la consola 
    sleep(1);
}

//para ejecutar este script, usar el comando: k6 run hola_mundo.js
//para ver el resultado de la prueba, usar el comando: k6 run --summary-export=summary.json hola_mundo.js
//para ver el resultado en tiempo real, usar el comando: k6 run --http-debug=full hola_mundo.js
//para ver el resultado en tiempo real y exportar el resumen, usar el comando: k6 run --http-debug=full --summary-export=summary.json hola_mundo.js