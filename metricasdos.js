// script de k6 para medir el rendimiento de una pagina web con diferentes metricas
import http from 'k6/http'; // importar el modulo http de k6
import { check, sleep } from 'k6'; // importar la libreria check de k6 para verificar respuestas y las que se requieran

export const options = { // opciones de la prueba, para mejorar la ejecucion y el rendimiento
    stages: [
        { duration: '10s', target: 10 }, // subir a 10 usuarios durante 10 segundos
        { duration: '5s',  target: 2  }, // mantener 2 usuarios durante 5 segundos
    ],
};

export default function () { // todas las pruebas de k6 deben estar dentro de una funcion por defecto
    const rta = http.get('https://test.k6.io'); // asignar la respuesta de la peticion get a la variable rta

    // verificar status y contenido
    check(rta, { 'la pagina se carga': (r) => r.status === 200 });
    console.log('Respuesta recibida con estado:', rta.status); // imprimir el estado de la respuesta en la consola

    // validando texto en pagina
    check(rta, { 'el texto esperado esta presente': (r) => r.body.includes('K6') });
    console.log('Texto validado en la respuesta'); // imprimir mensaje de validacion de texto en la consola

    // validando imagenes en pagina
    check(rta, { 'imagen de k6 esta presente': (r) =>
        r.body.includes('<img src="/assets/images/k6-logo.svg" alt="k6 logo">')
    });
    console.log('Imagen validada en la respuesta'); // imprimir mensaje de validacion de imagen en la consola

    // tamaño de la imagen
    check(rta, { 'tamaño de la imagen es correcto': (r) =>
        r.body.includes('width="100"') && r.body.includes('height="100"')
    });
    console.log('Tamaño de la imagen validado'); // imprimir mensaje de validacion de tamaño de imagen en la consola

    // validar tamaño de body
    check(rta, { 'cuerpo de la respuesta es correcto': (r) => r.body.length < 100000 });
    console.log('Cuerpo de la respuesta validado'); 
    console.log('Tamaño del cuerpo de la respuesta:', rta.body.length); 
    console.log('Método de la solicitud:', rta.request.method); 

    // métricas de timings
    console.log('HTTP blocked:', rta.timings.blocked);
    console.log('HTTP connect:', rta.timings.connect);
    console.log('HTTP TLS:', rta.timings.tls_handshake);
    console.log('HTTP wait:', rta.timings.waiting);
    console.log('HTTP receive:', rta.timings.receiving);
    console.log('HTTP duration:', rta.timings.duration);

    // respuesta completa (solo para debug avanzado)
    // console.log('HTTP response:', String(rta.response));

    // imprimir encabezados de la respuesta como JSON legible
    console.log(
        'Encabezados de la respuesta:\n',
        JSON.stringify(rta.headers, null, 2)
    );

    sleep(1); // hacer una pausa de 1 segundo entre peticiones
}
// para ejecutar este script, usar el comando: k6 run metricas.js 