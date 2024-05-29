document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const fecha = params.get('fecha');

    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'short' };
    const fechaCompleta = new Date(`${new Date().getFullYear()} ${fecha}`);
    const dia = fechaCompleta.toLocaleDateString('es-ES', opcionesFecha);

    document.getElementById('titulo').textContent = fecha;

    const diaSemana = fechaCompleta.toLocaleDateString('es-ES', { weekday: 'long' });

    // Generar turnos
    const turnos = generarTurnosDisponibles(diaSemana);
    const listaTurnos = document.getElementById('lista-turnos');

    turnos.forEach(turno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="hora-turno">${turno}</span>
            <button class="btn-reservar" onclick="reservarTurno('${turno}')">Reservar</button>
        `;
        listaTurnos.appendChild(li);
    });
});

function reservarTurno(turno) {
    alert(`Reservando turno para ${turno}. Funcionalidad de reserva no implementada aún.`);
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
    const interval = 30; // Intervalo de 30 minutos

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
