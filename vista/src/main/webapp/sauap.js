//<![CDATA[
// Datos de ejemplo (simulando una base de datos)
var unidadesAprendizaje = [
    { id: 1, nombre: "Matemáticas Básicas", profesores: ["Juan Pérez"], horasClase: 3, horasTaller: 1, horasLaboratorio: 0 },
    { id: 2, nombre: "Programación I", profesores: ["María García", "Carlos López"], horasClase: 2, horasTaller: 2, horasLaboratorio: 2 },
    { id: 3, nombre: "Física General", profesores: [], horasClase: 4, horasTaller: 0, horasLaboratorio: 2 },
    { id: 4, nombre: "Química Orgánica", profesores: ["Ana Martínez"], horasClase: 3, horasTaller: 0, horasLaboratorio: 3 },
    { id: 5, nombre: "Base de Datos", profesores: ["Roberto Sánchez", "Laura Hernández"], horasClase: 2, horasTaller: 1, horasLaboratorio: 2 }
];

// Simulación de profesores en la base de datos
var profesores = [
    { id: 1, nombre: "Juan Pérez", rfc: "PERE800101" },
    { id: 2, nombre: "María García", rfc: "GARC750215" },
    { id: 3, nombre: "Carlos López", rfc: "LOPE851230" },
    { id: 4, nombre: "Ana Martínez", rfc: "MART780512" },
    { id: 5, nombre: "Roberto Sánchez", rfc: "SANC900625" },
    { id: 6, nombre: "Laura Hernández", rfc: "HERN820708" },
    { id: 7, nombre: "Miguel Torres", rfc: "TORR791124" }
];

var selectedRowId = null;
var horarioSeleccionado = {};
var unidadHorario = null;

function createRipple(e, color) {
    const container = document.getElementById('container');
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.backgroundColor = color;

    const rect = container.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - 10}px`;
    ripple.style.top = `${e.clientY - rect.top - 10}px`;

    container.appendChild(ripple);

    const maxDim = Math.max(rect.width, rect.height);
    setTimeout(() => {
        ripple.style.transform = `scale(${maxDim / 10})`;
    }, 10);

    setTimeout(() => ripple.remove(), 600);
}

function mostrarFormulario(e) {
    createRipple(e, '#F5BF77');

    // Ocultar menú después de la animación
    setTimeout(() => {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('formulario').style.display = 'block';
        document.getElementById('backButton').style.display = 'inline-block';
        document.getElementById('container').style.backgroundColor = '#F5BF77';
    }, 600);
}

function mostrarUnidadAprendizaje(e) {
    createRipple(e, '#F5BF77');

    // Ocultar menú después de la animación
    setTimeout(() => {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('unidadAprendizaje').style.display = 'block';
        document.getElementById('backButton').style.display = 'inline-block';
        document.getElementById('container').style.backgroundColor = '#F5BF77';
    }, 600);
}

function mostrarConsulta(e) {
    createRipple(e, '#F5BF77');

    // Ocultar menú después de la animación
    setTimeout(() => {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('consulta').style.display = 'block';
        document.getElementById('backButton').style.display = 'inline-block';
        document.getElementById('container').style.backgroundColor = '#F5BF77';
        // Cargar datos cuando se muestra la consulta
        cargarDatosTabla();
    }, 600);
}

function regresarMenu(e) {
    createRipple(e, '#fde8cf');

    // Ocultar contenido y mostrar menú después de la animación
    setTimeout(() => {
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('unidadAprendizaje').style.display = 'none';
        document.getElementById('consulta').style.display = 'none';
        document.getElementById('backButton').style.display = 'none';
        document.getElementById('menu').style.display = 'grid';
        document.getElementById('container').style.backgroundColor = '#fde8cf';
        // Reiniciar selección al regresar
        selectedRowId = null;
    }, 600);
}

function validarCampo(inputId, errorId) {
    var input = document.getElementById(inputId);
    var errorMsg = document.getElementById(errorId);

    if (input.value.trim() === '') {
        input.classList.add('input-error');
        errorMsg.style.display = 'block';
        return false;
    } else {
        input.classList.remove('input-error');
        errorMsg.style.display = 'none';
        return true;
    }
}

function validarRFC(event) {
    // Validar campos obligatorios
    var camposValidos = true;
    camposValidos = validarCampo('nombre', 'error_nombre') && camposValidos;
    camposValidos = validarCampo('apellido1', 'error_apellido1') && camposValidos;
    camposValidos = validarCampo('apellido2', 'error_apellido2') && camposValidos;
    camposValidos = validarCampo('rfc', 'error_rfc') && camposValidos;

    if (!camposValidos) {
        event.preventDefault();
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

    var apellido1 = document.getElementById("apellido1").value.trim().toUpperCase();
    var apellido2 = document.getElementById("apellido2").value.trim().toUpperCase();
    var nombre    = document.getElementById("nombre").value.trim().toUpperCase();
    var rfc       = document.getElementById("rfc").value.trim().toUpperCase();

    // Validar longitud
    if (rfc.length !== 13) {
        event.preventDefault();
        alert("El RFC debe tener exactamente 13 caracteres.");
        return false;
    }

    // Construir prefijo esperado del RFC (4 letras)
    var esperado = apellido1.substring(0,2) + apellido2.charAt(0) + nombre.charAt(0);

    if (rfc.substring(0,4) !== esperado) {
        event.preventDefault();
        alert("Los primeros 4 caracteres del RFC no coinciden con los apellidos y nombre.");
        return false;
    }

    // Validar estructura general: 4 letras + 6 dígitos (fecha) + 3 alfanuméricos
    var regexRFC = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
    if (!regexRFC.test(rfc)) {
        event.preventDefault();
        alert("Formato de RFC inválido. Ejemplo válido: GARC850715XXX");
        return false;
    }

    return true;
}

function validarHoras(input) {
    // Obtener el valor del campo
    var valor = input.value;

    // Si está vacío, establecer como 0
    if (valor === '') {
        input.value = 0;
        return;
    }

    // Convertir a número
    var num = parseInt(valor, 10);

    // Si no es un número, establecer como 0
    if (isNaN(num)) {
        input.value = 0;
        return;
    }

    // Si es menor que 0, establecer como 0
    if (num < 0) {
        input.value = 0;
        return;
    }

    // Si es mayor que 4, establecer como 4
    if (num > 4) {
        input.value = 4;
        return;
    }

    // Si está entre 0 y 4, mantener el valor
    input.value = num;
}

function validarNombreAsignacion() {
    return validarCampo('nombre_asignacion', 'error_nombre_asignacion');
}

function validarTotalHoras() {
    var horasClase = parseInt(document.getElementById('horas_clase').value) || 0;
    var horasTaller = parseInt(document.getElementById('horas_taller').value) || 0;
    var horasLab = parseInt(document.getElementById('horas_laboratorio').value) || 0;

    var total = horasClase + horasTaller + horasLab;

    if (total === 0) {
        alert("Error: Debe haber al menos una hora en clase, taller o laboratorio.");
        return false;
    }

    return true;
}

function validarFormularioAsignacion(event) {
    // Validar nombre de asignación
    if (!validarNombreAsignacion()) {
        event.preventDefault();
        alert("Por favor, complete el nombre de la asignación.");
        return false;
    }

    // Validar horas (por si acaso)
    validarHoras(document.getElementById('horas_clase'));
    validarHoras(document.getElementById('horas_taller'));
    validarHoras(document.getElementById('horas_laboratorio'));

    // Validar que al menos haya una hora en total
    if (!validarTotalHoras()) {
        event.preventDefault();
        return false;
    }

    // Si todo está bien, permitir envío del formulario
    alert('Formulario validado correctamente. Los datos serían enviados en un sistema real.');
    return true;
}

// Funciones para la tabla de consulta
function cargarDatosTabla() {
    var tabla = document.getElementById('tabla-unidades');
    var tbody = tabla.querySelector('tbody');

    // Limpiar tabla
    tbody.innerHTML = '';

    if (unidadesAprendizaje.length === 0) {
        var row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" class="no-data">No hay unidades de aprendizaje registradas</td>';
        tbody.appendChild(row);
        return;
    }

    // Llenar tabla con datos
    unidadesAprendizaje.forEach(function(unidad) {
        var row = document.createElement('tr');
        row.setAttribute('data-id', unidad.id);

        // Formatear la lista de profesores
        var profesoresHtml = 'Sin asignar';
        if (unidad.profesores && unidad.profesores.length > 0) {
            profesoresHtml = '<div class="profesores-list">';
            unidad.profesores.forEach(function(profesor) {
                profesoresHtml += '<span class="profesor-tag">' + profesor + '</span>';
            });
            profesoresHtml += '</div>';
        }

        row.innerHTML = '<td>' + unidad.id + '</td>' +
            '<td>' + unidad.nombre + '</td>' +
            '<td>' + profesoresHtml + '</td>' +
            '<td>' + unidad.horasClase + '</td>' +
            '<td>' + unidad.horasTaller + '</td>' +
            '<td>' + unidad.horasLaboratorio + '</td>';

        // Agregar evento de clic para seleccionar fila
        row.addEventListener('click', function() {
            seleccionarFila(this);
        });

        tbody.appendChild(row);
    });

    // Actualizar estado de botones
    actualizarEstadoBotones();
}

function seleccionarFila(fila) {
    // Quitar selección anterior
    var filas = document.querySelectorAll('#tabla-unidades tbody tr');
    filas.forEach(function(f) {
        f.classList.remove('selected');
    });

    // Seleccionar nueva fila
    fila.classList.add('selected');
    selectedRowId = parseInt(fila.getAttribute('data-id'));

    // Actualizar estado de botones
    actualizarEstadoBotones();
}

function actualizarEstadoBotones() {
    var btnModificar = document.getElementById('btn-modificar');
    var btnAsignar = document.getElementById('btn-asignar');
    var btnEliminar = document.getElementById('btn-eliminar');
    var btnHorario = document.getElementById('btn-horario');

    if (selectedRowId !== null) {
        btnModificar.disabled = false;
        btnAsignar.disabled = false;
        btnEliminar.disabled = false;
        btnHorario.disabled = false;

        // Para XHTML, también necesitamos eliminar el atributo disabled
        btnModificar.removeAttribute('disabled');
        btnAsignar.removeAttribute('disabled');
        btnEliminar.removeAttribute('disabled');
        btnHorario.removeAttribute('disabled');
    } else {
        btnModificar.disabled = true;
        btnAsignar.disabled = true;
        btnEliminar.disabled = true;
        btnHorario.disabled = true;

        // Para XHTML, necesitamos establecer el atributo disabled
        btnModificar.setAttribute('disabled', 'disabled');
        btnAsignar.setAttribute('disabled', 'disabled');
        btnEliminar.setAttribute('disabled', 'disabled');
        btnHorario.setAttribute('disabled', 'disabled');
    }
}

function modificarUnidad() {
    if (selectedRowId === null) {
        alert('Por favor, seleccione una unidad para modificar.');
        return;
    }

    // Buscar la unidad seleccionada
    var unidad = unidadesAprendizaje.find(function(u) {
        return u.id === selectedRowId;
    });

    if (unidad) {
        alert('Modificando unidad: ' + unidad.nombre + '\nEn un sistema real, se abriría un formulario de edición.');
        // Aquí iría la lógica para abrir un formulario de modificación
    }
}

function asignarProfesor() {
    if (selectedRowId === null) {
        alert('Por favor, seleccione una unidad para asignar profesores.');
        return;
    }

    // Buscar la unidad seleccionada
    var unidad = unidadesAprendizaje.find(function(u) {
        return u.id === selectedRowId;
    });

    if (unidad) {
        // Mostrar el modal de selección de profesor
        mostrarModalProfesores(unidad);
    }
}

function mostrarModalProfesores(unidad) {
    // Configurar el título del modal
    document.getElementById('modal-title').textContent = 'Asignar profesores a: ' + unidad.nombre;

    // Cargar la lista de profesores
    var profesorList = document.getElementById('profesor-list');
    profesorList.innerHTML = '';

    profesores.forEach(function(profesor) {
        var item = document.createElement('div');
        item.className = 'profesor-item';

        // Verificar si el profesor ya está asignado
        var estaSeleccionado = unidad.profesores.includes(profesor.nombre);

        item.innerHTML = '<input type="checkbox" class="profesor-checkbox" data-id="' + profesor.id + '" ' +
            (estaSeleccionado ? 'checked' : '') + '>' +
            '<div class="profesor-info">' +
            '<div class="profesor-name">' + profesor.nombre + '</div>' +
            '<div class="profesor-rfc">RFC: ' + profesor.rfc + '</div>' +
            '</div>';

        profesorList.appendChild(item);
    });

    // Mostrar el modal
    document.getElementById('modal-backdrop').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-backdrop').style.display = 'none';
}

function confirmarAsignacion() {
    if (selectedRowId === null) {
        alert('Por favor, seleccione una unidad de aprendizaje.');
        return;
    }

    // Obtener los profesores seleccionados
    var checkboxes = document.querySelectorAll('.profesor-checkbox:checked');
    var profesoresSeleccionados = [];
    var nombresProfesores = [];

    checkboxes.forEach(function(checkbox) {
        var profesorId = parseInt(checkbox.getAttribute('data-id'));
        var profesor = profesores.find(function(p) {
            return p.id === profesorId;
        });

        if (profesor) {
            profesoresSeleccionados.push(profesor.id);
            nombresProfesores.push(profesor.nombre);
        }
    });

    // Buscar la unidad seleccionada
    var unidad = unidadesAprendizaje.find(function(u) {
        return u.id === selectedRowId;
    });

    if (unidad) {
        // En un sistema real, esto actualizaría la base de datos
        unidad.profesores = nombresProfesores;

        // Actualizar la tabla
        cargarDatosTabla();

        // Cerrar el modal
        cerrarModal();

        alert('Profesores asignados correctamente a ' + unidad.nombre);
    }
}

function eliminarUnidad() {
    if (selectedRowId === null) {
        alert('Por favor, seleccione una unidad para eliminar.');
        return;
    }

    // Buscar la unidad seleccionada
    var unidad = unidadesAprendizaje.find(function(u) {
        return u.id === selectedRowId;
    });

    if (unidad && confirm('¿Está seguro de que desea eliminar la unidad: ' + unidad.nombre + '?')) {
        // En un sistema real, esto eliminaría el registro de la base de datos
        unidadesAprendizaje = unidadesAprendizaje.filter(function(u) {
            return u.id !== selectedRowId;
        });

        // Reiniciar selección
        selectedRowId = null;

        // Actualizar la tabla
        cargarDatosTabla();

        alert('Unidad eliminada correctamente.');
    }
}

// Función para asignar horario
function asignarHorario() {
    if (selectedRowId === null) {
        alert('Por favor, seleccione una unidad para asignar horario.');
        return;
    }

    // Buscar la unidad seleccionada
    unidadHorario = unidadesAprendizaje.find(function(u) {
        return u.id === selectedRowId;
    });

    if (unidadHorario) {
        // Inicializar horario seleccionado si no existe
        if (!unidadHorario.horario) {
            unidadHorario.horario = {};
        }

        horarioSeleccionado = JSON.parse(JSON.stringify(unidadHorario.horario));

        // Mostrar el modal de horario
        mostrarModalHorario(unidadHorario);
    }
}

// Función para mostrar el modal de horario
function mostrarModalHorario(unidad) {
    // Configurar el título del modal
    document.getElementById('modal-horario-title').textContent = 'Asignar Horario: ' + unidad.nombre;

    // Generar el horario
    generarHorario(unidad);

    // Mostrar el modal
    document.getElementById('modal-horario-backdrop').style.display = 'flex';
}

// Función para generar la tabla de horario
function generarHorario(unidad) {
    var container = document.getElementById('horario-container');
    container.innerHTML = '';

    // Información de la unidad
    var infoDiv = document.createElement('div');
    infoDiv.className = 'horario-info';
    infoDiv.innerHTML = '<h3>Información de la Unidad</h3>' +
        '<p><strong>Nombre:</strong> ' + unidad.nombre + '</p>' +
        '<p><strong>Horas Clase:</strong> ' + unidad.horasClase + '</p>' +
        '<p><strong>Horas Taller:</strong> ' + unidad.horasTaller + '</p>' +
        '<p><strong>Horas Laboratorio:</strong> ' + unidad.horasLaboratorio + '</p>' +
        '<p><strong>Total de horas a asignar:</strong> ' +
        (unidad.horasClase + unidad.horasTaller + unidad.horasLaboratorio) + '</p>';
    container.appendChild(infoDiv);

    // Crear tabla de horario
    var table = document.createElement('table');
    table.className = 'horario-table';

    // Crear encabezados (días de la semana)
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    // Celda vacía para la esquina
    var emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader);

    // Días de la semana
    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    dias.forEach(function(dia) {
        var th = document.createElement('th');
        th.textContent = dia;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de la tabla (horas)
    var tbody = document.createElement('tbody');

    // Generar horas de 7:00 a 22:00 (7am a 10pm)
    for (var hora = 7; hora <= 22; hora++) {
        var row = document.createElement('tr');

        // Celda de hora
        var horaCell = document.createElement('td');
        horaCell.className = 'hora-col';
        horaCell.textContent = hora + ':00';
        row.appendChild(horaCell);

        // Celdas para cada día
        for (var i = 0; i < 5; i++) {
            var dia = dias[i];
            var cell = document.createElement('td');
            cell.className = 'horario-celda';
            cell.setAttribute('data-dia', dia);
            cell.setAttribute('data-hora', hora);

            // Verificar si esta celda está seleccionada
            var celdaId = dia + '_' + hora;
            if (horarioSeleccionado[celdaId]) {
                cell.classList.add('seleccionada');
                cell.title = 'Hora asignada';
            }

            // Agregar evento de clic
            cell.addEventListener('click', function() {
                toggleCeldaHorario(this);
            });

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);

    // Resumen de horas seleccionadas
    var resumenDiv = document.createElement('div');
    resumenDiv.className = 'horario-resumen';
    resumenDiv.innerHTML = '<h4>Resumen de Horas Asignadas</h4>' +
        '<p id="horas-asignadas-contador">0 horas asignadas</p>';
    container.appendChild(resumenDiv);

    // Actualizar contador y estado del botón
    actualizarContadorHoras();
    actualizarBotonGuardar();
}

// Función para alternar selección de celda de horario
function toggleCeldaHorario(celda) {
    var dia = celda.getAttribute('data-dia');
    var hora = celda.getAttribute('data-hora');
    var celdaId = dia + '_' + hora;

    if (horarioSeleccionado[celdaId]) {
        // Deseleccionar
        delete horarioSeleccionado[celdaId];
        celda.classList.remove('seleccionada');
    } else {
        // Seleccionar
        horarioSeleccionado[celdaId] = true;
        celda.classList.add('seleccionada');
    }

    // Actualizar contador y estado del botón
    actualizarContadorHoras();
    actualizarBotonGuardar();
}

// Función para actualizar el contador de horas asignadas
function actualizarContadorHoras() {
    var totalHoras = Object.keys(horarioSeleccionado).length;
    var contador = document.getElementById('horas-asignadas-contador');
    var totalEsperado = unidadHorario.horasClase + unidadHorario.horasTaller + unidadHorario.horasLaboratorio;

    if (contador) {
        contador.textContent = totalHoras + ' horas asignadas de ' + totalEsperado + ' requeridas';

        // Resaltar según el estado
        if (totalHoras > totalEsperado) {
            contador.style.color = '#d32f2f';
            contador.innerHTML += ' <strong>(¡Excede el límite!)</strong>';
        } else if (totalHoras < totalEsperado) {
            contador.style.color = '#ff9800';
            contador.innerHTML += ' <strong>(Faltan ' + (totalEsperado - totalHoras) + ' horas)</strong>';
        } else {
            contador.style.color = 'green';
            contador.innerHTML += ' <strong>(✓ Horas completas)</strong>';
        }
    }
}

// Función para actualizar el estado del botón de guardar
function actualizarBotonGuardar() {
    var totalHoras = Object.keys(horarioSeleccionado).length;
    var totalEsperado = unidadHorario.horasClase + unidadHorario.horasTaller + unidadHorario.horasLaboratorio;
    var btnGuardar = document.querySelector('.modal-button.primary');

    if (btnGuardar) {
        if (totalHoras > totalEsperado) {
            btnGuardar.disabled = true;
            btnGuardar.setAttribute('disabled', 'disabled');
            btnGuardar.title = 'No se puede guardar: ha excedido el número de horas permitidas';
            btnGuardar.style.opacity = '0.6';
            btnGuardar.style.cursor = 'not-allowed';
        } else {
            btnGuardar.disabled = false;
            btnGuardar.removeAttribute('disabled');
            btnGuardar.title = '';
            btnGuardar.style.opacity = '1';
            btnGuardar.style.cursor = 'pointer';
        }
    }
}

// Función para cerrar el modal de horario
function cerrarModalHorario() {
    document.getElementById('modal-horario-backdrop').style.display = 'none';
}

// Función para guardar el horario
function guardarHorario() {
    if (!unidadHorario) return;

    var totalHoras = Object.keys(horarioSeleccionado).length;
    var totalEsperado = unidadHorario.horasClase + unidadHorario.horasTaller + unidadHorario.horasLaboratorio;

    // No permitir guardar si se excede el número de horas
    if (totalHoras > totalEsperado) {
        alert('Error: Ha asignado ' + totalHoras + ' horas, pero la unidad solo requiere ' + totalEsperado +
            ' horas. Por favor, ajuste el horario antes de guardar.');
        return;
    }

    // Permitir guardar si hay menos horas pero con confirmación
    if (totalHoras < totalEsperado) {
        if (!confirm('Ha asignado ' + totalHoras + ' horas, pero la unidad requiere ' + totalEsperado +
            ' horas. ¿Desea guardar de todos modos?')) {
            return; // No guardar si el usuario cancela
        }
    }

    // Guardar el horario en la unidad
    unidadHorario.horario = JSON.parse(JSON.stringify(horarioSeleccionado));

    // Cerrar el modal
    cerrarModalHorario();

    alert('Horario guardado correctamente para ' + unidadHorario.nombre);
}
//]]>