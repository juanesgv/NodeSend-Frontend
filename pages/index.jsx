import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Toast from "@/components/toast";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import Dropzone from "@/components/Dropzone";
import useAPP from "@/hooks/useApp";
import Alerta from "@/components/Alerta";

export default function Home() {

  const { usuarioAutenticado } = useAuth()
  const {mensaje_archivo } = useAPP()

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    <Layout>
      <Toast />
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {
          mensaje_archivo && <Alerta titulo={mensaje_archivo.titulo} descripcion={mensaje_archivo.descripcion} tipo={mensaje_archivo.tipo} />
        }
        
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-xl py-10 mt-4">
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <Dropzone/>
          </div>
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 mb-4">Comparte archivos de forma sencilla y privada</h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactNodeSend </span>
              te permite compartir archivos con cifrado de extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privadoy asegurarte de que tus cosas no permanezcan en línea para siempre.
            </p>
            <Link className="text-red-500 font-bold text-lg hover:text-red-700" href='/crear_cuenta'>
              Crea una cuenta para mayores beneficios
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
