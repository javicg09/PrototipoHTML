# Repositorio de trabajo para página HTML - Usabilidad y Accesibilidad
## Enunciado del prototipo:
Recuerda que el tema del prototipo es: 
Aplicación Web para la reserva de traslados en taxis, desde un aeropuerto a destinos dentro de la región geográfica (ej. desde Aeropuerto Tenerife Sur a cualquier lugar de la isla de la Tenerife). Debe incluir al menos 4 interfaces (landing page, formulario de solicitud de reserva, gestión de reservas existentes con código de reserva+email del usuario, formulario de contacto).



reservas.js	-> Tabla de precios, calcularPrecio, guardar/buscar/cancelar en localStorage, generarCodigo

gestion_reservas.js	-> Precio en tiempo real al cambiar aeropuerto/destino/pasajeros; validación fecha futura

pagos.js -> Lee params de la URL y rellena el resumen real; valida tarjeta (16 dígitos, no caducada, CVV 3 dígitos); guarda en localStorage y redirige

confirmacion.js ->	Lee el código de la URL, recupera la reserva del localStorage y muestra el resumen completo

consultar.js -> Busca por código + email en localStorage; muestra los datos; botón cancelar con confirmación

Uso:
1. Usuario rellena gestion_de_reservas.html → ve el precio estimado en directo → envía
2. pagos.html muestra el resumen real (aeropuerto, destino, precio calculado según los datos reales)
    Elige efectivo o tarjeta → la reserva se guarda en localStorage con código único TX-2026-XXXX
3. confirmacion_final.html muestra el código y el resumen completo
4. consultar_reservas.html permite buscar por código + email y cancelar la reserva