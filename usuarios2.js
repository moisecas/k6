import http from 'k6/http'; //importar el modulo http de k6 
import { sleep } from 'k6'; //libreria de k6 para hacer pausas 

export const options = { //opciones de la prueba, para mejorar la ejecucion y el rendimiento 
    stages: [
        { duration: '30s', target: 20 }, // subir a 20 usuarios durante 30 segundos
        { duration: '1m30s', target: 20 }, // mantener 20 usuarios durante 1 minuto y 30 segundos
        { duration: '30s', target: 0 }, // bajar a 0 usuarios durante 30 segundos
    ],
};

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    http.get('https://test.k6.io'); //realizar una peticion get a la url indicada
    sleep(1);
}