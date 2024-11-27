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
    const estudiantesUnicos = new Set();
    asignaturas.forEach((asignatura) => {
      matriculas.forEach((matricula) => {
        if (matricula.asignaturas.some((a) => a.id === asignatura.id)) {
          estudiantesUnicos.add(matricula.id);
        }
      });
    });
    return estudiantesUnicos.size;
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          {/* Vista General Section */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="mb-4">Vista General</h2>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{asignaturas.length}</h3>
                  <p>Asignaturas Totales</p>
                </div>
                <div className="icon">
                  <i className="fas fa-book"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{getTotalEstudiantes()}</h3>
                  <p>Estudiantes Totales</p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>5</h3>
                  <p>Actividades Pendientes</p>
                </div>
                <div className="icon">
                  <i className="fas fa-tasks"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>10</h3>
                  <p>Evaluaciones</p>
                </div>
                <div className="icon">
                  <i className="fas fa-clipboard-check"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Asignaturas Section */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="mb-4">Mis Asignaturas</h2>
            </div>
          </div>

          <div className="row">
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              </div>
            ) : (
              asignaturas.map((asignatura) => (
                <div key={asignatura.id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="m-0">{asignatura.nombre_asignatura}</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="card-text mb-0">
                          <i className="fas fa-user-tie mr-2"></i>
                          {asignatura.nombre_docente}
                        </p>
                        <span className="badge badge-primary">
                          <i className="fas fa-users mr-1"></i>
                          {getEstudiantesCount(asignatura.id)} Estudiantes
                        </span>
                      </div>
                      <Link
                        to={`/dashboard-docente/asignaturas/${asignatura.id}`}
                        className="btn btn-info btn-block"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && !error && asignaturas.length === 0 && (
            <div className="alert alert-info">
              <i className="fas fa-info-circle mr-2"></i>
              No hay asignaturas asignadas actualmente.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
