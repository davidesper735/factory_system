// MODELO: textos de las acciones de las pantallas del cliente. No toca el HTML.
const MENSAJES = {
  whatsapp: "Pronto podrás escribirnos por WhatsApp desde aquí. Por ahora, comunícate con el taller donde dejaste tu equipo.",
};

export function obtenerMensaje(accion) {
  return MENSAJES[accion];
}
