import React from "react";
import { Link } from "react-router-dom";

const Asistencias = () => {
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
                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
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
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-plus me-2"></i> Nueva Asistencia
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Estudiante</th>
                    <th>Asignatura</th>
                    <th>Estado</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Fecha">2024-03-20</td>
                    <td data-label="Estudiante">María García</td>
                    <td data-label="Asignatura">Física</td>
                    <td data-label="Estado">
                      <span className="badge bg-success">Presente</span>
                    </td>
                    <td data-label="Observaciones">Llegó puntual</td>
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

export default Asistencias;