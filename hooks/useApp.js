import { useContext } from "react";
import { AppContext } from "@/context/app/appState";

const useAPP = () => {
    return useContext(AppContext)
}

export default useAPP