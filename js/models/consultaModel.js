// MODELO DE CONSULTA: valida la cédula y el número de orden y busca la orden.
import { buscarOrdenPorCedulaYNumero } from "./ordenesModel.js";

// Quita puntos y espacios: "1.098.765.432" -> "1098765432"
function soloNumeros(texto) {
  return texto.replace(/[.\s]/g, "");
}

// Devuelve un objeto con los errores (vacío si todo está bien)
export function validarConsulta(cedula, orden) {
  const errores = {};
  const cedulaLimpia = soloNumeros(cedula);
  const ordenLimpia = soloNumeros(orden);

  if (cedulaLimpia === "") {
    errores.cedula = "Escribe tu cédula.";
  } else if (!/^\d{6,10}$/.test(cedulaLimpia)) {
    errores.cedula = "La cédula debe tener entre 6 y 10 números.";
  }

  if (ordenLimpia === "") {
    errores.orden = "Escribe el número de orden.";
  } else if (!/^\d+$/.test(ordenLimpia)) {
    errores.orden = "El número de orden solo puede tener números.";
  }

  return errores;
}

// Devuelve la orden encontrada o null
export function buscarOrden(cedula, orden) {
  return buscarOrdenPorCedulaYNumero(soloNumeros(cedula), soloNumeros(orden));
}
