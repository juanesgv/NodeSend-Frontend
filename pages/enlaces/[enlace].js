import Layout from "@/components/Layout";
import clienteAxios from "@/config/axios";
import { useState } from "react";
import { toast } from 'react-toastify';

//respuesta que vamos a obtener
export async function getStaticProps({ params }) {
  const { enlace } = params;
//   console.log("enlace actual", enlace);
  const resultado = await clienteAxios.get(`/enlaces/${enlace}`);

  return {
    props: {
      enlace: resultado.data,
    },
  };
}

//routing, obtiene todos los enlaces disponibles
export async function getStaticPaths() {
  const enlace = await clienteAxios.get("/enlaces");

  return {
    paths: enlace.data.enlaces.map((e) => ({
      params: { enlace: e.url }, //enlace es el routing dínamico
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {
  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState('');
//   console.log(enlace)

  const verificarPassword = async (e) => {
    e.preventDefault();
    
    const data = {password}

    try {
      const resultado = await clienteAxios.post(`enlaces/${enlace.enlace}`, data);
      console.log(resultado.data.msg);
      setTienePassword(false)
      toast.success("Contraseña correcta")
    } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
    }
    
  };

  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace está asegurado con una contraseña. Por favor, ingrésala
            a continuación:
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar contraseña"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center px-10 py-3 text-white rounded uppercase font-bold cursor-pointer"
              download
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
