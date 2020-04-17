package com.wataneya.chillout.rest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wataneya.chillout.ejb.*;
import com.wataneya.chillout.entity.*;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/chilloutrest")
@RequestScoped
public class ChilloutClientREST {
    @EJB
    private ChilloutStoreService chilloutStoreService;

    @EJB
    private ChilloutQueryService chilloutQueryService;


    /*****************************************************GET***********************************************************/

    //region GET
    @GET
    @Path("/retrieveAllEntities")
    @Produces("application/json")
    public Response retrieveUsers(@QueryParam("entity") String entity) {
        return Response.ok(chilloutQueryService.retrieveAllEntities(entity)).build();
    }

    @GET
    @Path("/retrieveShownEntities")
    @Produces("application/json")
    public Response retrieveShownVehicles(@QueryParam("entity") String entity) {
        return Response.ok(chilloutQueryService.retrieveShownEntities(entity)).build();
    }

    @GET
    @Path("/retrieveEntitybyID")
    @Produces("application/json")
    public Response retrieveEntitybyID(@QueryParam("entity") String entity, @QueryParam("entityID") String entityID) {
        try {
            return Response.ok(chilloutQueryService.retrieveEntitybyID(entity, entityID)).build();
        } catch (Exception e) {
            return Response.ok(entity + " not found").build();
        }
    }

    @GET
    @Path("/retrieveEntitiesbyYearandMonth")
    @Produces("application/json")
    public Response retrieveEntitiesbyYearandMonth(@QueryParam("entity") String entity, @QueryParam("year") int year, @QueryParam("month") int month) {
        try {
            return Response.ok(chilloutQueryService.retrieveEntitiesbyYearandMonth(entity, year, month)).build();
        } catch (Exception e) {
            return Response.ok(entity + "s not found").build();
        }
    }

    @GET
    @Path("/retrieveEntitiesbyDate")
    @Produces("application/json")
    public Response retrieveEntitiesbyDate(@QueryParam("entity") String entity, @QueryParam("year") int year, @QueryParam("month") int month, @QueryParam("day") int day) {
        try {
            return Response.ok(chilloutQueryService.retrieveEntitiesbyDate(entity, year, month, day)).build();
        } catch (Exception e) {
            return Response.ok(entity + "s not found").build();
        }
    }
    //endregion

    /****************************************************POST***********************************************************/

    //region POST
    @POST
    @Path("/updateAgent")
    @Consumes("application/json")
    public Response updateAgent(Agent agent) {
        try {
            chilloutStoreService.updateEntity(agent);
            return Response.ok(new BaseResponse(false, "Agent updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Agent failed to update")).build();
        }
    }

    @POST
    @Path("/updateDistance")
    @Consumes("application/json")
    public Response updateDistance(Distance distance) {
        try {
            chilloutStoreService.updateEntity(distance);
            return Response.ok(new BaseResponse(false, "Distance updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Distance failed to update")).build();
        }
    }

    @POST
    @Path("/updateDriver")
    @Consumes("application/json")
    public Response updateDriver(Driver driver) {
        try {
            chilloutStoreService.updateEntity(driver);
            return Response.ok(new BaseResponse(false, "Driver updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Driver failed to update")).build();
        }
    }

    @POST
    @Path("/updateExisting")
    @Consumes("application/json")
    public Response updateExisting(Existing existing) {
        try {
            chilloutStoreService.updateEntity(existing);
            return Response.ok(new BaseResponse(false, "Existing updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Existing failed to update")).build();
        }
    }

    @POST
    @Path("/updateProduct")
    @Consumes("application/json")
    public Response updateProduct(Product product) {
        try {
            chilloutStoreService.updateEntity(product);
            return Response.ok(new BaseResponse(false, "Product updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Product failed to update")).build();
        }
    }

    @POST
    @Path("/updateQuota")
    @Consumes("application/json")
    public Response updateQuota(Quota quota) {
        try {
            chilloutStoreService.updateEntity(quota);
            return Response.ok(new BaseResponse(false, "Quota updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Quota failed to update")).build();
        }
    }

    @POST
    @Path("/updateSale")
    @Consumes("application/json")
    public Response updateSale(Sale sale) {
        try {
            chilloutStoreService.updateEntity(sale);
            return Response.ok(new BaseResponse(false, "Sale updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Sale failed to update")).build();
        }
    }

    @POST
    @Path("/updateSector")
    @Consumes("application/json")
    public Response updateSector(Sector sector) {
        try {
            chilloutStoreService.updateEntity(sector);
            return Response.ok(new BaseResponse(false, "Sector updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Sector failed to update")).build();
        }
    }

    @POST
    @Path("/updateStation")
    @Consumes("application/json")
    public Response updateStation(Station station) {
        try {
            chilloutStoreService.updateEntity(station);
            return Response.ok(new BaseResponse(false, "Station updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Station failed to update")).build();
        }
    }

    @POST
    @Path("/updateTank")
    @Consumes("application/json")
    public Response updateTank(Tank tank) {
        try {
            chilloutStoreService.updateEntity(tank);
            return Response.ok(new BaseResponse(false, "Tank updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Tank failed to update")).build();
        }
    }

    @POST
    @Path("/updateTransfer")
    @Consumes("application/json")
    public Response updateTransfer(Transfer transfer) {
        try {
            chilloutStoreService.updateEntity(transfer);
            return Response.ok(new BaseResponse(false, "Transfer updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Transfer failed to update")).build();
        }
    }

    @POST
    @Path("/updateTrip")
    @Consumes("application/json")
    public Response updateTrip(Trip trip) {
        try {
            chilloutStoreService.updateEntity(trip);
            return Response.ok(new BaseResponse(false, "Trip updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Trip failed to update")).build();
        }
    }

    @POST
    @Path("/updateUser")
    @Consumes("application/json")
    public Response updateUser(User user) {
        try {
            chilloutStoreService.updateEntity(user);
            return Response.ok(new BaseResponse(false, "User updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "User failed to update")).build();
        }
    }

    @POST
    @Path("/updateVehicle")
    @Consumes("application/json")
    public Response updateVehicle(Vehicle vehicle) {
        try {
            chilloutStoreService.updateEntity(vehicle);
            return Response.ok(new BaseResponse(false, "Vehicle updated successfully")).build();
        } catch (Exception e) {
            return Response.ok(new BaseResponse(true, "Vehicle failed to update")).build();
        }
    }

    @POST
    @Path("/updateWarehouse")
    @Consumes("application/json")
    public Response updateWarehouse(Warehouse warehouse) {
        try {
            chilloutStoreService.updateEntity(warehouse);
            return Response.ok(new BaseResponse(false, "Warehouse updated successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, "Warehouse failed to update")).build();
        }
    }

    @POST
    @Path("/checkUser")
    @Consumes("application/json")
    public Response checkUser(String body) {
        Gson gson = new Gson();
        JsonObject parsedBody = gson.fromJson(body, JsonObject.class);
        String phoneNumber = parsedBody.get("phoneNumber").getAsString();
        String password = parsedBody.get("password").getAsString();
        try {
            return Response.ok(chilloutStoreService.checkUser(phoneNumber, password)).build();
        } catch (Exception e) {
            return Response.ok(new BaseResponse(true, "User not found")).build();
        }
    }
    //endregion

    /***************************************************DELETE**********************************************************/

    //region DELETE
    @DELETE
    @Path("deleteEntity")
    @Produces("application/json")
    public Response deleteEntity(@QueryParam("entity") String entity, @QueryParam("id") String id) {
        try {
            chilloutStoreService.deleteEntity(entity, id);
            return Response.ok(new BaseResponse(false, entity + " deleted successfully")).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.ok(new BaseResponse(true, entity + " failed to delete")).build();
        }
    }
    //endregion
}
