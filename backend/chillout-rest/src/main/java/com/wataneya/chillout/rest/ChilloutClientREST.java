package com.wataneya.chillout.rest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wataneya.chillout.ejb.*;
import com.wataneya.chillout.entity.*;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("/chilloutrest")
@RequestScoped
public class ChilloutClientREST {
    @EJB
    private ChilloutStoreService chilloutStoreService;

    @EJB
    private ChilloutQueryService chilloutQueryService;

    /****************************************************POST***********************************************************/

    //region POST
    @POST
    @Path("/createEntity")
    @Consumes("application/json")
    public Response createEntity(String body) {
        boolean status = false;
        Gson gson = new Gson();
        JsonObject parsedBody = gson.fromJson(body, JsonObject.class);
        String type = parsedBody.get("type").getAsString();
        try {
            if (type.equals("Agent")) {
                Agent agent = new Agent(gson.fromJson(parsedBody.get("entity"), Agent.class));
                status = chilloutStoreService.createEntity(agent);
            }
            else if (type.equals("Company")) {
                Company company = new Company(gson.fromJson(parsedBody.get("entity"), Company.class));
                status = chilloutStoreService.createEntity(company);
            }
            else if (type.equals("Distance")) {
                Distance distance = new Distance(gson.fromJson(parsedBody.get("entity"), Distance.class));
                status = chilloutStoreService.createEntity(distance);
            }
            else if (type.equals("Driver")) {
                Driver driver = gson.fromJson(parsedBody.get("entity"), Driver.class);
                status = chilloutStoreService.createEntity(driver);
            }
            else if (type.equals("Existing")) {
                Existing existing = new Existing(gson.fromJson(parsedBody.get("entity"), Existing.class));
                status = chilloutStoreService.createEntity(existing);
            }
            else if (type.equals("Product")) {
                Product product = new Product(gson.fromJson(parsedBody.get("entity"), Product.class));
                status = chilloutStoreService.createEntity(product);
            }
            else if (type.equals("Quota")) {
                Quota quota = new Quota(gson.fromJson(parsedBody.get("entity"), Quota.class));
                status = chilloutStoreService.createEntity(quota);
            }
            else if (type.equals("Sale")) {
                Sale sale = new Sale(gson.fromJson(parsedBody.get("entity"), Sale.class));
                status = chilloutStoreService.createEntity(sale);
            }
            else if (type.equals("Sector")) {
                Sector sector = new Sector(gson.fromJson(parsedBody.get("entity"), Sector.class));
                status = chilloutStoreService.createEntity(sector);
            }
            else if (type.equals("Station")) {
                Station station = new Station(gson.fromJson(parsedBody.get("entity"), Station.class));
                status = chilloutStoreService.createEntity(station);
            }
            else if (type.equals("Tank")) {
                Tank tank = new Tank(gson.fromJson(parsedBody.get("entity"), Tank.class));
                status = chilloutStoreService.createEntity(tank);
            }
            else if (type.equals("Transfer")) {
                Transfer transfer = new Transfer(gson.fromJson(parsedBody.get("entity"), Transfer.class));
                status = chilloutStoreService.createEntity(transfer);
            }
            else if (type.equals("Trip")) {
                Trip trip = new Trip(gson.fromJson(parsedBody.get("entity"), Trip.class));
                status = chilloutStoreService.createEntity(trip);
            }
            else if (type.equals("User")) {
                User user = gson.fromJson(parsedBody.get("entity"), User.class);
                status = chilloutStoreService.createEntity(user);
            }
            else if (type.equals("Vehicle")) {
                Vehicle vehicle = gson.fromJson(parsedBody.get("entity"), Vehicle.class);
                status = chilloutStoreService.createEntity(vehicle);
            }
            else if (type.equals("Warehouse")) {
                Warehouse warehouse = new Warehouse(gson.fromJson(parsedBody.get("entity"), Warehouse.class));
                status = chilloutStoreService.createEntity(warehouse);
            }
            return status ?
                    Response.ok(new BaseResponse(false, type + " was created successfully")).build() :
                    Response.ok(new BaseResponse(true, type + " failed to be created")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, type + " failed to be created")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }
    //endregion

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
    //endregion

    /*****************************************************PUT***********************************************************/

    //region PUT
    @POST
    @Path("/updateEntity")
    @Consumes("application/json")
    public Response updateEntity(String body) {
        boolean status = false;
        Gson gson = new Gson();
        JsonObject parsedBody = gson.fromJson(body, JsonObject.class);
        String type = parsedBody.get("type").getAsString();
        try {
            if (type.equals("Agent")) {
                Agent agent = new Agent(gson.fromJson(parsedBody.get("entity"), Agent.class));
                status = chilloutStoreService.updateEntity(agent);
            }
            else if (type.equals("Company")) {
                Company company = new Company(gson.fromJson(parsedBody.get("entity"), Company.class));
                status = chilloutStoreService.updateEntity(company);
            }
            else if (type.equals("Distance")) {
                Distance distance = new Distance(gson.fromJson(parsedBody.get("entity"), Distance.class));
                status = chilloutStoreService.updateEntity(distance);
            }
            else if (type.equals("Driver")) {
                Driver driver = gson.fromJson(parsedBody.get("entity"), Driver.class);
                status = chilloutStoreService.updateEntity(driver);
            }
            else if (type.equals("Existing")) {
                Existing existing = new Existing(gson.fromJson(parsedBody.get("entity"), Existing.class));
                status = chilloutStoreService.updateEntity(existing);
            }
            else if (type.equals("Product")) {
                Product product = new Product(gson.fromJson(parsedBody.get("entity"), Product.class));
                status = chilloutStoreService.updateEntity(product);
            }
            else if (type.equals("Quota")) {
                Quota quota = new Quota(gson.fromJson(parsedBody.get("entity"), Quota.class));
                status = chilloutStoreService.updateEntity(quota);
            }
            else if (type.equals("Sale")) {
                Sale sale = new Sale(gson.fromJson(parsedBody.get("entity"), Sale.class));
                status = chilloutStoreService.updateEntity(sale);
            }
            else if (type.equals("Sector")) {
                Sector sector = new Sector(gson.fromJson(parsedBody.get("entity"), Sector.class));
                status = chilloutStoreService.updateEntity(sector);
            }
            else if (type.equals("Station")) {
                Station station = new Station(gson.fromJson(parsedBody.get("entity"), Station.class));
                status = chilloutStoreService.updateEntity(station);
            }
            else if (type.equals("Tank")) {
                Tank tank = new Tank(gson.fromJson(parsedBody.get("entity"), Tank.class));
                status = chilloutStoreService.updateEntity(tank);
            }
            else if (type.equals("Transfer")) {
                Transfer transfer = new Transfer(gson.fromJson(parsedBody.get("entity"), Transfer.class));
                status = chilloutStoreService.updateEntity(transfer);
            }
            else if (type.equals("Trip")) {
                Trip trip = new Trip(gson.fromJson(parsedBody.get("entity"), Trip.class));
                status = chilloutStoreService.updateEntity(trip);
            }
            else if (type.equals("User")) {
                User user = gson.fromJson(parsedBody.get("entity"), User.class);
                status = chilloutStoreService.updateEntity(user);
            }
            else if (type.equals("Vehicle")) {
                Vehicle vehicle = gson.fromJson(parsedBody.get("entity"), Vehicle.class);
                status = chilloutStoreService.updateEntity(vehicle);
            }
            else if (type.equals("Warehouse")) {
                Warehouse warehouse = new Warehouse(gson.fromJson(parsedBody.get("entity"), Warehouse.class));
                status = chilloutStoreService.updateEntity(warehouse);
            }
            return status ?
                    Response.ok(new BaseResponse(false, type + " updated successfully")).build() :
                    Response.ok(new BaseResponse(true, type + " failed to update")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, type + " failed to update")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }
    //endregion
}
