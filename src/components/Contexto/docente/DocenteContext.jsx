import { createContext, useContext } from "react";
export const DocenteContext = createContext();

export const useContextEmpleado=()=>{
    return useContext(DocenteContext);
}