import React from "react";
const SideNav = () => {
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="" className="brand-link" style={{ textDecoration: 'none'}}>
          <img src="dist/img/UCBerkeleylogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-1 mt-1" style={{ opacity: '.9', width: '45px', height:'90px'}} />
          <span className="h2">BERKELEY</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}

          
        
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}

              <li className="nav-header">MENU</li>
              <li className="nav-item">
                <a href="·" className="nav-link">
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>
                    Calendario
                    <span className="badge badge-info right">2</span>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Mis Cursos
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/kanban.html" className="nav-link">
                  <i className="nav-icon fas fa-columns" />
                  <p>
                    Kanban Board
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/" className="nav-link">
                  <i className="nav-icon fas fa-user-edit" />
                  <p>
                    Registro
                  </p>
                </a>
              </li>
             
              
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </div>
  );
};

export default SideNav;
