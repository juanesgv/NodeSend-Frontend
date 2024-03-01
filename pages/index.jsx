import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Alerta from "@/components/Alerta";
import useAuth from "@/hooks/useAuth";

export default function Home() {

  const {usuarioAutenticado} = useAuth()

  useEffect(()=>{
    usuarioAutenticado()
  },[])

  return (
    <Layout>
      <Alerta/>
      <h1>Hola</h1>
    </Layout>
  );
}
