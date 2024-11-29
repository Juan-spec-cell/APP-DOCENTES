import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Plantilla/PlantillaEstudiantes/Header';
import SideNav from '../Plantilla/PlantillaEstudiantes/SideNav';
import Footer from '../Plantilla/PlantillaEstudiantes/Footer';

const Estudiantes = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Outlet />
            <SideNav/>
            <Footer/>
        </div>
    );
}

export default Estudiantes;