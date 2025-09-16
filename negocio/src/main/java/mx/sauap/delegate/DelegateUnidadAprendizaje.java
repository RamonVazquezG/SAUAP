package mx.sauap.delegate;

import mx.sauap.entity.UnidadAprendizaje;
import mx.sauap.integration.ServiceLocator;

public class DelegateUnidadAprendizaje {
    public void saveUnidadAprendizaje(UnidadAprendizaje unidadAprendizaje){
        ServiceLocator.getInstanceUnidadAprendizajeDAO().save(unidadAprendizaje);
    }

}