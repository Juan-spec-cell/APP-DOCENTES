import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { mostraAlertaError } from "../SweetAlert/SweetAlert";
import { DocenteState } from "../Contexto/docente/DocenteState";
import { useContextUsuario } from "../Contexto/usuario/UsuarioContext";
import Docentes from '../Docentes/Docentes';

export const DocenteLayout = () => {
  const outlet = useOutlet();
  const { usuario } = useContextUsuario();
  if (usuario.tipo !== "Docente") {
    mostraAlertaError("No tienes permitido acceder a este sitio");
    return <Navigate to="/" />;
  }
  return (
    <DocenteState>
      <Docentes />
    </DocenteState>
  );
};