import http from 'k6/http'; //importar el modulo http de k6 
import { sleep } from 'k6'; //libreria de k6 para hacer pausas 

export const options = { //opciones de la prueba, para mejorar la ejecucion y el rendimiento 
    vus: 20, //numero de usuarios virtuales
    duration: '30s', //duracion de la prueba
};

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    http.get(''); //realizar una peticion get a la url indicada
    //console.log('Hola, mundo!'); //imprimir un mensaje en la consola 
    sleep(1);
} 