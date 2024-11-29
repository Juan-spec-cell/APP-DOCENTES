import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { AxiosPublico } from '../../../Axios/Axios';
import { ListarActividades } from '../../../Configuracion/ApiUrls';

const Calendario = ({ asignaturas }) => {
    const [actividades, setActividades] = useState([]);
    const [parcial, setParcial] = useState('primer parcial');

    useEffect(() => {
        const fetchActividades = async () => {
            if (!asignaturas || asignaturas.length === 0) return;

            try {
                const response = await AxiosPublico.get(ListarActividades);
                if (response.data.tipo === 1) {
                    const actividadesFiltradas = response.data.datos.filter(
                        actividad => asignaturas.some(asignatura => actividad.nombre_asignatura === asignatura.nombre_asignatura)
                    );
                    setActividades(actividadesFiltradas);
                }
            } catch (err) {
                console.error('Error fetching actividades:', err);
            }
        };

        fetchActividades();
    }, [asignaturas]);

    const actividadesFiltradas = actividades.filter(actividad => actividad.parcial === parcial);

    const eventos = actividadesFiltradas.map(actividad => ({
        title: actividad.nombre_actividad,
        start: actividad.fecha_inicio,
        end: actividad.fecha
    }));

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-start pt-5" style={{ marginLeft: '70px' }}>
            <div className="row w-100">
                <div className="col-lg-3 col-md-4 col-sm-12 mb-3" style={{ maxWidth: '300px' }}>
                    <div className="card" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div className="card-body p-0">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <a className={`nav-link ${parcial === 'primer parcial' ? 'active' : ''}`} href="#primer parcial" data-toggle="tab" onClick={() => setParcial('primer parcial')}>
                                        Primer Parcial
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${parcial === 'segundo parcial' ? 'active' : ''}`} href="#segundo parcial" data-toggle="tab" onClick={() => setParcial('segundo parcial')}>
                                        Segundo Parcial
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${parcial === 'tercer parcial' ? 'active' : ''}`} href="#tercer parcial" data-toggle="tab" onClick={() => setParcial('tercer parcial')}>
                                        Tercer Parcial
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${parcial === 'reposicion' ? 'active' : ''}`} href="#reposicion" data-toggle="tab" onClick={() => setParcial('reposicion')}>
                                        Reposición
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 mb-3">
                    <div className="card h-100">
                        <div className="card-body">
                            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                                    initialView="dayGridMonth"
                                    events={eventos}
                                    height="auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendario;