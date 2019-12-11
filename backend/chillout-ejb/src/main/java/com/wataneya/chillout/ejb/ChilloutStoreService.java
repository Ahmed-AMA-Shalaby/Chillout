package com.wataneya.chillout.ejb;


import com.wataneya.chillout.entity.*;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

@Stateless
public class ChilloutStoreService {
    @PersistenceContext(unitName = "chilloutdb")
    private EntityManager em;

    public boolean createUser(User user) {
        User userfromDB = null;
        try {
            userfromDB = (User)
                    em.createQuery("select u from User u where u.phone = :phone").setParameter("phone", user.getPhone()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (userfromDB != null) {
            return false;
        } else {
            em.persist(user);
            return true;
        }
    }

    public boolean updateUser(User user) {
        em.merge(user);
        return true;
    }

    public boolean createProduct(Product product) {
        Product productfromDB = null;
        try {
            productfromDB = (Product)
                    em.createQuery("select p from Product p where p.product = :product").setParameter("product", product.getProduct()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (productfromDB != null) {
            return false;
        } else {
            em.persist(product);
            return true;
        }
    }

    public boolean createSector(Sector sector) {
        Sector sectorfromDB = null;
        try {
            sectorfromDB = (Sector)
                    em.createQuery("select p from Sector p where p.sector = :sector").setParameter("sector", sector.getSector()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (sectorfromDB != null) {
            return false;
        } else {
            em.persist(sector);
            return true;
        }
    }

    public boolean createTank(Tank tank) {
        Tank tankfromDB = null;
        try {
            tankfromDB = (Tank)
                    em.createQuery("select p from Tank p where p.tank = :tank").setParameter("tank", tank.getTank()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (tankfromDB != null) {
            return false;
        } else {
            em.persist(tank);
            return true;
        }
    }

    public boolean createCompany(Company company) {
        Company companyfromDB = null;
        try {
            companyfromDB = (Company)
                    em.createQuery("select p from Company p where p.company = :company").setParameter("company", company.getCompany()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (companyfromDB != null) {
            return false;
        } else {
            em.persist(company);
            return true;
        }
    }

    public boolean createAgent(Agent agent) {
        Agent agentfromDB = null;
        try {
            agentfromDB = (Agent)
                    em.createQuery("select p from Agent p where p.agent = :agent").setParameter("agent", agent.getAgent()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (agentfromDB != null) {
            return false;
        } else {
            em.persist(agent);
            return true;
        }
    }

    public boolean createDriver(Driver driver) {
        Driver driverfromDB = null;
        try {
            driverfromDB = (Driver)
                    em.createQuery("select p from Driver p where p.driver = :driver").setParameter("driver", driver.getDriver()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (driverfromDB != null) {
            return false;
        } else {
            em.persist(driver);
            return true;
        }
    }

    public boolean createStation(Station station) {
        Station stationfromDB = null;
        try {
            stationfromDB = (Station)
                    em.createQuery("select p from Station p where p.station = :station").setParameter("station", station.getStation()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (stationfromDB != null) {
            return false;
        } else {
            em.persist(station);
            return true;
        }
    }

    public boolean createWarehouse(Warehouse warehouse) {
        Warehouse warehousefromDB = null;
        try {
            warehousefromDB = (Warehouse)
                    em.createQuery("select p from Warehouse p where p.warehouse = :warehouse").setParameter("warehouse", warehouse.getWarehouse()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (warehousefromDB != null) {
            return false;
        } else {
            em.persist(warehouse);
            return true;
        }
    }

    public boolean createDistance(Distance distance) {
        Distance distancefromDB = null;
        try {
            distancefromDB = (Distance)
                    em.createQuery("select p from Distance p where p.distance = :distance").setParameter("distance", distance.getDistance()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (distancefromDB != null) {
            return false;
        } else {
            em.persist(distance);
            return true;
        }
    }
}
