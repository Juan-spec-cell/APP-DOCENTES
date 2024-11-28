import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListarAsignaturas, ListarActividades } from '../../../../Configuracion/ApiUrls';
import { AxiosPublico } from '../../../../Axios/Axios';
import CrearActividad from '../AsignaturaActividad/Actividad';

const AsignaturaDetalle = () => {
    const { id } = useParams();
    const [asignatura, setAsignatura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [parcial, setParcial] = useState('primer');
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchAsignatura = async () => {
            try {
                console.log('Fetching asignatura...');
                const response = await AxiosPublico.get(ListarAsignaturas);
                console.log('Asignaturas response:', response.data);
                const asignaturaEncontrada = response.data.datos.find(
                    asignatura => asignatura.id === parseInt(id)
                );
                console.log('Asignatura encontrada:', asignaturaEncontrada);
                setAsignatura(asignaturaEncontrada);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching asignatura:', err);
                setLoading(false);
            }
        };

        fetchAsignatura();
    }, [id]);

    useEffect(() => {
        const fetchActividades = async () => {
            if (!asignatura) {
                console.log('No asignatura found, skipping fetchActividades');
                return;
            }

            try {
                console.log('Fetching actividades...');
                const response = await AxiosPublico.get(ListarActividades);
                console.log('Actividades response:', response.data);
                if (response.data.tipo === 1) {
                    const actividadesFiltradas = response.data.datos.filter(
                        actividad => actividad.nombre_asignatura === asignatura.nombre_asignatura
                    );
                    console.log('Actividades filtradas:', actividadesFiltradas);
                    setActividades(actividadesFiltradas);
                }
            } catch (err) {
                console.error('Error fetching actividades:', err);
            }
        };

        fetchActividades();
    }, [asignatura]);

    const handleOpenModal = (parcial) => {
        setParcial(parcial);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddActividad = (nuevaActividad) => {
        setActividades(prevActividades => [...prevActividades, nuevaActividad]);
        handleCloseModal();
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{loading ? 'Cargando...' : asignatura?.nombre_asignatura}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#primer" data-toggle="tab">
                                                Primer Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#segundo" data-toggle="tab">
                                                Segundo Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#tercer" data-toggle="tab">
                                                Tercer Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#repo" data-toggle="tab">
                                                Reposición
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="primer">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Primer Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('primer')}>
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Añadir Actividad
                                                </button>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo Actividad</th>
                                                        <th>Valor</th>
                                                        <th>Fecha de Entrega</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {actividades.map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="tab-pane" id="segundo">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Segundo Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('segundo')}>
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Añadir Actividad
                                                </button>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo Actividad</th>
                                                        <th>Valor</th>
                                                        <th>Fecha de Entrega</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {actividades.map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="tab-pane" id="tercer">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Tercer Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('tercer')}>
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Añadir Actividad
                                                </button>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo Actividad</th>
                                                        <th>Valor</th>
                                                        <th>Fecha de Entrega</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {actividades.map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="tab-pane" id="repo">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Reposición</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('repo')}>
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Añadir Actividad
                                                </button>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo Actividad</th>
                                                        <th>Valor</th>
                                                        <th>Fecha de Entrega</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {actividades.map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Nueva Actividad</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <CrearActividad 
                                    asignaturaNombre={asignatura?.nombre_asignatura} 
                                    parcial={parcial}
                                    onSuccess={handleAddActividad} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AsignaturaDetalle;