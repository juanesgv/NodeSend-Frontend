import Layout from "@/components/Layout";
import clienteAxios from "@/config/axios";

//respuesta que vamos a obtener
export async function getStaticProps({params}) {

    const {enlace} = params
    console.log("enlace actual",enlace)
    const resultado = await clienteAxios.get(`/enlaces/${enlace}`)

    return{
        props : {
            enlace: resultado.data
        }
    }
}

//routing, obtiene todos los enlaces disponibles
export async function getStaticPaths() {
    const enlace = await clienteAxios.get('/enlaces')

    return{
        paths : enlace.data.enlaces.map(e => ({
            params : {enlace: e.url} //enlace es el routing dínamico
        })),
        fallback: false
    }
}

export default ({enlace}) =>{
    console.log(enlace)
    return(
        <Layout>
            <h1>Desde enlace.js</h1>
        </Layout>
    )
}