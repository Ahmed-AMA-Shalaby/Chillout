package com.wataneya.chillout.ejb;

import com.wataneya.chillout.entity.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class ChilloutStoreService {
    @PersistenceContext(unitName = "chilloutdb")
    private EntityManager em;

    //region Updating
    public <Entity> boolean updateEntity(Entity entity) {
        em.merge(entity);
        return true;
    }

    public User checkUser(String phoneNumber, String password) {
        User user = (User) em.createQuery("From User u where u.phoneNumber = :phoneNumber and u.password = :password ").setParameter("phoneNumber", phoneNumber).setParameter("password", password).getSingleResult();
        if (user == null)
            return null;
        return user;
    }

    public <Entity> boolean deleteEntity(String entity, String id) {
        Query q = em.createQuery("From " + entity + " e where e.id = :id").setParameter("id", id);
        em.remove(q.getSingleResult());
        return true;
    }
    //endregion
}
