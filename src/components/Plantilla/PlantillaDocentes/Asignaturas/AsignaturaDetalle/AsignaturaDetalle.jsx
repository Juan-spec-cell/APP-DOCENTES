import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ListarAsignaturas, ListarActividades } from '../../../../Configuracion/ApiUrls';
import { AxiosPublico } from '../../../../Axios/Axios';
import CrearActividad from '../AsignaturaActividad/Actividad';

const AsignaturaDetalle = () => {
    const { id } = useParams();
    const [asignatura, setAsignatura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [parcial, setParcial] = useState('primer parcial');
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

    const fetchActividades = useCallback(async () => {
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
    }, [asignatura]);

    useEffect(() => {
        fetchActividades();
    }, [asignatura, fetchActividades]);

    const handleOpenModal = (parcial) => {
        setParcial(parcial);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddActividad = async (nuevaActividad) => {
        setActividades(prevActividades => [...prevActividades, nuevaActividad]);
        handleCloseModal();
        await fetchActividades(); // Actualiza las actividades después de añadir una nueva
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
                                            <a className="nav-link active" href="#primer parcial" data-toggle="tab" onClick={() => setParcial('primer parcial')}>
                                                Primer Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#segundo parcial" data-toggle="tab" onClick={() => setParcial('segundo parcial')}>
                                                Segundo Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#tercer parcial" data-toggle="tab" onClick={() => setParcial('tercer parcial')}>
                                                Tercer Parcial
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#reposicion" data-toggle="tab" onClick={() => setParcial('reposicion')}>
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
                                        <div className={`tab-pane ${parcial === 'primer parcial' ? 'active' : ''}`} id="primer parcial">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Primer Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('primer parcial')}>
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
                                                    {actividades.filter(actividad => actividad.parcial === 'primer parcial').map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className={`tab-pane ${parcial === 'segundo parcial' ? 'active' : ''}`} id="segundo parcial">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Segundo Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('segundo parcial')}>
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
                                                    {actividades.filter(actividad => actividad.parcial === 'segundo parcial').map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className={`tab-pane ${parcial === 'tercer parcial' ? 'active' : ''}`} id="tercer parcial">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Tercer Parcial</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('tercer parcial')}>
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
                                                    {actividades.filter(actividad => actividad.parcial === 'tercer parcial').map((actividad, index) => (
                                                        <tr key={index}>
                                                            <td>{actividad.nombre_actividad}</td>
                                                            <td>{actividad.valor}</td>
                                                            <td>{actividad.fecha}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className={`tab-pane ${parcial === 'reposicion' ? 'active' : ''}`} id="reposicion">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4>Reposición</h4>
                                                <button className="btn btn-primary" onClick={() => handleOpenModal('reposicion')}>
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
                                                    {actividades.filter(actividad => actividad.parcial === 'reposicion').map((actividad, index) => (
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
                                    contexto={parcial}
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