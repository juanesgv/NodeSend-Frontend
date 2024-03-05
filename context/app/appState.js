import { createContext, useReducer } from "react";
import {
  SUBIENDO_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  MOSTRAR_ALETRTA,
  OCULTAR_ALETRTA,
  LIMPIAR_STATE,
  AGREGAR_PASSWOWRD,
  AGREGAR_DESCARGAS
} from "@/types";
import appReducer from "./appReducer";
import clienteAxios from "@/config/axios";

const AppContext = createContext();

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: false,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (alerta) => {
    const { titulo, descripcion, tipo } = alerta;
    dispatch({
      type: MOSTRAR_ALETRTA,
      payload: { tipo: tipo, titulo: titulo, descripcion: descripcion },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALETRTA,
      });
    }, 5000);
  };

  const subirArchivo = async (formData, nombreArchivo) => {

    dispatch({
        type: SUBIENDO_ARCHIVO,
    })

    const resultado = await clienteAxios.post("/archivos", formData);

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

  const crearEnlace = async () => {
    const data = {
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor
    }

    try {
        const resultado = await clienteAxios.post('/enlaces', data)
        dispatch({
            type: CREAR_ENLACE_EXITO,
            payload: resultado.data.msg
        })
        mostrarAlerta({
            titulo: "Enlace creado exitosamente",
            descripcion: "Ahora puedes compartir este enlace con otras personas.",
            tipo: "success"
        })
    } catch (error) {
        console.log(error)
    }
}

const limpiarState=()=>{
  dispatch({
    type: LIMPIAR_STATE,
  })
}

const agregarPassowrd = password => {
  dispatch({
    type : AGREGAR_PASSWOWRD,
    payload: password
  })
}

const agregarNroDescargas = descargas => {
  dispatch({
    type: AGREGAR_DESCARGAS,
    payload: descargas
  })  
}


  return (
    <AppContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas, 
        password: state.password,
        autor: state.autor,
        url: state.url,
        toastAlert: state.toastAlert,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassowrd,
        agregarNroDescargas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
export { AppContext };
