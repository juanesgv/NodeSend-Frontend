import { useContext } from "react";
import { AuthContext } from "@/context/auth/authState";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth