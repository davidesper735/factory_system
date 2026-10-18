// MODELO: reglas del panel de órdenes. No toca el HTML.

// ¿La fila cumple con el texto buscado y el estado elegido?
export function coincideFiltro(textoFila, estadoFila, texto, estado) {
  const buscado = texto.trim().toLowerCase().replace(/\./g, "");
  const enFila = textoFila.toLowerCase().replace(/\./g, "");
  return enFila.includes(buscado) && (estado === "todos" || estado === estadoFila);
}

// Mensaje de WhatsApp sugerido según el estado de la orden
export function mensajeSugerido(orden) {
  const nombre = orden.cliente.split(" ")[0];
  const cierre = "Orden " + orden.numero + " · Factory System.";
  const mensajes = {
    recibido: "Hola, " + nombre + ". Recibimos tu equipo " + orden.equipo + ". Te avisaremos cuando iniciemos el diagnóstico. " + cierre,
    diagnostico: "Hola, " + nombre + ". Estamos revisando tu equipo " + orden.equipo + " para encontrar la falla. Te avisaremos con el diagnóstico y el costo. " + cierre,
    reparacion: "Hola, " + nombre + ". Tu equipo " + orden.equipo + " está en reparación. Ya iniciamos " + orden.trabajo + ". Costo: " + orden.costo + ". Te avisaremos cuando esté listo. " + cierre,
    listo: "Hola, " + nombre + ". Tu equipo " + orden.equipo + " ya está listo para recoger. Costo: " + orden.costo + ". " + cierre,
    entregado: "Hola, " + nombre + ". Gracias por confiar en nosotros: tu equipo " + orden.equipo + " fue entregado. " + cierre,
  };
  return mensajes[orden.estadoClave];
}

// Devuelve el error del mensaje o "" si está bien
export function validarMensaje(texto) {
  if (texto.trim() === "") return "Escribe el mensaje antes de enviarlo.";
  if (texto.length > 500) return "El mensaje no puede pasar de 500 caracteres.";
  return "";
}
