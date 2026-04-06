// Tabla de precios: [aeropuerto][destino] = [precio_hasta4, precio_5a8]
const PRECIOS = {
  "1": { // Tenerife Norte
    "costa_adeje":       [90, 115],
    "los_cristianos":    [90, 115],
    "puerto_de_la_cruz": [30,  45],
    "santa_cruz":        [20,  35],
    "la_laguna":         [25,  40],
    "los_gigantes":      [75, 100],
    "el_medano":         [85, 110],
    "la_orotava":        [35,  50],
  },
  "2": { // Tenerife Sur
    "costa_adeje":       [35,  50],
    "los_cristianos":    [30,  45],
    "puerto_de_la_cruz": [95, 120],
    "santa_cruz":        [85, 110],
    "la_laguna":         [80, 105],
    "los_gigantes":      [60,  85],
    "el_medano":         [40,  60],
    "la_orotava":        [90, 115],
  }
};

const NOMBRES_DESTINO = {
  "costa_adeje":       "Costa Adeje",
  "los_cristianos":    "Los Cristianos",
  "puerto_de_la_cruz": "Puerto de la Cruz",
  "santa_cruz":        "Santa Cruz de Tenerife",
  "la_laguna":         "San Cristóbal de La Laguna",
  "los_gigantes":      "Los Gigantes",
  "el_medano":         "El Médano",
  "la_orotava":        "La Orotava",
};

const NOMBRES_AEROPUERTO = {
  "1": "Tenerife Norte (TFN)",
  "2": "Tenerife Sur (TFS)",
};

function calcularPrecio(aeropuerto, destino, pasajeros) {
  if (!PRECIOS[aeropuerto] || !PRECIOS[aeropuerto][destino]) return null;
  const n = parseInt(pasajeros) || 1;
  return n <= 4 ? PRECIOS[aeropuerto][destino][0] : PRECIOS[aeropuerto][destino][1];
}

function generarCodigo() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return "TX-2026-" + num;
}

function guardarReserva(datos) {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  reservas.push(datos);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function buscarReserva(codigo, email) {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  return reservas.find(r => r.codigo === codigo && r.email.toLowerCase() === email.toLowerCase()) || null;
}

function cancelarReserva(codigo) {
  let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  reservas = reservas.map(r => r.codigo === codigo ? { ...r, estado: "cancelada" } : r);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return "-";
  const d = new Date(fechaStr);
  return d.toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" });
}
