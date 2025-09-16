package mx.sauap.integration;

import mx.sauap.facade.FacadeProfesor;
import mx.sauap.facade.FacadeAsignacion;
import mx.sauap.facade.FacadeUnidadAprendizaje;
import mx.sauap.facade.FacadeUsuario;

public class ServiceFacadeLocator {

    private static FacadeProfesor facadeProfesor;
    private static FacadeUsuario facadeUsuario;
    private static FacadeUnidadAprendizaje facadeUnidadAprendizaje;
    private static FacadeAsignacion facadeAsignacion;

    public static FacadeProfesor getInstanceFacadeProfesor() {
        if (facadeProfesor == null) {
            facadeProfesor = new FacadeProfesor();
            return facadeProfesor;
        } else {
            return facadeProfesor;
        }
    }

    public static FacadeUsuario getInstanceFacadeUsuario() {
        if (facadeUsuario == null) {
            facadeUsuario = new FacadeUsuario();
            return facadeUsuario;
        } else {
            return facadeUsuario;
        }
    }

    public static FacadeAsignacion getInstanceFacadeAsignacion() {
        if (facadeAsignacion == null) {
            facadeAsignacion = new FacadeAsignacion();
            return facadeAsignacion;
        } else {
            return facadeAsignacion;
        }
    }

    public static FacadeUnidadAprendizaje getInstanceFacadeUnidadAprendizaje() {
        if (facadeUnidadAprendizaje == null) {
            facadeUnidadAprendizaje = new FacadeUnidadAprendizaje();
            return facadeUnidadAprendizaje;
        } else {
            return facadeUnidadAprendizaje;
        }
    }
}