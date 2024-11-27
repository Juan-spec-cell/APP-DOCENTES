import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../Axios/Axios";
import { ListarAsignaturas } from "../../Configuracion/ApiUrls";
import { UsuarioContext } from "../../Contexto/usuario/UsuarioContext";

const Home = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    const fetchAsignaturas = async () => {
      try {
        // Filter by user type and name
        const response = await AxiosPublico.get(
          `${ListarAsignaturas}?tipo=${usuario.tipo}&nombre=${usuario.primerNombre}&apellido=${usuario.primerApellido}`
        );
        
        if (response.data.tipo === 1) {
          setAsignaturas(response.data.datos);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching asignaturas:", error);
        setLoading(false);
      }
    };

    if (usuario?.tipo) {
      fetchAsignaturas();
    }
  }, [usuario]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Vista General</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/dashboard-docente">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              </div>
            ) : (
              asignaturas.map((asignatura) => (
                <div key={asignatura.id} className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card">
                    <div className="card-header bg-info">
                      <h3 className="card-title">{asignatura.nombre_asignatura}</h3>
                      {asignatura.nombre_docente && (
                        <small className="d-block text-white">
                          Docente: {asignatura.nombre_docente}
                        </small>
                      )}
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <i className="fas fa-calendar mr-2"></i>
                          <span>Fecha Creación</span>
                        </div>
                        <span className="badge badge-secondary">{asignatura.fecha_creacion}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <i className="fas fa-users mr-2"></i>
                          <span>Estudiantes</span>
                        </div>
                        <span className="badge badge-primary">30</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <i className="fas fa-chart-line mr-2"></i>
                          <span>Promedio General</span>
                        </div>
                        <span className="badge badge-success">85%</span>
                      </div>
                      <div className="progress mb-3">
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{width: '85%'}}
                          aria-valuenow="85" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
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

          {!loading && asignaturas.length === 0 && (
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