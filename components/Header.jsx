import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import useAPP from '@/hooks/useApp'
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()

    const { usuarioAutenticado, cerrarSesion ,usuario } = useAuth()
    const {limpiarState} = useAPP()

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    const redireccionar = () => {
        router.push('/');
        limpiarState()
    }

    return (
        <div className='py-8 flex flex-col md:flex-row items-center justify-between'>

            <img className='w-64 mb-8 md:0 cursor-pointer' src='/logo.svg' onClick={redireccionar}/>

            <div className='flex gap-3'>

                {
                    usuario ? (
                        <div className='flex items-center gap-6'>
                            <p>Hola {usuario.nombre}</p>
                            <button className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase' type='button' onClick={cerrarSesion}>Cerrar sesión</button>
                        </div>
                    )
                        :
                        (
                            <>
                                <Link href="/login" className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase'>
                                    Iniciar sesión
                                </Link>
                                <Link href="/crear_cuenta" className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                                    Crear cuenta
                                </Link>
                            </>
                        )
                }


            </div>
        </div>
    )
}

export default Header
