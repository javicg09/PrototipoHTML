document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = document.querySelector('[name="codigo"]').value.trim();
    const email  = document.querySelector('[name="email"]').value.trim();
    mostrarReserva(codigo, email);
});

function mostrarReserva(codigo, email) {
    const result = document.getElementById('resultado');
    const r = buscarReserva(codigo, email);

    if (!r) {
        result.innerHTML = `
            <div class="alert alert-danger mt-4">
                <i class="bi bi-x-circle-fill me-2"></i>
                No se encontró ninguna reserva con ese código y correo.
            </div>`;
        return;
    }

    const esCancelada = r.estado === 'cancelada';
    const badgeEstado = esCancelada
        ? '<span class="badge bg-danger">Cancelada</span>'
        : '<span class="badge bg-success">Confirmada</span>';

    const opcionesDestino = Object.entries(NOMBRES_DESTINO)
        .map(([val, nombre]) =>
            `<option value="${val}"${val === r.destino ? ' selected' : ''}>${nombre}</option>`)
        .join('');

    result.innerHTML = `
        <div class="card shadow-sm mt-4">
            <div class="card-header bg-dark text-white fw-bold">
                <i class="bi bi-clipboard-check-fill me-2"></i>Datos de la reserva ${badgeEstado}
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Código</span><strong>${r.codigo}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Nombre</span><span>${r.nombre}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Aeropuerto de origen</span><span>${NOMBRES_AEROPUERTO[r.aeropuerto] || r.aeropuerto}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Destino</span><span>${NOMBRES_DESTINO[r.destino] || r.destino}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Pasajeros</span><span>${r.pasajeros}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Fecha y hora</span><span>${formatearFecha(r.fecha)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Precio</span><strong>${r.precio !== null ? r.precio + ' €' : '-'}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Método de pago</span><span>${r.metodoPago}</span>
                    </li>
                </ul>

                ${!esCancelada ? `
                <div class="mt-3 d-flex gap-2">
                    <button id="btn-editar" class="btn btn-dark">
                        <i class="bi bi-pencil-fill me-2"></i>Editar reserva
                    </button>
                    <button id="btn-cancelar" class="btn btn-danger">
                        <i class="bi bi-x-circle me-2"></i>Cancelar reserva
                    </button>
                </div>

                <div id="form-editar" class="d-none mt-4 border-top pt-3">
                    <h6 class="fw-bold mb-3">Modificar reserva</h6>
                    <div class="mb-3">
                        <label for="edit-destino" class="form-label fw-semibold">Nuevo destino</label>
                        <select id="edit-destino" class="form-select">${opcionesDestino}</select>
                    </div>
                    <div class="mb-3">
                        <label for="edit-fecha" class="form-label fw-semibold">
                            Nueva fecha y hora
                            <small class="text-muted fw-normal">(debe ser posterior a la fecha actual de la reserva)</small>
                        </label>
                        <input id="edit-fecha" type="datetime-local" class="form-control" min="${r.fecha}">
                    </div>
                    <div id="edit-error" class="alert alert-danger d-none py-2 small"></div>
                    <div class="d-flex gap-2">
                        <button id="btn-guardar" class="btn btn-dark fw-bold">
                            <i class="bi bi-check-circle-fill me-2"></i>Guardar cambios
                        </button>
                        <button id="btn-cancelar-edicion" class="btn btn-outline-dark">
                            <i class="bi bi-x me-1"></i>Cancelar
                        </button>
                    </div>
                </div>` : ''}
            </div>
        </div>`;

    if (esCancelada) return;

    document.getElementById('btn-editar').addEventListener('click', function() {
        document.getElementById('form-editar').classList.toggle('d-none');
    });

    document.getElementById('btn-cancelar-edicion').addEventListener('click', function() {
        document.getElementById('form-editar').classList.add('d-none');
        document.getElementById('edit-error').classList.add('d-none');
    });

    document.getElementById('btn-guardar').addEventListener('click', function() {
        const nuevoDestino = document.getElementById('edit-destino').value;
        const nuevaFecha   = document.getElementById('edit-fecha').value;
        const errorDiv     = document.getElementById('edit-error');

        if (!nuevaFecha) {
            errorDiv.textContent = 'Selecciona una nueva fecha y hora.';
            errorDiv.classList.remove('d-none');
            return;
        }
        if (new Date(nuevaFecha) <= new Date(r.fecha)) {
            errorDiv.textContent = 'La nueva fecha debe ser posterior a la fecha actual de la reserva (' + formatearFecha(r.fecha) + ').';
            errorDiv.classList.remove('d-none');
            return;
        }

        editarReserva(r.codigo, nuevoDestino, nuevaFecha);
        mostrarReserva(codigo, email);
    });

    document.getElementById('btn-cancelar').addEventListener('click', function() {
        if (confirm('¿Seguro que quieres cancelar la reserva ' + r.codigo + '?')) {
            cancelarReserva(r.codigo);
            mostrarReserva(codigo, email);
        }
    });
}
