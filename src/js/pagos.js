const params = new URLSearchParams(window.location.search);

const nombre    = params.get('nombre')    || '-';
const email     = params.get('email')     || '-';
const telefono  = params.get('telefono')  || '-';
const aeropuerto = params.get('aeropuerto') || '';
const destino   = params.get('destino')   || '';
const pasajeros = params.get('pasajeros') || '1';
const fecha     = params.get('fecha')     || '';

const precio = calcularPrecio(aeropuerto, destino, pasajeros);

// Rellenar resumen del trayecto
document.getElementById('res-nombre').textContent    = nombre;
document.getElementById('res-origen').textContent    = NOMBRES_AEROPUERTO[aeropuerto] || aeropuerto;
document.getElementById('res-destino').textContent   = NOMBRES_DESTINO[destino] || destino;
document.getElementById('res-pasajeros').textContent = pasajeros;
document.getElementById('res-fecha').textContent     = formatearFecha(fecha);
document.getElementById('res-precio').textContent    = precio !== null ? precio + ' €' : 'Consultar';

// Función compartida para guardar y redirigir
function confirmarReserva(metodoPago) {
    const codigo = generarCodigo();
    guardarReserva({
        codigo,
        nombre,
        email,
        telefono,
        aeropuerto,
        destino,
        pasajeros,
        fecha,
        precio,
        metodoPago,
        estado: 'confirmada',
    });
    window.location.href = 'confirmacion_final.html?codigo=' + encodeURIComponent(codigo);
}

// Botón efectivo
document.getElementById('btn-efectivo').addEventListener('click', function() {
    confirmarReserva('Efectivo');
});

// Formulario tarjeta
document.getElementById('form-tarjeta').addEventListener('submit', function(e) {
    e.preventDefault();

    const numTarjeta = document.getElementById('num-tarjeta').value.replace(/\s/g, '');
    const expiracion = document.getElementById('expiracion').value;
    const cvv        = document.getElementById('cvv').value;

    if (!/^\d{16}$/.test(numTarjeta)) {
        alert('El número de tarjeta debe tener 16 dígitos.');
        return;
    }

    if (expiracion) {
        const [anio, mes] = expiracion.split('-').map(Number);
        const hoy = new Date();
        if (anio < hoy.getFullYear() || (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1)) {
            alert('La tarjeta ha caducado.');
            return;
        }
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('El CVV debe tener 3 dígitos.');
        return;
    }

    confirmarReserva('Tarjeta');
});
