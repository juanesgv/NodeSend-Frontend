import { useReducer, createContext } from "react";
import authReducer from "./authReducer";
import { 
  REGISTRO_EXITOSO, 
  REGISTRO_ERROR,
  LIMPIAR_ALETRTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION
} from "@/types";
import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";

const AuthContext = createContext()

const AuthState = ({ children }) => {
  //Definir el state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: {
      tipo: null,
      text: null
    },
  };

  //Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {

    try {
        const respuesta =  await clienteAxios.post('/usuarios', datos)
        dispatch ({
          type : REGISTRO_EXITOSO,
          payload : {tipo:'exito', text:respuesta.data.msg}
        })

    } catch (error) {
      console.log(error);
      dispatch ({
        type:REGISTRO_ERROR,
        payload : {tipo:'error', text:error.response.data.msg}
      })

    } finally{
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALETRTA,
        });
      }, 5000);
    }
  };

  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('/auth', datos)
      dispatch({
        type:LOGIN_EXITOSO,
        payload: respuesta.data.token
      })

    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({
        type:LOGIN_ERROR,
        payload: {tipo:'error', text:error.response.data.msg}
      })

    } finally  {
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALETRTA,
        });
      }, 5000);
    }
  }
  

  const usuarioAutenticado = async() => {
    const token = localStorage.getItem('token')
    if(token){
      tokenAuth(token)
    }

    try {
      const respuesta = await clienteAxios.get('/auth')

      if(respuesta.data){
        dispatch({
          type:USUARIO_AUTENTICADO,
          payload: respuesta.data
        })
      }

    } catch (error) {
      console.log(error)
      dispatch({
        type:LOGIN_ERROR,
        payload: {tipo:'error', text:error.response.data.msg}
      })
    }
  };

  const cerrarSesion = ()=>{
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext}
export default AuthState;
