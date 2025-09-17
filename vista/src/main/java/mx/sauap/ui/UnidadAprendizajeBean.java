package mx.sauap.ui;

import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import mx.sauap.entity.UnidadAprendizaje;
import mx.sauap.facade.FacadeUnidadAprendizaje;

import java.io.Serializable;
import java.util.List;

@Named("unidadBean")
@ViewScoped
public class UnidadAprendizajeBean implements Serializable {

    private final FacadeUnidadAprendizaje facade = new FacadeUnidadAprendizaje();
    private List<UnidadAprendizaje> unidades;

    public List<UnidadAprendizaje> getUnidades() {
        if (unidades == null) {
            unidades = facade.getAllUnidades();
        }
        return unidades;
    }
}
