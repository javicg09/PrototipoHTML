document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = document.querySelector('[name="codigo"]').value.trim();
    const email  = document.querySelector('[name="email"]').value.trim();
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
                <div class="mt-3">
                    <button id="btn-cancelar" class="btn btn-danger">
                        <i class="bi bi-x-circle me-2"></i>Cancelar reserva
                    </button>
                </div>` : ''}
            </div>
        </div>`;

    if (!esCancelada) {
        document.getElementById('btn-cancelar').addEventListener('click', function() {
            if (confirm('¿Seguro que quieres cancelar la reserva ' + r.codigo + '?')) {
                cancelarReserva(r.codigo);
                this.closest('.card').querySelector('.badge').outerHTML =
                    '<span class="badge bg-danger">Cancelada</span>';
                this.closest('div').remove();
            }
        });
    }
});
