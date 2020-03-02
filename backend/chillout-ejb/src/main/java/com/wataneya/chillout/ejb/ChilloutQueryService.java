package com.wataneya.chillout.ejb;

import com.wataneya.chillout.entity.*;

import javax.ejb.Stateless;
import javax.persistence.*;
import java.util.*;

@Stateless
public class ChilloutQueryService {

    @PersistenceContext(unitName = "chilloutdb")
    private EntityManager em;

    public List retrieveAllEntities(String entity) {
        Query q = em.createQuery("From " + entity + " e");
        return q.getResultList();
    }

    public List retrieveShownEntities(String entity) {
        Query q = em.createQuery("From " + entity + " e where e.isHidden = false");
        return q.getResultList();
    }

    public Object retrieveEntitybyID(String entity, String entityID) {
        Object object = em.createQuery("From " + entity + " e where e.id = :entityID").setParameter("entityID", entityID).getSingleResult();
        if (object == null)
            return null;
        return object;
    }
}
