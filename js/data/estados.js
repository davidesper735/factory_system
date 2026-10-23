// DATOS FIJOS: los 5 estados de una reparación, en orden.
export const ESTADOS = [
  { clave: "recibido", texto: "Recibido", nota: "Equipo registrado en el taller." },
  { clave: "diagnostico", texto: "En diagnóstico", nota: "Estamos revisando el equipo para encontrar la falla." },
  { clave: "reparacion", texto: "En reparación", nota: "La reparación está en curso." },
  { clave: "listo", texto: "Listo", nota: "Pruebas finales y aviso para recoger." },
  { clave: "entregado", texto: "Entregado", nota: "Entrega del equipo al cliente." },
];

export function buscarEstado(clave) {
  return ESTADOS.find((estado) => estado.clave === clave);
}

export function indiceDeEstado(clave) {
  return ESTADOS.findIndex((estado) => estado.clave === clave);
}
