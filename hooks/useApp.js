import { useContext } from "react";
import { AppContext } from "@/context/app/appState";

const useAuth = () => {
    return useContext(AppContext)
}

export default useAuth