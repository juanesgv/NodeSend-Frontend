import { createContext, useReducer } from "react";
import {
  SUBIENDO_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_ALETRTA,
  MOSTRAR_ALETRTA,
  OCULTAR_ALETRTA,
} from "@/types";
import appReducer from "./appReducer";
import clienteAxios from "@/config/axios";

const AppContext = createContext();

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (alerta) => {
    console.log(alerta);
    const { titulo, descripcion, tipo } = alerta;
    dispatch({
      type: MOSTRAR_ALETRTA,
      payload: { tipo: tipo, titulo: titulo, descripcion: descripcion },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALETRTA,
      });
    }, 4000);
  };

  const subirArchivo = async (formData, nombreArchivo) => {

    dispatch({
        type: SUBIENDO_ARCHIVO,
    })

    const resultado = await clienteAxios.post("/archivos", formData);
    console.log(resultado);

    setTimeout(() => {
        try {
            dispatch({
              type:SUBIR_ARCHIVO_EXITO,
              payload: {
                  nombre: resultado.data.archivo,
                  nombre_original: nombreArchivo
              }
            })
            
          } catch (error) {
            console.log(error);
            dispatch({
              type: SUBIR_ARCHIVO_ERROR,
              payload: error.response.data.msg
            })
          } 
    }, 1000);

  };

  return (
    <AppContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        mostrarAlerta,
        subirArchivo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
export { AppContext };
