import React from "react";

const Actividades = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Actividades Académicas</h3>
            <div className="card-tools">
              <button className="btn btn-success btn-sm">
                <i className="fas fa-plus"></i> Nueva Actividad
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="timeline">
              <div className="time-label">
                <span className="bg-red">Próximas Actividades</span>
              </div>
              <div>
                <i className="fas fa-tasks bg-blue"></i>
                <div className="timeline-item">
                  <span className="time">
                    <i className="fas fa-clock"></i> Fecha límite
                  </span>
                  <h3 className="timeline-header">Título de la actividad</h3>
                  <div className="timeline-body">
                    Descripción de la actividad...
                  </div>
                  <div className="timeline-footer">
                    <button className="btn btn-primary btn-sm">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividades;