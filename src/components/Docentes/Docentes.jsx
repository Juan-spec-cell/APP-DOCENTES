import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Plantilla/PlantillaDocentes/Header';
import SideNav from '../Plantilla/PlantillaDocentes/SideNav';
import Footer from '../Plantilla/PlantillaDocentes/Footer';

const Docentes = () => {
    return (
        <div className="wrapper">
            <Header/>
            <SideNav/>
            <Outlet />
            <Footer/>
        </div>
    );
}

export default Docentes;