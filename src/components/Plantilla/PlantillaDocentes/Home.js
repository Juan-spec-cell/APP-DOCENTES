import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../Axios/Axios";
import {
  ListarAsignaturas,
  ListarMatriculas,
} from "../../Configuracion/ApiUrls";
import { UsuarioContext } from "../../Contexto/usuario/UsuarioContext";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [error, setError] = useState(null);
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [asignaturasRes, matriculasRes] = await Promise.all([
          AxiosPublico.get(ListarAsignaturas),
          AxiosPublico.get(ListarMatriculas),
        ]);

        const userAsignaturas = asignaturasRes.data.datos.filter(
          (asignatura) => asignatura.nombre_docente === usuario.login
        );

        setAsignaturas(userAsignaturas);
        setMatriculas(matriculasRes.data.datos);
      } catch (error) {
        setError("Error al cargar los datos. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuario]);

  const getEstudiantesCount = (asignaturaId) => {
    return matriculas.filter((matricula) =>
      matricula.asignaturas.some((a) => a.id === asignaturaId)
    ).length;
  };

  const getTotalEstudiantes = () => {
    let totalEstudiantes = 0;
  
    asignaturas.forEach((asignatura) => {
      const estudiantesEnAsignatura = matriculas.filter((matricula) =>
        matricula.asignaturas.some((a) => a.id === asignatura.id)
      ).length;
      totalEstudiantes += estudiantesEnAsignatura;
    });
  
    return totalEstudiantes;
  };

  return (
    <div className="content-wrapper">
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          {/* Vista General Section */}
          <div className="row g-4 mb-4">
            <div className="col-12">
              <h2 className="h2 fw-bold mb-4">Vista General</h2>
            </div>
            
            <div className="col-6 col-md-6 col-lg-3">
              <div className="small-box bg-info rounded-3 h-100 position-relative overflow-hidden">
                <div className="inner p-3">
                  <h3 className="h2 fw-bold mb-2">{asignaturas.length}</h3>
                  <p className="mb-0">Asignaturas Totales</p>
                </div>
                <div className="icon position-absolute end-0 top-0 p-3 opacity-25 fs-1">
                  <i className="fas fa-book"></i>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="small-box bg-success rounded-3 h-100 position-relative overflow-hidden">
                <div className="inner p-3">
                  <h3 className="h2 fw-bold mb-2">{getTotalEstudiantes()}</h3>
                  <p className="mb-0">Estudiantes Totales</p>
                </div>
                <div className="icon position-absolute end-0 top-0 p-3 opacity-25 fs-1">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="small-box bg-warning rounded-3 h-100 position-relative overflow-hidden">
                <div className="inner p-3">
                  <h3 className="h2 fw-bold mb-2">5</h3>
                  <p className="mb-0">Actividades Pendientes</p>
                </div>
                <div className="icon position-absolute end-0 top-0 p-3 opacity-25 fs-1">
                  <i className="fas fa-tasks"></i>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="small-box bg-danger rounded-3 h-100 position-relative overflow-hidden">
                <div className="inner p-3">
                  <h3 className="h2 fw-bold mb-2">10</h3>
                  <p className="mb-0">Evaluaciones</p>
                </div>
                <div className="icon position-absolute end-0 top-0 p-3 opacity-25 fs-1">
                  <i className="fas fa-clipboard-check"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Asignaturas Section */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="h2 fw-bold mb-4">Mis Asignaturas</h2>
            </div>
          </div>

          <div className="row gy-4">
            {loading ? (
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              asignaturas.map((asignatura) => (
                <div key={asignatura.id} className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card h-100 shadow-sm hover-card">
                    <div className="card-header bg-success bg-opacity-10 py-2 px-3">
                      <h5 className="text-truncate w-100 fs-1">{asignatura.nombre_asignatura}</h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">
                        <p className="card-text mb-2 mb-sm-0 text-truncate">
                          <i className="fas fa-user-tie me-2"></i>
                          {asignatura.nombre_docente}
                        </p>
                        <span className="badge bg-primary">
                          <i className="fas fa-users me-1"></i>
                          {getEstudiantesCount(asignatura.id)} Estudiantes
                        </span>
                      </div>
                      <Link
                        to={`/dashboard-docente/asignaturas/${asignatura.id}`}
                        className="btn btn-info mt-auto"
                      >
                        <i className="fas fa-eye me-2"></i>
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && !error && asignaturas.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="fas fa-info-circle me-2"></i>
              <div>No hay asignaturas asignadas actualmente.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
