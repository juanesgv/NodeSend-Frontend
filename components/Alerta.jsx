import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'

const Alerta = ({ tipo, titulo, descripcion }) => {

    return (
        <Alert status={tipo} variant='left-accent'>
            <AlertIcon />
            <div>
                <AlertTitle>
                    {titulo}
                </AlertTitle>
                <AlertDescription>
                    {descripcion}
                </AlertDescription>
            </div>
        </Alert>
    )
}

export default Alerta
