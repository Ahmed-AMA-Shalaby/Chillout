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
//    public <Entity> boolean createEntity(Entity entity) {
//        if (entity instanceof Agent) {
//            Agent agentfromDB = null;
//            try {
//                agentfromDB = (Agent)
//                        em.createQuery("select a from Agent a where a.agentName = :agentName").setParameter("agentName", ((Agent) entity).getAgentName()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (agentfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Distance) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Driver) {
//            Driver driverfromDB = null;
//            try {
//                driverfromDB = (Driver)
//                        em.createQuery("select d from Driver d where d.phoneNumber = :phoneNumber").setParameter("phoneNumber", ((Driver) entity).getPhoneNumber()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (driverfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Existing) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Product) {
//            Product productfromDB = null;
//            try {
//                productfromDB = (Product)
//                        em.createQuery("select p from Product p where p.productName = :productName").setParameter("productName", ((Product) entity).getProductName()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (productfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Quota) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Sale) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Sector) {
//            Sector sectorfromDB = null;
//            try {
//                sectorfromDB = (Sector)
//                        em.createQuery("select s from Sector s where s.sectorName = :sectorName").setParameter("sectorName", ((Sector) entity).getSectorName()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (sectorfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Station) {
//            Station stationfromDB = null;
//            try {
//                stationfromDB = (Station)
//                        em.createQuery("select s from Station s where s.stationCode = :stationCode").setParameter("stationCode", ((Station) entity).getStationCode()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (stationfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Tank) {
//            Tank tankfromDB = null;
//            try {
//                tankfromDB = (Tank)
//                        em.createQuery("select t from Tank t where t.tankVolume = :tankVolume").setParameter("tankVolume", ((Tank) entity).getTankVolume()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (tankfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Transfer) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Trip) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof User) {
//            User userfromDB = null;
//            try {
//                userfromDB = (User)
//                        em.createQuery("select u from User u where u.phoneNumber = :phoneNumber").setParameter("phoneNumber", ((User) entity).getPhoneNumber()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (userfromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        } else if (entity instanceof Vehicle) {
//            em.merge(entity);
//            return true;
//        } else if (entity instanceof Warehouse) {
//            Warehouse warehousefromDB = null;
//            try {
//                warehousefromDB = (Warehouse)
//                        em.createQuery("select w from Warehouse w where w.warehouseName = :warehouseName").setParameter("warehouseName", ((Warehouse) entity).getWarehouseName()).getSingleResult();
//            } catch (NoResultException nre) {
//            }
//            if (warehousefromDB != null) {
//                return false;
//            } else {
//                em.merge(entity);
//                return true;
//            }
//        }
//        return false;
//    }
    //endregion

    //region Updating
    public <Entity> boolean updateEntity(Entity entity) {
        em.merge(entity);
        return true;
    }
    //endregion
}
