document.addEventListener('DOMContentLoaded', function () {
    const dias = generarDiasDeSemana();
    const listaDias = document.getElementById('lista-dias');

    dias.forEach(dia => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="dia">${capitalizarPrimeraLetra(dia.dia)} ${dia.fecha}</span>
            <button class="btn" onclick="verTurnos('${dia.fechaCompleta}')">Ver Turnos</button>
        `;
        listaDias.appendChild(li);
    });
});

function verTurnos(fecha) {
    window.location.href = `pages/turnos.html?fecha=${encodeURIComponent(fecha)}`;
}

function generarDiasDeSemana() {
    const dias = [];
    const today = new Date();
    const optionsDia = { weekday: 'long' };
    const optionsFecha = { day: 'numeric', month: 'short' };
    let dayCount = 0;

    while (dias.length < 7) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + dayCount);
        if (nextDay.getDay() !== 0) {
            const diaString = nextDay.toLocaleDateString('es-ES', optionsDia);
            const fechaString = nextDay.toLocaleDateString('es-ES', optionsFecha).replace(/de /g, '');
            dias.push({
                dia: diaString.split(',')[0],
                fecha: fechaString,
                fechaCompleta: nextDay.toISOString().split('T')[0] // Formato ISO para compatibilidad
            });
        }
        dayCount++;
    }

    return dias;
}

function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}
