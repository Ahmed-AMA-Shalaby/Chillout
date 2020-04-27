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

    public List retrieveEntitiesbyYearandMonth(String entity, int year, int month) {
        List list = em.createQuery("From " + entity + " e where e.year = :year and e.month = :month")
                .setParameter("year", year)
                .setParameter("month", month)
                .getResultList();
        if (list == null)
            return null;
        return list;
    }

    public List retrieveEntitiesbyDate(String entity, int year, int month, int day) {
        List list = em.createQuery("From " + entity + " e where e.year = :year and e.month = :month and e.day = :day")
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getResultList();
        if (list == null)
            return null;
        return list;
    }

    public boolean checkAdminUserExistence() {
        List admins = em.createQuery("From User u where u.role = :role").setParameter("role", "مدير").getResultList();
        if (admins.size() == 0)
            return false;
        return true;
    }
}
