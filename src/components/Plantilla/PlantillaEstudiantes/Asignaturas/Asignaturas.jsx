import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosPublico } from "../../../Axios/Axios";
import { useSessionStorage } from "../../../Contexto/storage/useSessionStorage";
import { ListarMatriculas } from "../../../Configuracion/ApiUrls"; // Asegúrate de que la ruta sea correcta

const Asignaturas = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);
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
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Asignatura</th>
                    <th>Nombre Docente</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturas.map((asignatura) => (
                    <tr key={asignatura.id}>
                      <td>{asignatura.id}</td>
                      <td>{asignatura.nombre_asignatura}</td>
                      <td>{asignatura.docente_nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Asignaturas;