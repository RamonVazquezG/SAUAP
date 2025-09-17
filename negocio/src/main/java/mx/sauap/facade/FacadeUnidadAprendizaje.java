package mx.sauap.facade;

import mx.sauap.delegate.DelegateUnidadAprendizaje;
import mx.sauap.entity.UnidadAprendizaje;

public class FacadeUnidadAprendizaje {

    private final DelegateUnidadAprendizaje delegateUnidadAprendizaje;

    public FacadeUnidadAprendizaje() {
        this.delegateUnidadAprendizaje = new DelegateUnidadAprendizaje();
    }

    public void guardarUnidadAprendizaje(UnidadAprendizaje unidadAprendizaje){
        delegateUnidadAprendizaje.saveUnidadAprendizaje(unidadAprendizaje);
    }

}