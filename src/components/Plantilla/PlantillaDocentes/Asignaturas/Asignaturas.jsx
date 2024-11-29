import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AxiosPublico } from '../../../Axios/Axios';
import { ListarAsignaturas } from '../../../Configuracion/ApiUrls';
import { UsuarioContext } from '../../../Contexto/usuario/UsuarioContext';

const Asignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    const fetchAsignaturas = async () => {
      try {
        const response = await AxiosPublico.get(ListarAsignaturas);
        const userAsignaturas = response.data.datos.filter(
          asignatura => asignatura.nombre_docente === usuario.login
        );
        setAsignaturas(userAsignaturas);
      } catch (error) {
        setError('Error al cargar las asignaturas');
      } finally {
        setLoading(false);
      }
    };

    fetchAsignaturas();
  }, [usuario]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-12 col-sm-6">
              <h1 className="m-0 text-center text-sm-start">Asignaturas</h1>
            </div>
            <div className="col-12 col-sm-6 mt-2 mt-sm-0">
              <ol className="breadcrumb float-sm-end justify-content-center justify-content-sm-end">
                <li className="breadcrumb-item"><Link to="/dashboard-docente">Home</Link></li>
                <li className="breadcrumb-item active">Asignaturas</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Lista de Asignaturas</h3>
            </div>
            <div className="card-body table-responsive p-0">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger m-3">{error}</div>
              ) : (
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Asignatura</th>
                      <th>Docente</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignaturas.map((asignatura) => (
                      <tr key={asignatura.id}>
                        <td>{asignatura.id}</td>
                        <td>{asignatura.nombre_asignatura}</td>
                        <td>{asignatura.nombre_docente}</td>
                        <td>
                          <Link 
                            to={`/dashboard-docente/asignaturas/${asignatura.id}`}
                            className="btn btn-sm btn-info"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Asignaturas;