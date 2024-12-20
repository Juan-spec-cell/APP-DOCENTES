import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../Axios/Axios";
import { useSessionStorage } from "../../Contexto/storage/useSessionStorage";
import { ListarMatriculas } from "../../Configuracion/ApiUrls"; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [error, setError] = useState(null);
  const [storedEmail] = useSessionStorage("userEmail", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosPublico.get(ListarMatriculas); // Asegúrate de que la ruta sea correcta
        const data = response.data.datos;

        const userMatriculas = data.filter(
          (matricula) => matricula.email === storedEmail
        );

        const userAsignaturas = userMatriculas.flatMap((matricula) => matricula.asignaturas);

        setAsignaturas(userAsignaturas);
        setMatriculas(userMatriculas);
      } catch (error) {
        setError("Error al cargar los datos. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storedEmail]);

  return (
    <div className="content-wrapper">
      <section className="content py-4">
        <div className="container-fluid px-3 px-md-4">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="h2 fw-bold mb-4">Asignaturas Matriculadas</h2>
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
                          <strong>Docente:</strong> {asignatura.docente_nombre}
                        </p>
                      </div>
                      <Link
                        to={`/dashboard-estudiante/asignaturas/${asignatura.id}`}
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
              <div>No hay asignaturas matriculadas actualmente.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;