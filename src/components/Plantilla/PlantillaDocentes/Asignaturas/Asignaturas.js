import React from 'react';
import { Link } from 'react-router-dom';

const Asignaturas = () => {
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
                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
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
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Docente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through your asignaturas data */}
                  <tr>
                    <td data-label="ID">1</td>
                    <td data-label="Nombre">Matemáticas</td>
                    <td data-label="Docente">Juan Pérez</td>
                    <td data-label="Acciones">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-info me-2">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-warning me-2">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Asignaturas;