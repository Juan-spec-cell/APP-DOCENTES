import React, { useEffect, useReducer, useState } from "react"
import { DocenteContext } from "./DocenteContext"
import { AxiosPrivado } from "../../Axios/Axios";
import { ListarAsistencias, ListarEstudiantes } from "../../Configuracion/ApiUrls";
import { useContextUsuario } from "../usuario/UsuarioContext";

export const DocenteState = (props) => {
    const { token } = useContextUsuario();
    const [docente, setDocente] = useState(null);
    const [listaEstudiantes, setListaEstudiantes] = useState([]);
    const [listaAsistencias, setListaAsistencias] = useState([]);
    const [listaAsignaturas, setListaAsignaturas] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    useEffect(()=>{
        Lista();
    },[]);
    const Lista = async () => {
        try {
            ActualizarLista(ListarEstudiantes, setListaEstudiantes);
            ActualizarLista(ListarAsistencias, setListaAsistencias);
          } catch (error) {
            console.log(error);
          }
    };
    const ActualizarLista = async (url, setDatos) => {
        AxiosPrivado.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            await AxiosPrivado.get(url)
            .then((respuesta)=>{
                setDatos(respuesta.data);
            });
          } catch (error) {
            console.log(error);
        }
    }

    return (
        <DocenteContext.Provider value={{
            docente: docente,
            listaAsignaturas: listaAsignaturas,
            listaEstudiantes: listaEstudiantes,
            listaAsistencias: listaAsistencias,
            actualizar,
            setActualizar,
            setDocente,
            setListaAsignaturas,
            setListaAsistencias,
            setListaEstudiantes,
            Lista,
            ActualizarLista
        }}>
            {props.children}
        </DocenteContext.Provider>
    )
}