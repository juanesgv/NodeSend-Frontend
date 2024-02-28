import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='py-8 flex flex-col md:flex-row items-center justify-between'>
            <Link href="/">
                <img className='w-64 mb-8 md:0' src='logo.svg' />
            </Link>
            <div className='flex gap-3'>
                <Link href="/login" className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase'>
                    Iniciar sesión
                </Link>
                <Link href="/crear_cuenta" className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                    Crear cuenta
                </Link>
            </div>
        </div>
    )
}

export default Header
