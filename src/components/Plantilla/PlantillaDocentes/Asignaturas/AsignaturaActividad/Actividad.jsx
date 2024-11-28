import React, { useState, useEffect } from 'react';
import { AxiosPublico } from '../../../../Axios/Axios';
import { mostraAlerta, mostraAlertaOK } from '../../../../SweetAlert/SweetAlert';
import { GuardarActividad } from '../../../../Configuracion/ApiUrls';

const CrearActividad = ({ asignaturaNombre, parcial, onSuccess }) => {
    const [formData, setFormData] = useState({
        nombre_asignatura: asignaturaNombre,
        tipo_actividad: '',
        valor: '',
        fecha: '',
        parcial: parcial
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            nombre_asignatura: asignaturaNombre,
            parcial: parcial
        }));
    }, [asignaturaNombre, parcial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const currentDate = new Date().toISOString().split('T')[0];
        if (formData.fecha < currentDate) {
            mostraAlerta('La fecha de entrega no puede ser antes de la fecha de creación', 'error');
            setLoading(false);
            return;
        }

        try {
            const { nombre_asignatura, tipo_actividad, fecha, valor } = formData;
            const response = await AxiosPublico.post(GuardarActividad, { nombre_asignatura, tipo_actividad, fecha, valor });
            if (response.status === 201) {
                mostraAlertaOK('Actividad creada exitosamente');
                onSuccess?.({ ...formData, id: response.data.data.id });
                setFormData({
                    ...formData,
                    tipo_actividad: '',
                    valor: '',
                    fecha: ''
                });
            }
        } catch (error) {
            mostraAlerta(
                error.response?.data?.message || 'Error al crear la actividad',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Crear Nueva Actividad</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="hidden" 
                        name="nombre_asignatura" 
                        value={formData.nombre_asignatura} 
                    />
                    <input 
                        type="hidden" 
                        name="parcial" 
                        value={formData.parcial} 
                    />

                    <div className="form-group mb-3">
                        <label className="form-label">Tipo de Actividad</label>
                        <select
                            className="form-control"
                            name="tipo_actividad"
                            value={formData.tipo_actividad}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione el tipo</option>
                            <option value="tarea">Tarea</option>
                            <option value="examen">Examen</option>
                            <option value="proyecto">Proyecto</option>
                            <option value="exposicion">Exposición</option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Valor</label>
                        <input
                            type="number"
                            className="form-control"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Fecha de Entrega</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Guardando...
                                </>
                            ) : 'Guardar Actividad'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearActividad;