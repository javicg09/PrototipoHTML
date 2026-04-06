const params = new URLSearchParams(window.location.search);
const codigo = params.get('codigo') || '';

document.getElementById('badge-codigo').textContent = codigo || 'TX-????';

if (codigo) {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const r = reservas.find(x => x.codigo === codigo);
    if (r) {
        document.getElementById('conf-nombre').textContent     = r.nombre;
        document.getElementById('conf-origen').textContent     = NOMBRES_AEROPUERTO[r.aeropuerto] || r.aeropuerto;
        document.getElementById('conf-destino').textContent    = NOMBRES_DESTINO[r.destino] || r.destino;
        document.getElementById('conf-pasajeros').textContent  = r.pasajeros;
        document.getElementById('conf-fecha').textContent      = formatearFecha(r.fecha);
        document.getElementById('conf-precio').textContent     = r.precio !== null ? r.precio + ' €' : '-';
        document.getElementById('conf-pago').textContent       = r.metodoPago;
        document.getElementById('resumen-reserva').classList.remove('d-none');
    }
}
