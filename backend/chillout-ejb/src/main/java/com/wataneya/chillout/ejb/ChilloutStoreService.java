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

    //region Creation
    public boolean createUser(User user) {
        User userfromDB = null;
        try {
            userfromDB = (User)
                    em.createQuery("select u from User u where u.phoneNumber = :phoneNumber").setParameter("phoneNumber", user.getPhoneNumber()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (userfromDB != null) {
            return false;
        } else {
            em.merge(user);
            return true;
        }
    }

    public boolean createProduct(Product product) {
        Product productfromDB = null;
        try {
            productfromDB = (Product)
                    em.createQuery("select p from Product p where p.productName = :productName").setParameter("productName", product.getProductName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (productfromDB != null) {
            return false;
        } else {
            em.merge(product);
            return true;
        }
    }

    public boolean createSector(Sector sector) {
        Sector sectorfromDB = null;
        try {
            sectorfromDB = (Sector)
                    em.createQuery("select s from Sector s where s.sectorName = :sectorName").setParameter("sectorName", sector.getSectorName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (sectorfromDB != null) {
            return false;
        } else {
            em.merge(sector);
            return true;
        }
    }

    public boolean createTank(Tank tank) {
        Tank tankfromDB = null;
        try {
            tankfromDB = (Tank)
                    em.createQuery("select t from Tank t where t.tankVolume = :tankVolume").setParameter("tankVolume", tank.getTankVolume()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (tankfromDB != null) {
            return false;
        } else {
            em.merge(tank);
            return true;
        }
    }

    public boolean createCompany(Company company) {
        Company companyfromDB = null;
        try {
            companyfromDB = (Company)
                    em.createQuery("select c from Company c where c.companyName = :companyName").setParameter("companyName", company.getCompanyName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (companyfromDB != null) {
            return false;
        } else {
            em.merge(company);
            return true;
        }
    }

    public boolean createAgent(Agent agent) {
        Agent agentfromDB = null;
        try {
            agentfromDB = (Agent)
                    em.createQuery("select a from Agent a where a.agentName = :agentName").setParameter("agentName", agent.getAgentName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (agentfromDB != null) {
            return false;
        } else {
            em.merge(agent);
            return true;
        }
    }

    public boolean createDriver(Driver driver) {
        Driver driverfromDB = null;
        try {
            driverfromDB = (Driver)
                    em.createQuery("select d from Driver d where d.phoneNumber = :phoneNumber").setParameter("phoneNumber", driver.getPhoneNumber()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (driverfromDB != null) {
            return false;
        } else {
            em.merge(driver);
            return true;
        }
    }

    public boolean createStation(Station station) {
        Station stationfromDB = null;
        try {
            stationfromDB = (Station)
                    em.createQuery("select s from Station s where s.stationName = :stationName").setParameter("stationName", station.getStationName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (stationfromDB != null) {
            stationfromDB.setSector(station.getSector());
            stationfromDB.setProducts(station.getProducts());
            stationfromDB.setAgent(station.getAgent());
            stationfromDB.setTanks(station.getTanks());
            return false;
        } else {
            em.merge(station);
            return true;
        }
    }

    public boolean createWarehouse(Warehouse warehouse) {
        Warehouse warehousefromDB = null;
        try {
            warehousefromDB = (Warehouse)
                    em.createQuery("select w from Warehouse w where w.warehouseName = :warehouseName").setParameter("warehouseName", warehouse.getWarehouseName()).getSingleResult();
        } catch (NoResultException nre) {
        }
        if (warehousefromDB != null) {
            warehousefromDB.setSector(warehouse.getSector());
            warehousefromDB.setProducts(warehouse.getProducts());
            warehousefromDB.setCompanies(warehouse.getCompanies());
            em.merge(warehousefromDB);
            return false;
        } else {
            em.merge(warehouse);
            return true;
        }
    }

    public boolean createDistance(Distance distance) {
        em.merge(distance);
        return true;
    }

    public boolean createTransfer(Transfer transfer) {
        em.merge(transfer);
        return true;
    }

    public boolean createExisting(Existing existing) {
        em.merge(existing);
        return true;
    }

    public boolean createSale(Sale sale) {
        em.merge(sale);
        return true;
    }

    public boolean createQuota(Quota quota) {
        em.merge(quota);
        return true;
    }

    public boolean createVehicle(Vehicle vehicle) {
        em.merge(vehicle);
        return true;
    }
    //endregion

    //region Updating
    public <Entity> boolean updateEntity( Entity entity ) {
        em.merge(entity);
        return true;
    }
    //endregion
}
