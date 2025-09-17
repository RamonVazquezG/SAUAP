package mx.sauap.dao;

import jakarta.persistence.EntityManager;
import mx.sauap.persistence.AbstractDAO;
import mx.sauap.entity.Usuario;

import java.util.List;

public class UsuarioDAO extends AbstractDAO<Usuario> {
    private final EntityManager entityManager;

    public UsuarioDAO(EntityManager em) {
        super(Usuario.class);
        this.entityManager = em;
    }

    public List<Usuario> obtenerTodos(){
        return entityManager
                .createQuery("SELECT u FROM Usuario u", Usuario.class)
                .getResultList();
    }

    public Usuario autenticar(String usuario, String contrasena) {
        try {
            return entityManager
                    .createQuery("SELECT u FROM Usuario u WHERE u.usuario = :usuario AND u.contrasena = :contrasena", Usuario.class)
                    .setParameter("usuario", usuario)
                    .setParameter("contrasena", contrasena)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }
}