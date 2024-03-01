import React from "react";
import Head from "next/head";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>NodeSend</title>
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="mt-20">{children}</main>
        </div>
      </div>

      <ToastContainer/>
    </>
  );
};

export default Layout;
