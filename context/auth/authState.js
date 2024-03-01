import authContext from "./authContext";
import { useReducer } from "react";
import authReducer from "./authReducer";
import { REGISTRO_EXITOSO } from "@/types";
import clienteAxios from "@/config/axios";

const AuthState = ({ children }) => {
  //Definir el state inicial
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  //Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {

    try {
        const respuesta =  await clienteAxios.post('/usuarios', datos)
        dispatch ({
          type : REGISTRO_EXITOSO,
          payload : respuesta.data.msg
        })
    } catch (error) {
      console.log(error);
    }
  };

  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
