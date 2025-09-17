package mx.sauap.facade;

import mx.sauap.delegate.DelegateUnidadAprendizaje;
import mx.sauap.entity.UnidadAprendizaje;

import java.util.List;

public class FacadeUnidadAprendizaje {

    private final DelegateUnidadAprendizaje delegate = new DelegateUnidadAprendizaje();

    public void saveUnidad(UnidadAprendizaje unidad) {
        delegate.saveUnidad(unidad);
    }

    public List<UnidadAprendizaje> getAllUnidades() {
        return delegate.findAll();
    }
}
