import React, { useState } from 'react'
import useAPP from '@/hooks/useApp'

const Form = () => {

    const [tienePassword, SetTienePassword] = useState(false)
    const {agregarPassowrd} = useAPP()

    return (
        <div className='w-full mt-4'>
            <div>
                <label className='text-lg text-gray-800'>Eliminar tras:</label>
                <select className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-2 px-4 rounded focus:outline-none focus:border-gray-500'>
                    <option value="" selected disabled>Seleccione</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>

                <div className='mt-3'>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' onChange={() => SetTienePassword(!tienePassword)} />
                        <label className='text-lg text-gray-800 mr-2'> Proteger con contraseña</label>
                    </div>
                    {tienePassword &&
                        <input 
                            placeholder='Introduzca una contraseña para la descarga' 
                            type='password' 
                            className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-2 px-4 rounded focus:outline-none focus:border-gray-500' 
                            onChange={ e => agregarPassowrd(e.target.value)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Form
