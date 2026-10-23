// ALMACENAMIENTO: es el ÚNICO archivo que habla con localStorage.
// Guarda y lee cualquier dato (texto, números, listas, objetos) usando JSON.

export function leerDatos(llave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(llave);
    return texto === null ? valorPorDefecto : JSON.parse(texto);
  } catch (error) {
    return valorPorDefecto; // si el texto guardado está dañado, se usa el valor por defecto
  }
}

export function guardarDatos(llave, datos) {
  localStorage.setItem(llave, JSON.stringify(datos));
}

export function borrarDatos(llave) {
  localStorage.removeItem(llave);
}
