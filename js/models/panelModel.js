// MODELO: reglas del panel de órdenes. No toca el HTML.

// ¿La fila cumple con el texto buscado y el estado elegido?
export function coincideFiltro(textoFila, estadoFila, texto, estado) {
  const buscado = texto.trim().toLowerCase().replace(/\./g, "");
  const enFila = textoFila.toLowerCase().replace(/\./g, "");
  return enFila.includes(buscado) && (estado === "todos" || estado === estadoFila);
}
