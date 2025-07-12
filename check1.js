import http from 'k6/http'; //importar el modulo http de k6 
import { check, sleep } from 'k6'; //agregar la libreria check de k6 para verificar respuestas y las que se requieran 

export const options = { //opciones de la prueba, para mejorar la ejecucion y el rendimiento 
    stages: [
        { duration: '10s', target: 10 }, // subir a 10 usuarios durante 10 segundos
        { duration: '5s', target: 2 }, // mantener 2 usuarios durante 5 segundos
    ],
};

export default function () { //todas las pruebas de k6 deben estar dentro de una funcion por defecto 
    const rta = http.get('https://test.k6.io'); //asignar la respuesta de la peticion get a la variable rta 
    check(rta, { 'la pagina se carga': (r) => r.status === 200 }); // verificar la respuesta de la peticion, rta es la respuesta de la peticion 
    //validando texto en pagina 
    check(rta, { 'validando texto': (r) => r.body.includes('Welcome to the K6 demo site!') }); // verificar que el cuerpo de la respuesta contenga el texto especificado 
    //validar imagenes en pagina 
    check(rta, { 'validando imagen': (r) => r.body.includes('<img src="/assets/images/k6-logo.svg" alt="k6 logo">') }); // verificar que el cuerpo de la respuesta contenga la imagen especificada
    //tamaño de la imagen 
    check(rta, { 'tamaño de la imagen': (r) => r.body.length < 100000 }); // verificar que el tamaño del cuerpo de la respuesta sea menor a 100000 bytes
    //el  tamaño de la imagen varia segun el contenido de la pagina, el tamaño de la imagen se obtiene desde el inspector del navegador 
    sleep(1);
}