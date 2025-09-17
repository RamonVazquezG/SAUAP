package mx.sauap.delegate;

import mx.sauap.entity.Usuario;
import mx.sauap.integration.ServiceLocator;

import java.util.List;

public class DelegateUsuario {

    public Usuario login(String username, String password){
        List<Usuario> usuarios = ServiceLocator.getInstanceUsuarioDAO().findAll();

        for(Usuario us : usuarios){
            if(us.getUsuario().equals(username) && us.getContraseña().equals(password)){
                return us; // retorna inmediatamente si se encuentra
            }
        }
        return null; // no encontrado
    }

    public void saveUsuario(Usuario usuario){
        ServiceLocator.getInstanceUsuarioDAO().save(usuario);
    }
}
