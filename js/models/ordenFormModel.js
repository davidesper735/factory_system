// MODELO DE FORMULARIOS DE ORDEN: valida y prepara los datos de "nueva orden" y "editar orden".
// No toca el HTML.
import { formatearTamano } from "../utils/formato.js";

// Cada error tiene dos textos:
//   mensaje: sale debajo del campo
//   resumen: sale en el aviso rojo de arriba
function crearError(mensaje, resumen) {
  return { mensaje: mensaje, resumen: resumen };
}

// Revisa que la fecha tenga el formato dd/mm/aaaa y que exista (por ejemplo, no el 31/02)
function fechaValida(texto) {
  const partes = texto.trim().split("/");
  if (partes.length !== 3) {
    return false;
  }
  const dia = Number(partes[0]);
  const mes = Number(partes[1]);
  const anio = Number(partes[2]);
  if (partes[2].length !== 4) {
    return false;
  }
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

function validarCedula(cedula) {
  if (cedula === "") {
    return crearError("La cédula es obligatoria.", "Cédula: es obligatoria");
  }
  if (!/^\d{6,10}$/.test(cedula)) {
    return crearError("La cédula debe tener entre 6 y 10 números.", "Cédula: debe tener entre 6 y 10 números");
  }
  return null; // null significa "sin error"
}

function validarTelefono(telefono) {
  if (telefono === "") {
    return crearError("El teléfono es obligatorio.", "Teléfono: es obligatorio");
  }
  if (!/^\d+$/.test(telefono)) {
    return crearError("Usa solo números (10 dígitos).", "Teléfono: usa solo números (10 dígitos)");
  }
  if (!/^3\d{9}$/.test(telefono)) {
    return crearError("Debe tener 10 dígitos y empezar por 3.", "Teléfono: debe tener 10 dígitos y empezar por 3");
  }
  return null;
}

function validarCosto(costo) {
  if (costo === "") {
    return crearError("El costo es obligatorio.", "Costo: es obligatorio");
  }
  if (/^-\d+$/.test(costo)) {
    return crearError("El costo no puede ser negativo.", "Costo: no puede ser negativo");
  }
  if (!/^\d+$/.test(costo)) {
    return crearError("Escribe el costo solo con números (ej. $120.000).", "Costo: usa solo números");
  }
  return null;
}

// Devuelve un objeto con los errores de cada campo. Si no hay errores, el objeto queda vacío.
export function validarOrden(datos) {
  const errores = {};
  const cedula = datos.cedula.replace(/[.\s]/g, "");
  const telefono = datos.telefono.replace(/[\s-]/g, "");
  const costo = datos.costo.replace(/[$.\s]/g, "");

  if (datos.nombre.trim().length < 3) {
    errores.nombre = crearError("Escribe el nombre completo (mínimo 3 letras).", "Nombre: escribe el nombre completo");
  }
  if (validarCedula(cedula) !== null) {
    errores.cedula = validarCedula(cedula);
  }
  if (validarTelefono(telefono) !== null) {
    errores.telefono = validarTelefono(telefono);
  }
  if (datos.tipo === "") {
    errores.tipo = crearError("Selecciona el tipo de equipo.", "Tipo de equipo: selecciona una opción");
  }
  if (datos.marca.trim() === "") {
    errores.marca = crearError("Escribe la marca del equipo.", "Marca: es obligatoria");
  }
  if (datos.modelo.trim() === "") {
    errores.modelo = crearError("Escribe el modelo del equipo.", "Modelo: es obligatorio");
  }
  if (datos.falla.trim().length < 10) {
    errores.falla = crearError("Describe la falla con al menos 10 caracteres.", "Falla reportada: describe la falla (mínimo 10 caracteres)");
  }
  if (!fechaValida(datos.fecha)) {
    errores.fecha = crearError("Escribe una fecha válida con el formato dd/mm/aaaa.", "Fecha de ingreso: usa el formato dd/mm/aaaa");
  }
  if (validarCosto(costo) !== null) {
    errores.costo = validarCosto(costo);
  }
  return errores;
}

// Las fotos son opcionales: JPG o PNG, máximo 5 MB cada una. Devuelve el error o "".
export function validarFotos(archivos) {
  for (const archivo of archivos) {
    if (archivo.type !== "image/jpeg" && archivo.type !== "image/png") {
      return '"' + archivo.name + '" no es una imagen JPG o PNG.';
    }
    if (archivo.size > 5 * 1024 * 1024) {
      return '"' + archivo.name + '" pesa más de 5 MB.';
    }
  }
  return "";
}

// "06/10/2026" -> "2026-10-06" (así se guarda la fecha)
function convertirFechaAIso(texto) {
  const partes = texto.trim().split("/");
  return partes[2] + "-" + partes[1] + "-" + partes[0];
}

// Convierte lo que se escribió en el formulario en los datos que se guardan
export function normalizarDatosFormulario(datos) {
  return {
    nombre: datos.nombre.trim(),
    cedula: datos.cedula.replace(/[.\s]/g, ""),
    telefono: datos.telefono.replace(/[\s-]/g, ""),
    tipo: datos.tipo,
    marca: datos.marca.trim(),
    modelo: datos.modelo.trim(),
    falla: datos.falla.trim(),
    diagnostico: datos.diagnostico.trim(),
    estado: datos.estado,
    fechaIngreso: convertirFechaAIso(datos.fecha),
    tecnico: datos.tecnico,
    costo: Number(datos.costo.replace(/[$.\s]/g, "")),
  };
}

// localStorage no guarda imágenes grandes: de cada foto se guarda solo su nombre y tamaño
export function construirEvidencias(archivos) {
  const evidencias = [];
  for (const archivo of archivos) {
    evidencias.push({
      nombre: archivo.name,
      etiqueta: archivo.name.replace(/\.[^.]+$/, ""), // el nombre sin la extensión
      tamano: archivo.size,
      ruta: "",
    });
  }
  return evidencias;
}

// Texto como "2 fotos adjuntas · 3,2 MB"
export function resumirEvidencias(evidencias) {
  if (evidencias.length === 0) {
    return "Sin fotos adjuntas";
  }
  let total = 0;
  for (const evidencia of evidencias) {
    total = total + evidencia.tamano;
  }
  let cantidad = evidencias.length + " fotos adjuntas";
  if (evidencias.length === 1) {
    cantidad = "1 foto adjunta";
  }
  return cantidad + " · " + formatearTamano(total);
}
