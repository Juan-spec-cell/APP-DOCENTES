import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosPublico } from "../../Axios/Axios";
import { CrearAsignatura, ListarCarreras } from "../../Configuracion/ApiUrls";
import { mostraAlertaOK, mostraAlertaError } from "../../SweetAlert/SweetAlert";
import fondo from "../../../assets/images/fondo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const CrearAsignaturas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { docenteId } = location.state;
  const [asignatura, setAsignatura] = useState("");
  const [carreraId, setCarreraId] = useState("");
  const [carreras, setCarreras] = useState([]);
  const [asignaturasAsignadas, setAsignaturasAsignadas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await AxiosPublico.get(ListarCarreras);
        setCarreras(response.data.datos);
      } catch (error) {
        console.error("Error al cargar las carreras:", error);
        mostraAlertaError("Error al cargar las carreras", "error");
      }
    };
    fetchCarreras();
  }, []);

  const handleChange = (e) => {
    setAsignatura(e.target.value);
  };

  const handleCarreraChange = (e) => {
    setCarreraId(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosPublico.post(CrearAsignatura, {
        docenteId,
        nombre: asignatura,
        carreraId,
      });
      if (response.data) {
        mostraAlertaOK("Asignatura guardada correctamente", "success");
        setAsignaturasAsignadas([...asignaturasAsignadas, { nombre: asignatura, carreraId }]);
        setAsignatura("");
        setCarreraId("");
      } else {
        mostraAlertaError("Error al guardar la asignatura", "error");
      }
    } catch (error) {
      console.error("Error al guardar la asignatura:", error);
      mostraAlertaError("Error al guardar la asignatura", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeAsignatura = (index) => {
    setAsignaturasAsignadas(asignaturasAsignadas.filter((_, i) => i !== index));
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div
      className="registro-estudiante-container d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div
        className="registro-estudiante-box p-4 rounded shadow"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
      >
        <h2 className="text-center mb-4">Crear Asignaturas para el Docente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group position-relative">
            <input
              type="number"
              className="form-control"
              placeholder="ID del Docente"
              value={docenteId}
              disabled
            />
          </div>
          <div className="form-group position-relative">
            <select
              className="form-control"
              value={carreraId}
              onChange={handleCarreraChange}
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera.id} value={carrera.id}>
                  {carrera.nombre_carrera}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group position-relative d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la Asignatura"
              value={asignatura}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary ml-2"
              disabled={loading}
            >
              {loading ? "Guardando..." : <FontAwesomeIcon icon={faPlus} />}
            </button>
          </div>
        </form>
        {asignaturasAsignadas.length > 0 && (
          <div className="mt-4">
            <h4>Asignaturas Asignadas</h4>
            <ul className="list-group">
              {asignaturasAsignadas.map((asignatura, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {asignatura.nombre} - {carreras.find(c => c.id === asignatura.carreraId)?.nombre_carrera}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeAsignatura(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          className="btn btn-secondary mt-4"
          onClick={handleBackToLogin}
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default CrearAsignaturas;