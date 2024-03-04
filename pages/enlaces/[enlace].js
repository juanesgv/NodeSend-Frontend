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
    console.log(enlace.archivo)
    return(
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex items-center justify-center mt-10">
                <a 
                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                    className="bg-red-500 text-center px-10 py-3 text-white rounded uppercase font-bold cursor-pointer"
                    download
                >
                    Aquí
                </a>
            </div>
        </Layout>
    )
}