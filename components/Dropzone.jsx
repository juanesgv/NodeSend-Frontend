import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '@/config/axios'

const Dropzone = () => {

    const onDropRejected = () => {
        console.log("no se puede subir")
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {

        //Crear un form-data
        const formData = new FormData()
        formData.append('archivo', acceptedFiles[0]) //acceptedFiles es un arreglo de archivos pero solo estoy permitiendo subir 1

        const resultado = await clienteAxios.post('/archivos', formData)
        console.log(resultado)
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: (1000000) })

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
            <p className='font-bold text-lg'>{archivo.path}</p>
            <p className='text-gray-500 text-sm'>{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    const crearEnlace = () => {
        console.log("Creando enlnace")
    }

    return (
        <div className='p-4 md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 h-full'>

            {acceptedFiles.length > 0 ? (
                <div className='mt-10 w-full'>
                    <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    <button type='button' className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800' onClick={() => crearEnlace()}>
                        Crear enlnace
                    </button>
                </div>

            ) : (
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
            )}


        </div>
    )
}

export default Dropzone
