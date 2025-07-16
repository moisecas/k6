// uso de trend 

import http from 'k6/http';                  // importar el modulo http de k6
import { check, sleep } from 'k6';            // importar la libreria check y sleep de k6
import { Trend } from 'k6/metrics';           // importar la clase Trend del paquete metrics

const myCustomTrend = new Trend('my_custom_trend');    // crear una nueva tendencia

export const options = {                       // opciones de la prueba, para mejorar la ejecucion y el rendimiento
    stages: [
        { duration: '10s', target: 10 },      // subir a 10 usuarios durante 10 segundos
        { duration: '5s',  target: 2  },      // mantener 2 usuarios durante 5 segundos
    ],
};

export default function () {                   // todas las pruebas de k6 deben estar dentro de una funcion por defecto
    const rta = http.get('https://test.k6.io');       // asignar la respuesta de la peticion get a la variable rta

    check(rta, { 'la pagina se carga': (r) => r.status === 200 }); // verificar la respuesta de la peticion

    console.log('Nombre de la tendencia:', myCustomTrend.name);    // imprimir el nombre de la tendencia en la consola

    // validando texto en pagina
    check(rta, { 'el texto esperado esta presente': (r) => r.body.includes('K6') });

    // usa trend para medir la duracion de la solicitud
    myCustomTrend.add(rta.timings.duration);   // agregar la duracion de la solicitud a la tendencia

    console.log('Texto validado en la respuesta'); // imprimir mensaje de validacion de texto en la consola

    // validando imagenes en pagina
    check(rta, { 'imagen de k6 esta presente': (r) => r.body.includes('k6.png') });
    console.log('Imagen validada en la respuesta'); // imprimir mensaje de validacion de imagen en la consola

    // tamaño de la imagen
    check(rta, { 'tamaño de la imagen es correcto': (r) =>
        r.body.includes('width="100"') && r.body.includes('height="100"')
    });
    console.log('Tamaño de la imagen validado'); // imprimir mensaje de validacion de tamaño de imagen en la consola

    sleep(1); // hacer una pausa de 1 segundo entre peticiones
}
