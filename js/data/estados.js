// DATOS FIJOS: los 5 estados de una reparación, en orden.
export const ESTADOS = [
  { clave: "recibido", texto: "Recibido", nota: "Equipo registrado en el taller." },
  { clave: "diagnostico", texto: "En diagnóstico", nota: "Estamos revisando el equipo para encontrar la falla." },
  { clave: "reparacion", texto: "En reparación", nota: "La reparación está en curso." },
  { clave: "listo", texto: "Listo", nota: "Pruebas finales y aviso para recoger." },
  { clave: "entregado", texto: "Entregado", nota: "Entrega del equipo al cliente." },
];

// Devuelve el estado que tiene esa clave (por ejemplo "listo")
export function buscarEstado(clave) {
  for (const estado of ESTADOS) {
    if (estado.clave === clave) {
      return estado;
    }
  }
  return null;
}

// Devuelve la posición del estado en la lista (0 a 4)
export function indiceDeEstado(clave) {
  for (let indice = 0; indice < ESTADOS.length; indice++) {
    if (ESTADOS[indice].clave === clave) {
      return indice;
    }
  }
  return -1;
}
