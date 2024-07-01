const precios = {
    dos: 15000,
    tres: 18000,
    week: 20000,
};

const profesores = {
    "8 AM": "Profesor Pablo Diaz",
    "10 AM": "Profesor Adrian Lopez",
    "4 PM": "Profesora Sofia Garcia",
};

const fechasDisponibles = ["1 de julio", "8 de julio", "15 de julio", "22 de julio"];

let membresia = {
    dias: null,
    horario: null,
    nombreApellido: null,
    fechaInicio: null,
    costoTotal: null
};

function calcularCosto(dias) {
    return precios[dias] || 0;
}

function mostrarResumen({nombreApellido, dias, horario, fechaInicio, costoTotal}) {
    const resumen = `
        <h4>Resumen de Inscripción:</h4>
        <p><strong>Nombre:</strong> ${nombreApellido}</p>
        <p><strong>Días a la semana:</strong> ${dias}</p>
        <p><strong>Horario:</strong> ${horario}</p>
        <p><strong>Fecha de inicio:</strong> ${fechaInicio}</p>
        <p><strong>Costo total:</strong> $${costoTotal}</p>`;
    
    const respuestaDiv = document.getElementById('respuesta');
    respuestaDiv.innerHTML = resumen;
    respuestaDiv.style.display = 'block';
}

function guardarMembresiaEnLocalStorage(membresia) {
    const membresiaJSON = JSON.stringify(membresia);
    localStorage.setItem('membresia', membresiaJSON);
}

function obtenerMembresiaDeLocalStorage() {
    const membresiaJSON = localStorage.getItem('membresia');
    return membresiaJSON ? JSON.parse(membresiaJSON) : null;
}

function obtenerValoresFormulario() {
    const nombreApellido = document.getElementById('nombreApellido').value;
    const dias = document.getElementById('dias').value;
    const horarioSeleccionado = document.getElementById('horario').value;
    const horario = `${horarioSeleccionado} - ${profesores[horarioSeleccionado]}`;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const costoTotal = calcularCosto(dias);

    return { nombreApellido, dias, horario, fechaInicio, costoTotal };
}

document.getElementById('formularioInscripcion').addEventListener('submit', function(event) {
    event.preventDefault();

    const valoresFormulario = obtenerValoresFormulario();
    membresia = { ...membresia, ...valoresFormulario };

    guardarMembresiaEnLocalStorage(membresia);
    mostrarResumen(membresia);
});

document.addEventListener('DOMContentLoaded', () => {
    const membresiaGuardada = obtenerMembresiaDeLocalStorage();
    if (membresiaGuardada) {
        document.getElementById('nombreApellido').value = membresiaGuardada.nombreApellido;
        document.getElementById('dias').value = membresiaGuardada.dias;
        const horarioSeleccionado = membresiaGuardada.horario.split(' - ')[0];
        document.getElementById('horario').value = horarioSeleccionado;
        document.getElementById('fechaInicio').value = membresiaGuardada.fechaInicio;
        
        mostrarResumen(membresiaGuardada);
    }
});