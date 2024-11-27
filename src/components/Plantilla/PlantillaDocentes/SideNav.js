import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Docentes</span>
      </a>

      <div className="sidebar">
        <nav className="mt-4">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li className="nav-item my-1">
              <Link to="/dashboard-docente" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Vista General</p>
              </Link>
            </li>
            <li className="nav-item my-1">
              <Link to="/dashboard-docente/asignaturas" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Asignaturas</p>
              </Link>
            </li>
            <li className="nav-item my-1">
              <Link to="/dashboard-docente/calificaciones" className="nav-link">
                <i className="nav-icon fas fa-graduation-cap"></i>
                <p>Gestión de calificaciones</p>
              </Link>
            </li>
            <li className="nav-item my-1">
              <Link to="/dashboard-docente/asistencias" className="nav-link">
                <i className="nav-icon fas fa-calendar-check"></i>
                <p>Asistencias</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNav;