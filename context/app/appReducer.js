import {
  SUBIENDO_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_ALETRTA,
  MOSTRAR_ALETRTA,
  OCULTAR_ALETRTA,
  LIMPIAR_STATE,
  AGREGAR_PASSWOWRD
} from "@/types";

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALETRTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };

    case OCULTAR_ALETRTA:
      return {
        ...state,
        mensaje_archivo: null,
      };

    case SUBIENDO_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };

    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: false,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        mensaje_archivo: action.payload,
        cargando: false,
      };

    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };

    case LIMPIAR_STATE:
      return {
        ...state,
        mensaje_archivo: null,
        nombre: "",
        nombre_original: "",
        cargando: false,
        descargas: 1,
        password: "",
        autor: null,
        url: "",
      };

    case AGREGAR_PASSWOWRD:
      return {
        ...state,
        password:action.payload
      };

    default:
      return state;
  }
};
