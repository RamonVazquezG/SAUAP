package mx.sauap.facade;

import mx.sauap.delegate.DelegateUsuario;
import mx.sauap.entity.Usuario;

public class FacadeUsuario {

    private final DelegateUsuario delegateUsuario;

    public FacadeUsuario() {
        this.delegateUsuario = new DelegateUsuario();
    }

    public Usuario login(String password, String usuario) {
        return delegateUsuario.login(usuario, password);
    }

    public void saveUsario(Usuario usuario){
        delegateUsuario.saveUsuario(usuario);
    }

}