import { createContext, useReducer } from "react";
import { 
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_ALETRTA,
    MOSTRAR_ALETRTA,
    OCULTAR_ALETRTA
} from "@/types";
import appReducer from "./appReducer";

const AppContext = createContext()

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo : null,
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const mostrarAlerta = (alerta) => {
        console.log(alerta)
        const {titulo, descripcion, tipo} = alerta
        dispatch({
            type:MOSTRAR_ALETRTA,
            payload: {tipo:tipo, titulo:titulo, descripcion:descripcion}
        })

        setTimeout(() => {
            dispatch({
                type:OCULTAR_ALETRTA,
            })
        }, 4000);
    }

    return(
        <AppContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                mostrarAlerta
            }}
        >        
            {children}
        </AppContext.Provider>
    )
}

export default AppState
export {AppContext}