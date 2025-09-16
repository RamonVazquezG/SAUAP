package mx.sauap.dao;

import jakarta.persistence.EntityManager;
import mx.sauap.persistence.AbstractDAO;
import mx.sauap.entity.Profesor;

import java.util.List;


public class ProfesorDAO extends AbstractDAO<Profesor> {
    private final EntityManager entityManager;

    public ProfesorDAO(EntityManager em) {
        super(Profesor.class);
        this.entityManager = em;
    }

    public List<Profesor> obtenerTodos(){
        return entityManager
                .createQuery("SELECT a FROM Profesor a", Profesor.class)
                .getResultList();
    }

    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }
}