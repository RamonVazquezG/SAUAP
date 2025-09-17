package mx.sauap.delegate;

import mx.sauap.entity.Profesor;
import mx.sauap.integration.ServiceLocator;

import java.util.List;

public class DelegateProfesor {

    public void saveProfesor(Profesor profesor){
        ServiceLocator.getInstanceProfesorDAO().save(profesor);
    }
    public boolean existeRFC(String rfc){
        List<Profesor> lista = ServiceLocator.getInstanceProfesorDAO().findAll();
        for(Profesor p : lista){
            if(p.getRfc().equalsIgnoreCase(rfc)){
                return true;
            }
        }
        return false;
    }

}
