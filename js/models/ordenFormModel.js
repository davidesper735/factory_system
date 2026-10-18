// MODELO: reglas de validación de los formularios de orden. No toca el HTML.

// Cada error tiene: mensaje (bajo el campo) y resumen (en el aviso rojo de arriba)
const error = (mensaje, resumen) => ({ mensaje, resumen });

function fechaValida(texto) {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto.trim());
  if (!partes) return false;
  const dia = Number(partes[1]);
  const mes = Number(partes[2]);
  const anio = Number(partes[3]);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

// Devuelve un objeto con los errores por campo (vacío si todo está bien)
export function validarOrden(datos) {
  const errores = {};
  const cedula = datos.cedula.replace(/[.\s]/g, "");
  const telefono = datos.telefono.replace(/[\s-]/g, "");
  const costo = datos.costo.replace(/[$.\s]/g, "");

  if (datos.nombre.trim().length < 3) {
    errores.nombre = error("Escribe el nombre completo (mínimo 3 letras).", "Nombre: escribe el nombre completo");
  }

  if (cedula === "") {
    errores.cedula = error("La cédula es obligatoria.", "Cédula: es obligatoria");
  } else if (!/^\d{6,10}$/.test(cedula)) {
    errores.cedula = error("La cédula debe tener entre 6 y 10 números.", "Cédula: debe tener entre 6 y 10 números");
  }

  if (telefono === "") {
    errores.telefono = error("El teléfono es obligatorio.", "Teléfono: es obligatorio");
  } else if (!/^\d+$/.test(telefono)) {
    errores.telefono = error("Usa solo números (10 dígitos).", "Teléfono: usa solo números (10 dígitos)");
  } else if (!/^3\d{9}$/.test(telefono)) {
    errores.telefono = error("Debe tener 10 dígitos y empezar por 3.", "Teléfono: debe tener 10 dígitos y empezar por 3");
  }

  if (datos.tipo === "") {
    errores.tipo = error("Selecciona el tipo de equipo.", "Tipo de equipo: selecciona una opción");
  }
  if (datos.marca.trim() === "") {
    errores.marca = error("Escribe la marca del equipo.", "Marca: es obligatoria");
  }
  if (datos.modelo.trim() === "") {
    errores.modelo = error("Escribe el modelo del equipo.", "Modelo: es obligatorio");
  }
  if (datos.falla.trim().length < 10) {
    errores.falla = error("Describe la falla con al menos 10 caracteres.", "Falla reportada: describe la falla (mínimo 10 caracteres)");
  }

  if (!fechaValida(datos.fecha)) {
    errores.fecha = error("Escribe una fecha válida con el formato dd/mm/aaaa.", "Fecha de ingreso: usa el formato dd/mm/aaaa");
  }

  if (costo === "") {
    errores.costo = error("El costo es obligatorio.", "Costo: es obligatorio");
  } else if (/^-\d+$/.test(costo)) {
    errores.costo = error("El costo no puede ser negativo.", "Costo: no puede ser negativo");
  } else if (!/^\d+$/.test(costo)) {
    errores.costo = error("Escribe el costo solo con números (ej. $120.000).", "Costo: usa solo números");
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
