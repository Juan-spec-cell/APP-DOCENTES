import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../../Axios/Axios";
import { UsuarioContext } from "../../../Contexto/usuario/UsuarioContext";
import {
  ListarCalificaciones,
  ListarAsignaturas,
  GuardarCalificacion,
  EditarCalificacion,
  EliminarCalificacion,
  ListarMatriculas,
  ListarActividades,
} from "../../../Configuracion/ApiUrls";
import CrearActividad from "../Asignaturas/AsignaturaActividad/Actividad";

const Calificaciones = () => {
  const [actividades, setActividades] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState("");
  const [actividadValor, setActividadValor] = useState("");
  const [calificaciones, setCalificaciones] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedAsignatura, setSelectedAsignatura] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useContext(UsuarioContext);
  const [formData, setFormData] = useState({
    nombre_estudiante: "",
    nombre_asignatura: "",
    nota: "",
    actividadId: "",
  });
  const [editingId, setEditingId] = useState(null);
  <div className="col-md-2">
    <div className="form-group">
      <label>ID Actividad</label>
      <input
        type="text"
        className="form-control"
        value={formData.actividadId}
        onChange={(e) =>
          setFormData({ ...formData, actividadId: e.target.value })
        }
        required
      />
    </div>
  </div>;

const fetchData = async () => {
  try {
    setLoading(true);
    const [asignaturasRes, matriculasRes, calificacionesRes] = await Promise.all([
      AxiosPublico.get(ListarAsignaturas),
      AxiosPublico.get(ListarMatriculas),
      AxiosPublico.get(ListarCalificaciones),
    ]);

    if (asignaturasRes.data && matriculasRes.data && calificacionesRes.data) {
      const docenteAsignaturas = asignaturasRes.data.datos.filter(
        (asignatura) => asignatura.nombre_docente === usuario.login
      );
      setAsignaturas(docenteAsignaturas);
      setMatriculas(matriculasRes.data.datos);

      const asignaturasNames = docenteAsignaturas.map((a) => a.nombre_asignatura);
      const filteredCalificaciones = calificacionesRes.data.datos.filter((cal) =>
        asignaturasNames.includes(cal.nombre_asignatura)
      );
      setCalificaciones(filteredCalificaciones);
    } else {
      setError("Error al cargar los datos");
    }
  } catch (err) {
    setError("Error al cargar los datos");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await AxiosPublico.put(`${EditarCalificacion}/${editingId}`, formData);
      } else {
        await AxiosPublico.post(GuardarCalificacion, formData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError("Error al guardar la calificación");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAsignaturaChange = async (e) => {
    const asignaturaId = parseInt(e.target.value);
    setSelectedAsignatura(asignaturaId);
    if (asignaturaId) {
      const asignatura = asignaturas.find((a) => a.id === asignaturaId);
      const estudiantesAsignatura = matriculas
        .filter((matricula) =>
          matricula.asignaturas.some((a) => a.id === asignaturaId)
        )
        .map((matricula) => ({
          id: matricula.id,
          nombre: matricula.nombre_estudiante,
        }));
      setEstudiantes(estudiantesAsignatura);
      setFormData((prev) => ({
        ...prev,
        nombre_asignatura: asignatura.nombre_asignatura,
      }));
  
      // Fetch actividades for the selected asignatura
      try {
        const response = await AxiosPublico.get(ListarActividades);
        if (response.data?.datos) {
          const actividadesFiltradas = response.data.datos.filter(
            (actividad) => actividad.nombre_asignatura.toLowerCase() === 
                           asignatura.nombre_asignatura.toLowerCase()
          );
          setActividades(actividadesFiltradas);
        } else {
          setActividades([]);
        }
      } catch (err) {
        console.error('Error fetching actividades:', err);
      }
    } else {
      setEstudiantes([]);
      setFormData((prev) => ({
        ...prev,
        nombre_asignatura: "",
        nombre_estudiante: "",
      }));
      setActividades([]);
    }
  };

  const handleActividadChange = (e) => {
    const actividadId = e.target.value;
    setSelectedActividad(actividadId);
    const actividad = actividades.find((a) => a.id === parseInt(actividadId));
    setActividadValor(actividad ? actividad.valor : "");
    setFormData((prev) => ({
      ...prev,
      actividadId: actividadId,
    }));
  };

  const resetForm = () => {
    setFormData({
      nombre_estudiante: "",
      nombre_asignatura: "",
      nota: "",
      actividadId: "",
    });
    setEditingId(null);
    setSelectedAsignatura("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar esta calificación?")) {
      return;
    }

    try {
      setLoading(true);
      await AxiosPublico.delete(`${EliminarCalificacion}/${id}`);
      fetchData();
    } catch (err) {
      setError("Error al eliminar la calificación");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Calificaciones</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">Calificaciones</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="close"
                onClick={() => setError(null)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {editingId ? "Editar Calificación" : "Nueva Calificación"}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Asignatura</label>
                      <select
                        className="form-control"
                        value={selectedAsignatura}
                        onChange={handleAsignaturaChange}
                        required
                      >
                        <option value="">Seleccione una asignatura</option>
                        {asignaturas.map((asignatura) => (
                          <option key={asignatura.id} value={asignatura.id}>
                            {asignatura.nombre_asignatura}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Estudiante</label>
                      <select
                        className="form-control"
                        value={formData.nombre_estudiante}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nombre_estudiante: e.target.value,
                          })
                        }
                        required
                        disabled={!selectedAsignatura}
                      >
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map((estudiante) => (
                          <option key={estudiante.id} value={estudiante.nombre}>
                            {estudiante.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Tipo Actividad</label>
                      <select
                        className="form-control"
                        value={selectedActividad}
                        onChange={handleActividadChange}
                        required
                      >
                        <option value="">Seleccione una actividad</option>
                        {actividades.map((actividad) => (
                          <option key={actividad.id} value={actividad.id}>
                            {actividad.tipo_actividad}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Valor Actividad</label>
                      <input
                        type="text"
                        className="form-control"
                        value={actividadValor}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Nota</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.nota}
                        onChange={(e) =>
                          setFormData({ ...formData, nota: e.target.value })
                        }
                        required
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      {editingId ? "Actualizar" : "Guardar"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={resetForm}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h3 className="card-title">Lista de Calificaciones</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th>Asignatura</th>
                        <th>Nota</th>
                        <th>ID Actividad</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calificaciones.map((calificacion) => (
                        <tr key={calificacion.id}>
                          <td>{calificacion.nombre_estudiante}</td>
                          <td>{calificacion.nombre_asignatura}</td>
                          <td>{calificacion.nota}</td>
                          <td>{calificacion.actividadId}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning mr-2"
                              onClick={() => {
                                const asignatura = asignaturas.find(
                                  (a) =>
                                    a.nombre_asignatura ===
                                    calificacion.nombre_asignatura
                                );
                                setFormData({
                                  nombre_estudiante:
                                    calificacion.nombre_estudiante,
                                  nombre_asignatura:
                                    calificacion.nombre_asignatura,
                                  nota: calificacion.nota,
                                  actividadId: calificacion.actividadId,
                                });
                                setSelectedAsignatura(asignatura?.id || "");
                                setEditingId(calificacion.id);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(calificacion.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calificaciones;
