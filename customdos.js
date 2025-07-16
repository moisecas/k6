import http from 'k6/http';                  // importar el modulo http de k6
import { check, sleep } from 'k6';            // importar la libreria check y sleep de k6
import { Trend } from 'k6/metrics';           // importar la clase Trend del paquete metrics

export const options = {                       // opciones de la prueba, para mejorar la ejecucion y el rendimiento
    stages: [
        { duration: '10s', target: 10 },      // subir a 10 usuarios durante 10 segundos
        { duration: '5s',  target: 2  },      // mantener 2 usuarios durante 5 segundos
    ],
};

//una tendecia por estado
const te = new Trend('tiempo_espera');    // crear una nueva tendencia
const bloqueado = new Trend('tiempo_bloqueado'); // crear una tendencia para el tiempo bloqueado
const conectar = new Trend('tiempo_conexion'); // crear una tendencia para el tiempo de conexion
const tls = new Trend('tiempo_TLS');         // crear una tendencia para el tiempo TLS
const esperar = new Trend('tiempo_espera'); // crear una tendencia para el tiempo de espera
const recibir = new Trend('tiempo_recepcion'); // crear una tendencia para el tiempo
const duracion = new Trend('duracion_solicitud'); // crear una tendencia para la duracion de la solicitud

export default function () {                   // todas las pruebas de k6 deben estar dentro de una funcion por defecto
    const rta = http.get('https://test.k6.io');       // asignar la respuesta de la peticion get a la variable rta
    check(rta, { 'la pagina se carga': (r) => r.status === 200 }); // verificar la respuesta de la peticion
    console.log('Respuesta recibida con estado:', rta.status); // imprimir el estado de la respuesta en la consola
    //usa los trends para medir los tiempos de la solicitud
    te.add(rta.timings.waiting); // agregar el tiempo de espera a la tendencia
    bloqueado.add(rta.timings.blocked); // agregar el tiempo bloqueado a la tendencia
    conectar.add(rta.timings.connect); // agregar el tiempo de conexion a la tendencia
    tls.add(rta.timings.tls); // agregar el tiempo TLS a la tendencia
    esperar.add(rta.timings.waiting); // agregar el tiempo de espera a la tendencia
    recibir.add(rta.timings.receiving); // agregar el tiempo de recepcion a la tendencia
    duracion.add(rta.timings.duration); // agregar la duracion de la solicitud a la tendencia
    console.log('tiempo de espera:', te.name); // imprimir el nombre de la tendencia en la consola
    console.log('tiempo bloqueado:', bloqueado.name); // imprimir el nombre de la tendencia en la consola
    console.log('tiempo de conexion:', conectar.name); // imprimir el nombre de la tendencia en la consola
    console.log('tiempo TLS:', tls.name); // imprimir el nombre de la tendencia en la consola
    console.log('tiempo de espera:', esperar.name); // imprimir el nombre de la tendencia en la consola
    console.log('tiempo de recepcion:', recibir.name); // imprimir el nombre de la tendencia en la consola
    console.log('duracion de la solicitud:', duracion.name); // imprimir el nombre de la tendencia en la consola
}