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
      <Link className="brand-link d-flex align-items-center p-3">
        <img 
          src="dist/img/AdminLTELogo.png" 
          alt="Logo" 
          className="brand-image img-circle elevation-2 mt-2" 
          style={{ opacity: '.8', width: '40px', height: '70px' }} 
        />
        <span className="brand-text font-weight-bold ml-2">Estudiante</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-3">
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <Link 
                to="/dashboard-estudiante" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-estudiante')}`}
              >
                <i className="nav-icon fas fa-th mr-2"></i>
                <p className="m-0">Vista General</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard-estudiante/asignaturas" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-estudiante/asignaturas')}`}
              >
                <i className="nav-icon fas fa-book mr-2"></i>
                <p className="m-0">Mis Cursos</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard-estudiante/calendario" 
                className={`nav-link rounded-lg mb-2 ${isActive('/dashboard-estudiante/calendario')}`}
              >
                <i className="nav-icon far fa-calendar-alt mr-2"></i>
                <p className="m-0">Calendario</p>
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