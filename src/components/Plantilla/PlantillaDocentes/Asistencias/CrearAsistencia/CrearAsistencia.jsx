import React, { useState, useEffect } from "react";
import { AxiosPublico } from "../../Axios/Axios";
import { ListarAsignaturas, ListarEstudiantes, GuardarAsistencia } from "../../Configuracion/ApiUrls";

const CrearAsistencia = () => {
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
              <h1 className="m-0 text-center text-sm-start">Crear Asistencia</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Nueva Asistencia</h3>
            </div>
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrearAsistencia;