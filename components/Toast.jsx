import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify';

const Toast = () => {

    const {mensaje} = useAuth();

    useEffect (()=>{
        if(mensaje && mensaje.tipo === 'exito'){
            toast.success(mensaje.text)
        }else if(mensaje && mensaje.tipo === 'error'){
            toast.error(mensaje.text)
        }
    },[mensaje])

    return null
}

export default Toast
