const selAeropuerto = document.querySelector('[name="aeropuerto"]');
const selDestino    = document.querySelector('[name="destino"]');
const inpPasajeros  = document.querySelector('[name="pasajeros"]');
const divPrecio     = document.getElementById('precio-estimado');
const spanPrecio    = document.getElementById('precio-valor');

function actualizarPrecio() {
    const precio = calcularPrecio(selAeropuerto.value, selDestino.value, inpPasajeros.value);
    if (precio !== null) {
        spanPrecio.textContent = precio + ' €';
        divPrecio.classList.remove('d-none');
    } else {
        divPrecio.classList.add('d-none');
    }
}

selAeropuerto.addEventListener('change', actualizarPrecio);
selDestino.addEventListener('change', actualizarPrecio);
inpPasajeros.addEventListener('input', actualizarPrecio);

// Validar email y fecha
document.querySelector('form').addEventListener('submit', function(e) {
    const emailInput = document.querySelector('[name="email"]');
    const emailError = document.getElementById('email-error');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    if (!emailValido) {
        e.preventDefault();
        emailError.classList.remove('d-none');
        emailInput.focus();
        return;
    } else {
        emailError.classList.add('d-none');
    }

    const fecha = document.querySelector('[name="fecha"]').value;
    if (fecha && new Date(fecha) < new Date()) {
        e.preventDefault();
        alert('La fecha y hora del traslado no puede ser en el pasado.');
    }
});
