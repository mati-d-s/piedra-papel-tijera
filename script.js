// Obtener los puntajes almacenados en Local Storage
let puntajeUsuario = parseInt(localStorage.getItem('puntajeUsuario')) || 0;
let puntajeComputadora = parseInt(localStorage.getItem('puntajeComputadora')) || 0;

// Función para obtener la elección de la computadora
function obtenerEleccionComputadora() {
    const opciones = ['piedra', 'papel', 'tijera'];
    const indiceAleatorio = Math.floor(Math.random() * 3);
    return opciones[indiceAleatorio];
}

// Función para determinar el ganador
function determinarGanador(eleccionUsuario, eleccionComputadora) {
    if (eleccionUsuario === eleccionComputadora) {
        return 'Empate';
    }
    if (
        (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijera') ||
        (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionUsuario === 'tijera' && eleccionComputadora === 'papel')
    ) {
        return 'Usuario';
    }
    return 'Computadora';
}

// Función para actualizar la interfaz de usuario con el resultado
function actualizarResultado(resultado, eleccionComputadora) {
    document.getElementById('resultado').textContent = `${resultado}! La computadora eligió ${eleccionComputadora}.`;

    const resultadoExtra = document.getElementById('resultadoExtra');
    if (resultado === 'Usuario') {
        resultadoExtra.textContent = "¡Ganaste! 🎉";
        resultadoExtra.classList.remove('lose', 'draw');
        resultadoExtra.classList.add('win');
    } else if (resultado === 'Computadora') {
        resultadoExtra.textContent = "Perdiste... 😞";
        resultadoExtra.classList.remove('win', 'draw');
        resultadoExtra.classList.add('lose');
    } else {
        resultadoExtra.textContent = "Empate... 🤔";
        resultadoExtra.classList.remove('win', 'lose');
        resultadoExtra.classList.add('draw');
    }
}

// Función para manejar el clic del usuario
function manejarEleccion(eleccionUsuario) {
    const eleccionComputadora = obtenerEleccionComputadora();
    const resultado = determinarGanador(eleccionUsuario, eleccionComputadora);
    
    if (resultado === 'Usuario') {
        puntajeUsuario++;
    } else if (resultado === 'Computadora') {
        puntajeComputadora++;
    }

    // Actualizar la interfaz con los nuevos puntajes
    document.getElementById('puntajeUsuario').textContent = puntajeUsuario;
    document.getElementById('puntajeComputadora').textContent = puntajeComputadora;

    // Guardar los puntajes en Local Storage
    localStorage.setItem('puntajeUsuario', puntajeUsuario);
    localStorage.setItem('puntajeComputadora', puntajeComputadora);

    // Mostrar el resultado
    actualizarResultado(resultado, eleccionComputadora);
}

// Event listeners para los botones
document.getElementById('piedra').addEventListener('click', () => manejarEleccion('piedra'));
document.getElementById('papel').addEventListener('click', () => manejarEleccion('papel'));
document.getElementById('tijera').addEventListener('click', () => manejarEleccion('tijera'));

// Función para reiniciar el juego
document.getElementById('reiniciar').addEventListener('click', () => {
    puntajeUsuario = 0;
    puntajeComputadora = 0;

    document.getElementById('puntajeUsuario').textContent = puntajeUsuario;
    document.getElementById('puntajeComputadora').textContent = puntajeComputadora;
    document.getElementById('resultado').textContent = "Esperando...";
    document.getElementById('resultadoExtra').textContent = "";

    // Limpiar Local Storage
    localStorage.removeItem('puntajeUsuario');
    localStorage.removeItem('puntajeComputadora');
});
