// MODELO: textos de las acciones de la pantalla de estado. No toca el HTML.
const MENSAJES = {
  detalle: "El detalle de la orden (diagnóstico, fotos e historial) estará disponible en la próxima entrega.",
  whatsapp: "Pronto podrás escribirnos por WhatsApp desde aquí. Por ahora, comunícate con el taller donde dejaste tu equipo.",
};

export function obtenerMensaje(accion) {
  return MENSAJES[accion];
}
