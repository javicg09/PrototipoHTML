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

// Cargar borrador al entrar en la página
const borrador = JSON.parse(localStorage.getItem('borrador_reserva') || 'null');
if (borrador) {
    document.querySelector('[name="nombre"]').value   = borrador.nombre    || '';
    document.querySelector('[name="email"]').value    = borrador.email     || '';
    document.querySelector('[name="telefono"]').value = borrador.telefono  || '';
    selAeropuerto.value = borrador.aeropuerto || '';
    selDestino.value    = borrador.destino    || '';
    inpPasajeros.value  = borrador.pasajeros  || 1;
    document.querySelector('[name="fecha"]').value = borrador.fecha || '';
    actualizarPrecio();
    document.getElementById('aviso-borrador').classList.remove('d-none');
}

// Guardar borrador
document.getElementById('btn-borrador').addEventListener('click', function() {
    const datos = {
        nombre:     document.querySelector('[name="nombre"]').value,
        email:      document.querySelector('[name="email"]').value,
        telefono:   document.querySelector('[name="telefono"]').value,
        aeropuerto: selAeropuerto.value,
        destino:    selDestino.value,
        pasajeros:  inpPasajeros.value,
        fecha:      document.querySelector('[name="fecha"]').value,
    };
    localStorage.setItem('borrador_reserva', JSON.stringify(datos));

    const btn = this;
    btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Borrador guardado';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-floppy-fill me-1"></i>Guardar borrador';
        btn.disabled = false;
    }, 2000);
});

// Descartar borrador
document.getElementById('btn-descartar-borrador').addEventListener('click', function() {
    localStorage.removeItem('borrador_reserva');
    document.getElementById('aviso-borrador').classList.add('d-none');
    document.querySelector('form').reset();
    divPrecio.classList.add('d-none');
});

// Validar y limpiar borrador al confirmar la reserva
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
        return;
    }

    // Reserva enviada correctamente: eliminar borrador
    localStorage.removeItem('borrador_reserva');
});
