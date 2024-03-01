import { 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    LIMPIAR_ALETRTA
} from "@/types"

export default (state, action) => {
    switch(action.type){

        case REGISTRO_EXITOSO:
            return{
                ...state,
                mensaje: action.payload
            }

        case REGISTRO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }    
            
        case LIMPIAR_ALETRTA:
            return{
                ...state,
                mensaje: null
            }
            
        default:
            return state
    }
}