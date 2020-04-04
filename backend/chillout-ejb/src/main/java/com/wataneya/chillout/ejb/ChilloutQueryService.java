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

    public List<Quota> retrieveQuotasbyYearandMonth(int year, int month) {
        List quotas = em.createQuery("From Quota q where q.year = :year and q.month = :month")
                .setParameter("year", year)
                .setParameter("month", month)
                .getResultList();
        if (quotas == null)
            return null;
        return quotas;
    }

    public List<Sale> retrieveSalesbyDate(int year, int month, int day) {
        List sales = em.createQuery("From Sale s where s.year = :year and s.month = :month and s.day = :day")
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getResultList();
        if (sales == null)
            return null;
        return sales;
    }

    public List<Existing> retrieveExistingsbyDate(int year, int month, int day) {
        List existings = em.createQuery("From Existing e where e.year = :year and e.month = :month and e.day = :day")
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getResultList();
        if (existings == null)
            return null;
        return existings;
    }

    public List<Trip> retrieveTripsbyDate(int year, int month, int day) {
        List trips = em.createQuery("From Trip t where t.year = :year and t.month = :month and t.day = :day")
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getResultList();
        if (trips == null)
            return null;
        return trips;
    }
}
