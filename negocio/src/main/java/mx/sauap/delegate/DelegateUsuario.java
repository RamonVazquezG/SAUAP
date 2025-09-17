package mx.sauap.delegate;

import mx.sauap.entity.Usuario;
import mx.sauap.integration.ServiceLocator;

import java.util.List;

public class DelegateUsuario {
    public Usuario login(String password, String username){
        Usuario usuario = new Usuario();
        List<Usuario> usuarios = ServiceLocator.getInstanceUsuarioDAO().findAll();

        for(Usuario us:usuarios){
            if(us.getContraseña().equalsIgnoreCase(password) && us.getUsuario().equalsIgnoreCase(username)){
                usuario = us;
            }
        }
        return usuario;
    }

    public void saveUsario(Usuario usuario){
        ServiceLocator.getInstanceUsuarioDAO().save(usuario);
    }

}