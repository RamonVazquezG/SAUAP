package mx.sauap.delegate;

import mx.sauap.entity.Asignacion;
import mx.sauap.integration.ServiceLocator;

public class DelegateAsignacion {
    public void saveAsignacion(Asignacion asignacion){
        ServiceLocator.getInstanceAsignacionDAO().save(asignacion);
    }

}