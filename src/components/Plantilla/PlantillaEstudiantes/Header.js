import React, { useContext } from "react";
import { UsuarioContext } from "../../Contexto/usuario/UsuarioContext"; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Puedes usar Link para navegación sin recargar la página

const Header = () => {
  const { usuario, setCerrarSesion } = useContext(UsuarioContext);

  const handleLogout = () => {
    setCerrarSesion();
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Menú izquierdo */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">
            Inicio
          </a>
        </li>
      </ul>

      {/* Menú derecho */}
      <ul className="navbar-nav ml-auto">
        {/* Si el usuario está logueado, mostrar su nombre */}
        <li className="nav-item">
        <a className="nav-link" href="#">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            {usuario && usuario.login
              ? `Bienvenido, ${usuario.login}` // Usamos el campo 'login' que contiene el nombre completo
              : 'Invitado'}
          </a>
        </li>
        {/* Mostrar botón de cerrar sesión si el usuario está logueado */}
        {usuario && usuario.primerNombre && usuario.primerApellido && (
          <li className="nav-item">
            <Link className="nav-link" to="#" onClick={handleLogout}>
              Cerrar sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
