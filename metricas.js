
//script de k6 para medir el rendimiento de una pagina web con diferentes metricas
import http from 'k6/http'; // importar el modulo http de k6
import { check, sleep } from 'k6'; // importar la libreria check de k6 para verificar respuestas y las que se requieran

export const options = { // opciones de la prueba, para mejorar la ejecucion y el rendimiento
    stages: [
        { duration: '10s', target: 10 }, // subir a 10 usuarios durante 10 segundos
        { duration: '5s', target: 2 }, // mantener 2 usuarios durante 5 segundos
    ],
};

export default function () { // todas las pruebas de k6 deben estar dentro de una funcion por defecto
    const rta = http.get('https://test.k6.io'); // asignar la respuesta de la peticion get a la variable rta
    check(rta, { 'la pagina se carga': (r) => r.status ===  200 }); // verificar la respuesta de la peticion, rta es la respuesta de la peticion
    console.log('Respuesta recibida con estado:', rta.status); // imprimir el estado de la respuesta en la consola
    // validando texto en pagina
    check(rta, { 'el texto esperado esta presente': (r) => r.body.includes('K6') }); // verificar que el texto 'K6' este presente en el cuerpo de la respuesta      
    console.log('Texto validado en la respuesta'); // imprimir mensaje de validacion de texto en la consola
    // validando imagenes en pagina
    check(rta, { 'imagen de k6 esta presente': (r) => r.body.includes('<img src="/assets/images/k6-logo.svg" alt="k6 logo">') }); // verificar que el cuerpo de la respuesta contenga la imagen especificada
    console.log('Imagen validada en la respuesta'); // imprimir mensaje de validacion de imagen en la consola
    // tamaño de la imagen
    check(rta, { 'tamaño de la imagen es correcto': (r) => r.body.includes('width="100"') && r.body.includes('height="100"') }); // verificar que la imagen tenga el tamaño correcto    
    console.log('Tamaño de la imagen validado'); // imprimir mensaje de validacion de tamaño de imagen en la consola
    // el tamaño de la imagen varia segun el contenido de la pagina, el tamaño de la imagen se obtiene desde el inspector del navegador

    //cuerpo del body en rta 
    check(rta, { 'cuerpo de la respuesta es correcto': (r) => r.body.length < 100000 }); // verificar que el tamaño del cuerpo de la respuesta sea menor a 100000 bytes
    console.log('Cuerpo de la respuesta validado' + String(rta.body)); // imprimir mensaje de validacion del cuerpo de la respuesta en la consola 
    console.log('Tamaño del cuerpo de la respuesta:', String(rta.request.url)); // imprimir el tamaño del cuerpo de la respuesta en la consola
    console.log('Tamaño del cuerpo de la respuesta:', String(rta.request.method)); // imprimir los metodos de la respuesta en la consola 
    sleep(1); // hacer una pausa de 1 segundo entre peticiones
}