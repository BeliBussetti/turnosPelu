document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const fecha = params.get('fecha');

    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'short' };
    const fechaCompleta = new Date(`${new Date().getFullYear()} ${fecha}`);
    const dia = capitalizarPrimeraLetra(fechaCompleta.toLocaleDateString('es-ES', opcionesFecha));

    document.getElementById('titulo').textContent = dia;

    const diaSemana = fechaCompleta.toLocaleDateString('es-ES', { weekday: 'long' });

    // Generar turnos
    const turnos = generarTurnosDisponibles(diaSemana);
    const listaTurnos = document.getElementById('lista-turnos');

    turnos.forEach(turno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="hora-turno">${turno}</span>
            <button class="btn-reservar" onclick="reservarTurno('${fecha}', '${turno}')">Reservar</button>
        `;
        listaTurnos.appendChild(li);
    });
});

function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

function reservarTurno(fecha, turno) {
    const nombreCompleto = prompt("Por favor, ingrese su nombre y apellido:");

    if (nombreCompleto) {
        const telefono = "+542244509598"; // Num en formato internacional
        const mensaje = `Hola, soy ${nombreCompleto} y quiero reservar el día ${fecha} a las ${turno}.`;
        const whatsappURL = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

        window.location.href = whatsappURL;
    }
}

function goBack() {
    window.location.href = '../index.html';
}

function generarTurnosDisponibles(diaSemana) {
    const horarios = {
        "lunes": [{ start: 16, end: 19 }],
        "martes": [{ start: 9, end: 12 }, { start: 15, end: 19 }],
        "miércoles": [{ start: 9, end: 12 }, { start: 15, end: 20 }],
        "jueves": [{ start: 9, end: 12 }, { start: 15, end: 19 }],
        "viernes": [{ start: 9, end: 12 }, { start: 14, end: 20 }],
        "sábado": [{ start: 9, end: 12.5 }, { start: 14, end: 16 }],
    };

    const turnos = [];
    const interval = 30;

    const sesiones = horarios[diaSemana.toLowerCase()];
    if (sesiones) {
        sesiones.forEach(sesion => {
            let { start, end } = sesion;
            for (let hour = Math.floor(start); hour < end; hour++) {
                turnos.push(`${hour}:00`);
                turnos.push(`${hour}:30`);
            }
            if (end % 1 !== 0) {
                turnos.push(`${Math.floor(end)}:30`); 
            } else {
                turnos.push(`${end}:00`); 
            }
        });
    }

    return turnos;
}
