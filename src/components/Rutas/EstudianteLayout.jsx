import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { mostraAlertaError } from "../SweetAlert/SweetAlert";
import { EstudianteState } from "../Contexto/estudiante/EstudianteState";
import { useContextUsuario } from "../Contexto/usuario/UsuarioContext";
import Estudiantes from '../Estudiantes/Estudiantes';

export const EstudianteLayout = () => {
  const outlet = useOutlet();
  const { usuario } = useContextUsuario();
  if (usuario.tipo !== "Estudiante") {
    mostraAlertaError("No tienes permitido acceder a este sitio");
    return <Navigate to="/" />;
  }
  return (
    <EstudianteState>
      <Estudiantes />
    </EstudianteState>
  );
};