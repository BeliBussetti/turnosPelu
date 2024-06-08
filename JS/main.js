document.addEventListener('DOMContentLoaded', function () {
    const dias = generarDiasDeSemana();
    const listaDias = document.getElementById('lista-dias');

    dias.forEach(dia => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="dia">${capitalizarPrimeraLetra(dia.dia)}, ${dia.fecha}</span>
            <button class="btn" onclick="verTurnos('${dia.fecha}')">Ver Turnos</button>
        `;
        listaDias.appendChild(li);
    });
});

function verTurnos(fecha) {
    window.location.href = `pages/turnos.html?fecha=${fecha}`;
}

function generarDiasDeSemana() {
    const dias = [];
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    let dayCount = 0; // let para contar los días  agregados

    while (dias.length < 7) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + dayCount); // Avanzar 1 día iteración
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

function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}
