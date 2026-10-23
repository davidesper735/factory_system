// Validación compartida por "nueva orden" y "editar orden" (así no se repite código).
import { validarOrden, validarFotos } from "../models/ordenFormModel.js";

// Valida el formulario, muestra los errores en la página y devuelve true si todo está bien
export function validarFormularioOrden(vista) {
  const errores = validarOrden(vista.obtenerDatos());
  const errorFotos = validarFotos(vista.elementos.fotos.files);
  vista.mostrarErrores(errores);
  vista.mostrarErrorFotos(errorFotos);
  vista.mostrarResumenErrores(errores);

  if (Object.keys(errores).length === 0 && errorFotos === "") return true;

  vista.irAlInicio(); // para ver el aviso rojo
  vista.enfocarPrimerError(errores);
  return false;
}
