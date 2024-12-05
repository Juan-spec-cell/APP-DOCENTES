import { createContext, useContext } from "react";
export const EstudianteContext = createContext();

export const useContextEstudiante = () => {
    return useContext(EstudianteContext);
}