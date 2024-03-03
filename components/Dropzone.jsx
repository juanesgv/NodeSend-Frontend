import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useAPP from '@/hooks/useApp'
import { Spinner } from '@chakra-ui/react'

const Dropzone = () => {

    const { mostrarAlerta, subirArchivo, cargando } = useAPP()

    const onDropRejected = () => {
        mostrarAlerta({
            titulo: "No fue posible cargar el archivo",
            descripcion: " El límite de tamaño es de 1 MB. Si creas una cuenta, podrás disfrutar de beneficios adicionales y aumentar este límite.",
            tipo: "error"
        })
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {

        //Crear un form-data
        const formData = new FormData()
        formData.append('archivo', acceptedFiles[0]) //acceptedFiles es un arreglo de archivos pero solo estoy permitiendo subir 1

        subirArchivo(formData, acceptedFiles[0].path)
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
                    {
                        cargando ? (
                            <div className='w-full flex flex-col gap-2 justify-center items-center my-5'>
                                <Spinner/>
                                <p className='text-gray-600'>Subiendo archivo...</p>
                            </div>
                        ) : (
                            <button type='button' className='bg-blue-700 w-full py-3 rounded-lg text-white my-5 hover:bg-blue-800' onClick={() => crearEnlace()}>
                                Crear enlace
                            </button>
                        )
                    }

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
