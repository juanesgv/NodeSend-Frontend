import { createContext, useReducer } from "react";
import { 
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_ALETRTA
} from "@/types";

const AppContext = createContext()

const AppState = ({children}) => {

    return(
        <AppContext.Provider
            value={{

            }}
        >        
            {children}
        </AppContext.Provider>
    )
}

export default AppState
export {AppContext}