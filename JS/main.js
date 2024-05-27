document.addEventListener('DOMContentLoaded', function () {
    const dias = generarDiasDeSemana();
    const listaDias = document.getElementById('lista-dias');

    dias.forEach(dia => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="dia">${dia.dia}, ${dia.fecha}</span>
            <button class="btn" onclick="verTurnos('${dia.fecha}')">Ver Turnos</button>
        `;
        listaDias.appendChild(li);
    });
});

function verTurnos(fecha) {
    // Redirigir a la página de detalles con parámetros
    window.location.href = `pages/turnos.html?fecha=${fecha}`;
}

function generarDiasDeSemana() {
    const dias = [];
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    let dayCount = 0; // Variable para contar los días que hemos agregado

    while (dias.length < 7) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + dayCount); // Avanzar 1 día (o más) en cada iteración
        if (nextDay.getDay() !== 0) {
            const diaString = nextDay.toLocaleDateString('es-ES', options);
            dias.push({ 
                dia: diaString.split(',')[0],
                fecha: diaString.split(',')[1].trim()
            });
        }
        dayCount++;
    }

    return dias;
}

