import { 
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_ALETRTA,
    MOSTRAR_ALETRTA,
    OCULTAR_ALETRTA
} from "@/types";

export default (state, action) => {
    switch (action.type){

        case MOSTRAR_ALETRTA:
            return{
                ...state,
                mensaje_archivo: action.payload
            }

        case OCULTAR_ALETRTA:
            return{
                ...state,
                mensaje_archivo:null
            }

        default:
            return state
    }
}