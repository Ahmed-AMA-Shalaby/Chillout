package com.wataneya.chillout.ejb;

import com.wataneya.chillout.entity.*;
import javax.ejb.Stateless;
import javax.persistence.*;
import java.util.*;

@Stateless
public class ChilloutQueryService {

    @PersistenceContext(unitName = "chilloutdb")
    private EntityManager em;

    public List<User> retrieveUsers() {
        Query q = em.createQuery("From User u");
        return (List<User>) q.getResultList();
    }

    public List<Product> retrieveProducts() {
        Query q = em.createQuery("From Product p");
        return (List<Product>) q.getResultList();
    }

    public List<Sector> retrieveSectors() {
        Query q = em.createQuery("From Sector s");
        return (List<Sector>) q.getResultList();
    }

    public List<Tank> retrieveTanks() {
        Query q = em.createQuery("From Tank t");
        return (List<Tank>) q.getResultList();
    }

    public List<Company> retrieveCompanies() {
        Query q = em.createQuery("From Company c");
        return (List<Company>) q.getResultList();
    }

    public List<Agent> retrieveAgents() {
        Query q = em.createQuery("From Agent a");
        return (List<Agent>) q.getResultList();
    }

    public List<Driver> retrieveDrivers() {
        Query q = em.createQuery("From Driver d");
        return (List<Driver>) q.getResultList();
    }

    public List<Station> retrieveStations() {
        Query q = em.createQuery("From Station s");
        return (List<Station>) q.getResultList();
    }

    public List<Warehouse> retrieveWarehouses() {
        Query q = em.createQuery("From Warehouse w");
        return (List<Warehouse>) q.getResultList();
    }

    public List<Distance> retrieveDistances() {
        Query q = em.createQuery("From Distance d");
        return (List<Distance>) q.getResultList();
    }

    public List<Transfer> retrieveTransfers() {
        Query q = em.createQuery("From Transfer t");
        return (List<Transfer>) q.getResultList();
    }

    public List<Existing> retrieveExistings() {
        Query q = em.createQuery("From Existing e");
        return (List<Existing>) q.getResultList();
    }

    public List<Sale> retrieveSales() {
        Query q = em.createQuery("From Sale w");
        return (List<Sale>) q.getResultList();
    }
}
