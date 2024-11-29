import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../../Axios/Axios";
import { ListarAsistencias, ListarAsignaturas, ListarEstudiantes, GuardarAsistencia } from "../../../Configuracion/ApiUrls";

const Asistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre_estudiante: "",
    apellido_estudiante: "",
    nombre_asignatura: "",
    fecha: "",
    estado: "",
    estudianteId: "",
    asignaturaId: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [asistenciasResponse, asignaturasResponse, estudiantesResponse] = await Promise.all([
          AxiosPublico.get(ListarAsistencias),
          AxiosPublico.get(ListarAsignaturas),
          AxiosPublico.get(ListarEstudiantes)
        ]);
        setAsistencias(asistenciasResponse.data.datos);
        setAsignaturas(asignaturasResponse.data.datos);
        setEstudiantes(estudiantesResponse.data.datos);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosPublico.post(GuardarAsistencia, formData);
      if (response.data.tipo === 1) {
        setAsistencias([...asistencias, response.data.datos]);
        setShowForm(false);
        setFormData({
          nombre_estudiante: "",
          apellido_estudiante: "",
          nombre_asignatura: "",
          fecha: "",
          estado: "",
          estudianteId: "",
          asignaturaId: ""
        });
      } else {
        setError("Error al guardar la asistencia");
      }
    } catch (error) {
      setError("Error al guardar la asistencia");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-12 col-sm-6">
              <h1 className="m-0 text-center text-sm-start">Asistencias</h1>
            </div>
            <div className="col-12 col-sm-6 mt-2 mt-sm-0">
              <ol className="breadcrumb float-sm-end justify-content-center justify-content-sm-end">
                <li className="breadcrumb-item"><Link to="/dashboard-docente">Home</Link></li>
                <li className="breadcrumb-item active">Asistencias</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="card-title mb-2 mb-sm-0">Control de Asistencias</h3>
                <div className="card-tools">
                  <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus me-2"></i> Nueva Asistencia
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {showForm && (
                <div className="mb-4">
                  <h4>Crear Nueva Asistencia</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Asignatura</label>
                      <select
                        name="asignaturaId"
                        className="form-control"
                        value={formData.asignaturaId}
                        onChange={handleChange}
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
                    <div className="form-group">
                      <label>Estudiante</label>
                      <select
                        name="estudianteId"
                        className="form-control"
                        value={formData.estudianteId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map((estudiante) => (
                          <option key={estudiante.id} value={estudiante.id}>
                            {estudiante.nombre_estudiante} {estudiante.apellido_estudiante}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fecha</label>
                      <input
                        type="date"
                        name="fecha"
                        className="form-control"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select
                        name="estado"
                        className="form-control"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione un estado</option>
                        <option value="Presente">Presente</option>
                        <option value="Ausente">Ausente</option>
                        <option value="Tardanza">Tardanza</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Guardar Asistencia
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                      Cancelar
                    </button>
                  </form>
                </div>
              )}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id}>
                      <td>{asistencia.id}</td>
                      <td>{asistencia.nombre}</td>
                      <td>{asistencia.fecha}</td>
                      <td>
                        <button className="btn btn-sm btn-warning">Editar</button>
                        <button className="btn btn-sm btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Asistencias;