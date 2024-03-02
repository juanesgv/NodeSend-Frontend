import "@/styles/globals.css";
import AuthState from "@/context/auth/authState";
import AppState from "@/context/app/appState";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthState>
        <AppState>
          <Component {...pageProps} />
        </AppState>
      </AuthState>
    </ChakraProvider>
  )
}
