// CONTROLADOR de "Detalle de la orden": busca la orden y le pide a la vista que la muestre.
import { buscarOrdenPorNumero } from "../models/ordenesModel.js";
import * as progreso from "../models/progresoModel.js";
import { resumirEvidencias } from "../models/ordenFormModel.js";
import { leerParametro } from "../utils/url.js";
import * as vista from "../views/detalleView.js";

function iniciar() {
  const orden = buscarOrdenPorNumero(leerParametro("orden")); // detalle-orden.html?orden=123
  if (orden === null) {
    vista.mostrarOrdenNoEncontrada();
    return;
  }
  vista.mostrarDetalle({
    orden: orden,
    pasos: progreso.construirPasos(orden),
    autorDiagnostico: progreso.textoAutorDiagnostico(orden),
    resumenFotos: resumirEvidencias(orden.evidencias),
    notaHistorial: progreso.notaDeHistorial(orden),
  });
}

iniciar();
