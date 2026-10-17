// MODELO: reglas de validación de la nueva orden. No toca el HTML.

function fechaValida(texto) {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto.trim());
  if (!partes) return false;
  const dia = Number(partes[1]);
  const mes = Number(partes[2]);
  const anio = Number(partes[3]);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

// Devuelve un objeto con los errores (vacío si todo está bien)
export function validarOrden(datos) {
  const errores = {};

  if (datos.nombre.trim().length < 3) {
    errores.nombre = "Escribe el nombre completo del cliente (mínimo 3 letras).";
  }
  if (!/^\d{6,10}$/.test(datos.cedula.replace(/[.\s]/g, ""))) {
    errores.cedula = "La cédula debe tener entre 6 y 10 números.";
  }
  if (!/^3\d{9}$/.test(datos.telefono.replace(/[\s-]/g, ""))) {
    errores.telefono = "Escribe un celular de 10 números que empiece por 3 (ej. 300 123 4567).";
  }
  if (datos.tipo === "") {
    errores.tipo = "Selecciona el tipo de equipo.";
  }
  if (datos.marca.trim() === "") {
    errores.marca = "Escribe la marca del equipo.";
  }
  if (datos.modelo.trim() === "") {
    errores.modelo = "Escribe el modelo del equipo.";
  }
  if (datos.falla.trim().length < 10) {
    errores.falla = "Describe la falla con al menos 10 caracteres.";
  }
  if (!fechaValida(datos.fecha)) {
    errores.fecha = "Escribe una fecha válida con el formato dd/mm/aaaa.";
  }
  if (!/^\d+$/.test(datos.costo.replace(/[$.\s]/g, ""))) {
    errores.costo = "Escribe el costo en pesos, solo números (ej. $120.000).";
  }
  return errores;
}

// Las fotos son opcionales: JPG o PNG, máximo 5 MB cada una. Devuelve el error o "".
export function validarFotos(archivos) {
  for (const archivo of archivos) {
    if (archivo.type !== "image/jpeg" && archivo.type !== "image/png") {
      return "\"" + archivo.name + "\" no es una imagen JPG o PNG.";
    }
    if (archivo.size > 5 * 1024 * 1024) {
      return "\"" + archivo.name + "\" pesa más de 5 MB.";
    }
  }
  return "";
}
