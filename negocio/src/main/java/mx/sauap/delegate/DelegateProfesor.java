package mx.sauap.delegate;

import mx.sauap.entity.Profesor;
import mx.sauap.integration.ServiceLocator;

public class DelegateProfesor {
    public void saveProfesor(Profesor profesor){
        ServiceLocator.getInstanceProfesorDAO().save(profesor);
    }

}