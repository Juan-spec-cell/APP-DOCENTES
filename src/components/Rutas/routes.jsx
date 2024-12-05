import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Login
import Login from "../Login/Login";
import RecuperarContrasena from "../Login/RecuperarContrasena/RecuperarContrasena";
import RegistroEstudiante from "../Login/RegistroEstudiante/RegistroEstudiante";
import { AutenticacionRoute } from "./AutenticacionRoute";
import MatriculaEstudiante from "../Login/MatriculaEstudiante/MatriculaEstudiante";
import RegistroDocente from "../Login/RegistroDocente/RegistroDocente";
import CrearAsignatura from "../Login/AsignaturaDocente/CrearAsignatura";  
// Docentes
import HomeDocente from "../Plantilla/PlantillaDocentes/Home";
import Asignaturas from "../Plantilla/PlantillaDocentes/Asignaturas/Asignaturas";
import Calificaciones from "../Plantilla/PlantillaDocentes/Calificaciones/Calificaciones";
import Asistencias from "../Plantilla/PlantillaDocentes/Asistencias/Asistencias";
import AsignaturaDetalle from "../Plantilla/PlantillaDocentes/Asignaturas/AsignaturaDetalle/AsignaturaDetalle";
// Estudiantes 
import HomeEstudiante from "../Plantilla/PlantillaEstudiantes/Home";
import AsignaturasEstudiante from "../Plantilla/PlantillaEstudiantes/Asignaturas/Asignaturas";
import AsignaturaDetalleEstudiante from "../Plantilla/PlantillaEstudiantes/Asignaturas/AsignaturaDetalle/AsignaturaDetalle";
import CalendarioEstudiante from "../Plantilla/PlantillaEstudiantes/Calendario/Calendario";

// Importa DocenteLayout y EstudianteLayout
import { DocenteLayout } from '../Rutas/DocenteLayout';
import { EstudianteLayout } from '../Rutas/EstudianteLayout';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
      <Route path="/registro-matricula" element={<MatriculaEstudiante />} />
      <Route path="/registro-docente" element={<RegistroDocente />} />
      <Route path="/crear-asignaturas" element={<CrearAsignatura />} />

      {/* Protected Routes */}
      <Route element={<AutenticacionRoute />}>
        <Route path="/dashboard-docente" element={<DocenteLayout />}>
          <Route index element={<HomeDocente />} />
          <Route path="asignaturas" element={<Asignaturas />} />
          <Route path="asignaturas/:id" element={<AsignaturaDetalle />} />
          <Route path="calificaciones" element={<Calificaciones />} />
          <Route path="asistencias" element={<Asistencias />} />
        </Route>
      </Route>
      <Route element={<AutenticacionRoute />}>
        <Route path="/dashboard-estudiante" element={<EstudianteLayout />}>
          <Route index element={<HomeEstudiante />} />
          <Route path="asignaturas" element={<AsignaturasEstudiante />} />
          <Route path="asignaturas/:id" element={<AsignaturaDetalleEstudiante />} />
          <Route path="calendario" element={<CalendarioEstudiante />} />
        </Route>
      </Route>
    </Route>
  )
);