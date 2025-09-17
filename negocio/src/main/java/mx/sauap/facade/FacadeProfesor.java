package mx.sauap.facade;

import mx.sauap.delegate.DelegateProfesor;
import mx.sauap.entity.Profesor;

public class FacadeProfesor {

    private final DelegateProfesor delegateProfesor;

    public FacadeProfesor() {
        this.delegateProfesor = new DelegateProfesor();
    }

    public void saveProfesor(Profesor profesor){
        delegateProfesor.saveProfesor(profesor);
    }
    public boolean existeRFC(String rfc){
        return delegateProfesor.existeRFC(rfc);
    }
}
