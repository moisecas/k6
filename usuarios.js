import http from 'k6/http'; //importar el modulo http de k6 
import { sleep } from 'k6'; //libreria de k6 para hacer pausas 

export const options = { //opciones de la prueba, para mejorar la ejecucion y el rendimiento 
    vus: 20, //numero de usuarios virtuales
    duration: '30s', //duracion de la prueba
};

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    http.get('https://test.k6.io'); //realizar una peticion get a la url indicada
    sleep(1);
}

//para ejecutar este script, usar el comando: k6 run usuarios.js no es necesario el --vus ni el --duration porque ya estan definidos en las opciones
