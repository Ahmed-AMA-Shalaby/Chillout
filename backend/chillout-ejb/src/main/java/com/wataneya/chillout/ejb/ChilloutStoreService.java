package com.wataneya.chillout.ejb;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ChilloutStoreService {
    @PersistenceContext(unitName = "chilloutdb")
    private EntityManager em;

    //region Updating
    public <Entity> boolean updateEntity(Entity entity) {
        em.merge(entity);
        return true;
    }
    //endregion
}
