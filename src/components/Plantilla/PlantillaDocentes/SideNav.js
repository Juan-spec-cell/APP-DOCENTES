import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../../Contexto/usuario/UsuarioContext';
import { mostraAlertaPregunta } from '../../SweetAlert/SweetAlert';

const SideNav = () => {
  const { usuario, setCerrarSesion } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    mostraAlertaPregunta(
      (confirmed) => {
        if (confirmed) {
          localStorage.removeItem('token');
          setCerrarSesion();
          navigate('/');
        }
      },
      '¿Está seguro que desea cerrar sesión?',
      'question'
    );
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active bg-white text-dark' : '';
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link  className="brand-link d-flex align-items-center p-3">
        <img 
          src="dist/img/AdminLTELogo.png" 
          alt="Logo" 
          className="brand-image img-circle elevation-2" 
        />
        <span className="brand-text font-weight-bold ml-2">Docentes</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-3">
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <Link 
                to="/dashboard-docente" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-docente')}`}
              >
                <i className="nav-icon fas fa-th mr-2"></i>
                <p className="m-0">Vista General</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard-docente/asignaturas" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-docente/asignaturas')}`}
              >
                <i className="nav-icon fas fa-book mr-2"></i>
                <p className="m-0">Asignaturas</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard-docente/calificaciones" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-docente/calificaciones')}`}
              >
                <i className="nav-icon fas fa-graduation-cap mr-2"></i>
                <p className="m-0">Gestión de calificaciones</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard-docente/asistencias" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-docente/asistencias')}`}
              >
                <i className="nav-icon fas fa-calendar-check mr-2"></i>
                <p className="m-0">Asistencias</p>
              </Link>
            </li>
            
            <li className="nav-item mt-5 border-top pt-3">
              <a href="#" onClick={handleLogout} className="nav-link rounded-lg">
                <i className="nav-icon fas fa-sign-out-alt mr-2"></i>
                <p className="m-0">Cerrar Sesión</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNav;