import React from "react";
const Footer = () => {
  return (
    <div>
      <div>
        <footer className="main-footer">
          <strong>
            Copyright © 2014-2021 <a>Docentes</a>.
          </strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0
          </div>
        </footer>
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
    </div>
  );
};

export default Footer;
