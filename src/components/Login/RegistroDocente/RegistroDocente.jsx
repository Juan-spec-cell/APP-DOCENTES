import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../../../assets/images/fondo.jpg";
import { CrearDocente } from "../../Configuracion/ApiUrls";
import { AxiosPublico } from "../../Axios/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  mostraAlerta,
  mostraAlertaOK,
  mostraAlertaError,
} from "../../SweetAlert/SweetAlert";
import zxcvbn from "zxcvbn";

const RegistroDocente = () => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones para nombres y apellidos
    if (
      [
        "primerNombre",
        "segundoNombre",
        "primerApellido",
        "segundoApellido",
      ].includes(name)
    ) {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
      if (!regex.test(value)) {
        mostraAlerta(
          "Solo se permiten letras y espacios en este campo.",
          "warning"
        );
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
    if (name === "contrasena") evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (
      !formData.primerNombre ||
      !formData.primerApellido ||
      !formData.email ||
      !formData.contrasena
    ) {
      mostraAlerta(
        "Por favor, complete todos los campos obligatorios.",
        "warning"
      );
      return;
    }
  
    // Validar contraseña
    if (formData.contrasena.length < 6) {
      mostraAlerta(
        "La contraseña debe tener al menos 6 caracteres.",
        "warning"
      );
      return;
    }
  
    if (formData.contrasena !== formData.confirmarContrasena) {
      mostraAlerta(
        "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.",
        "warning"
      );
      return;
    }
  
    const formDataConId = {
      primerNombre: formData.primerNombre,
      segundoNombre: formData.segundoNombre,
      primerApellido: formData.primerApellido,
      segundoApellido: formData.segundoApellido,
      email: formData.email,
      contrasena: formData.contrasena,
    };
  
    setLoading(true);
    try {
      const response = await AxiosPublico.post(CrearDocente, formDataConId);
      if (response.data && response.data.id) {
        mostraAlertaOK("Docente guardado correctamente", "success");
        navigate("/crear-asignaturas", {
          state: { docenteId: response.data.id },
        });
      } else {
        setError(
          "Error al guardar el docente. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        mostraAlerta(
          "Ya existe un docente o usuario con ese correo electrónico.",
          "warning"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      className="registro-docente-container d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div
        className="registro-docente-box p-4 rounded shadow"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
      >
        <h2 className="text-center mb-4">Registro de Docente</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Primer Nombre"
                  name="primerNombre"
                  value={formData.primerNombre}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Segundo Nombre"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Primer Apellido"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Segundo Apellido"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group position-relative">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Contraseña"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "40px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirmar Contraseña"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "40px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              {formData.contrasena && (
                <div className="form-group">
                  <div className="progress">
                    <div
                      className={`progress-bar ${
                        passwordStrength < 2
                          ? "bg-danger"
                          : passwordStrength < 4
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                      role="progressbar"
                      style={{ width: `${(passwordStrength + 1) * 20}%` }}
                      aria-valuenow={(passwordStrength + 1) * 20}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small className="form-text text-muted">
                    {passwordStrength < 2
                      ? "Contraseña débil"
                      : passwordStrength < 4
                      ? "Contraseña aceptable"
                      : "Contraseña fuerte"}
                  </small>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              style={{ width: "800px" }}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
            <span className="text-muted mb-2">- OR -</span>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary"
              style={{ width: "800px" }}
            >
              Volver al Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroDocente;