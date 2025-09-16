package mx.sauap.facade;

import mx.sauap.delegate.DelegateAsignacion;
import mx.sauap.delegate.DelegateProfesor;
import mx.sauap.entity.Asignacion;

public class FacadeAsignacion {

    private final DelegateAsignacion delegateAsignacion;

    public FacadeAsignacion() {
        this.delegateAsignacion = new DelegateAsignacion();
    }

    public void guardarAsignacion(Asignacion asignacion){
        delegateAsignacion.saveAsignacion(asignacion);
    }

}