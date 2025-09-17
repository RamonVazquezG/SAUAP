package mx.sauap.delegate;

import mx.sauap.entity.UnidadAprendizaje;
import mx.sauap.integration.ServiceLocator;

import java.util.List;

public class DelegateUnidadAprendizaje {

    public void saveUnidad(UnidadAprendizaje unidad) {
        ServiceLocator.getInstanceUnidadAprendizajeDAO().save(unidad);
    }

    public List<UnidadAprendizaje> findAll() {
        return ServiceLocator.getInstanceUnidadAprendizajeDAO().findAll();
    }
}

