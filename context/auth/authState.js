import authContext from "./authContext";
import { useReducer } from "react";
import authReducer from "./authReducer";
import { USUARIO_AUTENTICADO } from "@/types";

const AuthState = ({children}) => {

    //Definir el state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el reducer
    const [ state, dispatch] = useReducer(authReducer, initialState)

    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }


    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState