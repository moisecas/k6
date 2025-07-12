import http from 'k6/http'; //importar el modulo http de k6 
import { check, sleep } from 'k6'; //agregar la libreria check de k6 para verificar respuestas y las que se requieran 

export const options = { //opciones de la prueba, para mejorar la ejecucion y el rendimiento 
    stages: [
        { duration: '20s', target: 10 }, // subir a 10 usuarios durante 20 segundos
        { duration: '10s', target: 2 }, // mantener 2 usuarios durante 10 segundos
    ],
};

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    const rta = http.get('https://test.k6.io'); //asignar la respuesta de la peticion get a la variable rta 
    check(rta, { 'la pagina se carga': (r) => r.status === 200 }); // verificar la respuesta de la peticion, rta es la respuesta de la peticion 
    sleep(1);
}