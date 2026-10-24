// ALMACENAMIENTO: es el ÚNICO archivo que habla con localStorage.
// localStorage solo guarda texto, por eso usamos JSON:
//   JSON.stringify(datos) convierte los datos a texto (para guardar)
//   JSON.parse(texto)     convierte el texto otra vez a datos (para leer)

export function leerDatos(llave, valorPorDefecto) {
  const texto = localStorage.getItem(llave);
  if (texto === null) {
    return valorPorDefecto; // todavía no hay nada guardado con esa llave
  }
  try {
    return JSON.parse(texto);
  } catch (error) {
    return valorPorDefecto; // el texto guardado estaba dañado
  }
}

export function guardarDatos(llave, datos) {
  localStorage.setItem(llave, JSON.stringify(datos));
}

export function borrarDatos(llave) {
  localStorage.removeItem(llave);
}
