/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.sauap.helper;


import mx.sauap.integration.ServiceFacadeLocator;
import mx.sauap.entity.Usuario;

import java.io.Serializable;

public class LoginHelper implements Serializable {


    /**
     * Metodo para hacer login llamara a la instancia de usuarioFacade
     * @param username
     * @param password
     * @return
     */
    public Usuario Login(String username, String password){
        return ServiceFacadeLocator.getInstanceFacadeUsuario().login(password, username);
    }
//hola//


}