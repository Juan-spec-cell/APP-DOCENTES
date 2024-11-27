// Base URL
export const Servidor = 'http://localhost:3002/api/';

// Usuario endpoints
export const UsuarioIniciarSesion = 'usuarios/iniciar_sesion';
export const UsuarioRecuperarContrasena = 'usuarios/recuperar_contrasena';
export const UsuarioActualizarContrasena = 'usuarios/actualizar_contrasena';
export const ListarUsuario = 'usuarios/listar';
export const ListarUsuarios = 'usuarios/listar';

// Estudiante endpoints
export const CrearEstudiante = 'estudiantes/guardar';
export const ListarEstudiantes = 'estudiantes/listar';
export const ImagenEstudiante = 'imagen/estudiante';

// Docente endpoints
export const CrearDocente = 'docentes/guardar';
export const ListarDocentes = 'docentes/listar';
export const ImagenDocente = 'imagen/docente';

// Académico endpoints
export const ListarCarreras = 'carreras/listar';
export const ListarAsignaturas = 'asignaturas/listar';
export const ListarPeriodos = 'periodos/listar';
export const BuscarAsignaturasDocente = 'asignaturas/buscar_docente';

// Matrícula endpoints
export const CrearMatricula = 'matriculas/guardar';
export const ListarMatriculas = 'matriculas/listar';

// Calificaciones endpoints
export const ListarCalificaciones = 'calificaciones/listar';
export const GuardarCalificacion = 'calificaciones/guardar';
export const EditarCalificacion = 'calificaciones/editar';
export const EliminarCalificacion = 'calificaciones/eliminar';