import React from 'react';
import Header from '../Plantilla/PlantillaEstudiantes/Header';
import SideNav from '../Plantilla/PlantillaEstudiantes/SideNav';
import Home from '../Plantilla/PlantillaEstudiantes/Home';
import Footer from '../Plantilla/PlantillaEstudiantes/Footer';


const Estudiantes = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Home/>
            <SideNav/>
            <Footer/>
        </div>
    );
}

export default Estudiantes;