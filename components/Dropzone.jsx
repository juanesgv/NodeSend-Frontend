import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '@/config/axios'

const Dropzone = () => {

    const onDrop = useCallback( async (acceptedFiles) => {

        //Crear un form-data
        const formData = new FormData()
        formData.append('archivo', acceptedFiles[0]) //acceptedFiles es un arreglo de archivos pero solo estoy permitiendo subir 1

        const resultado = await clienteAxios.post('/archivos', formData)
        console.log(resultado)
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop})

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
            <p className='font-bold text-lg'>{archivo.path}</p>
            <p className='text-gray-500 text-sm'>{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    return (
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 h-full'>

            <ul>
                {archivos}
            </ul>

            <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                <input className='h-full' {...getInputProps()} />

                    {
                        isDragActive ? (
                            <p className='text-lg text-center text-gray-600 w-full'>Sueltalo aquí</p>
                        ) :
                        (
                            <div className='text-center'>
                                <p className='text-lg text-center text-gray-600 '><span><button className='text-blue-700 hover:text-blue-400'>Selecciona un archivo </button></span> o arrástralo aquí</p>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Dropzone
