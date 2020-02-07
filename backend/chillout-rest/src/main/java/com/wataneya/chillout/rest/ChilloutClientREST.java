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
            } else if (type.equals("Company")) {
                Company company = new Company(gson.fromJson(parsedBody.get("entity"), Company.class));
                status = chilloutStoreService.createEntity(company);
            } else if (type.equals("Distance")) {
                Distance distance = new Distance(gson.fromJson(parsedBody.get("entity"), Distance.class));
                status = chilloutStoreService.createEntity(distance);
            } else if (type.equals("Driver")) {
                Driver driver = gson.fromJson(parsedBody.get("entity"), Driver.class);
                status = chilloutStoreService.createEntity(driver);
            } else if (type.equals("Existing")) {
                Existing existing = new Existing(gson.fromJson(parsedBody.get("entity"), Existing.class));
                status = chilloutStoreService.createEntity(existing);
            } else if (type.equals("Product")) {
                Product product = new Product(gson.fromJson(parsedBody.get("entity"), Product.class));
                status = chilloutStoreService.createEntity(product);
            } else if (type.equals("Quota")) {
                Quota quota = new Quota(gson.fromJson(parsedBody.get("entity"), Quota.class));
                status = chilloutStoreService.createEntity(quota);
            } else if (type.equals("Sale")) {
                Sale sale = new Sale(gson.fromJson(parsedBody.get("entity"), Sale.class));
                status = chilloutStoreService.createEntity(sale);
            } else if (type.equals("Sector")) {
                Sector sector = new Sector(gson.fromJson(parsedBody.get("entity"), Sector.class));
                status = chilloutStoreService.createEntity(sector);
            } else if (type.equals("Station")) {
                Station station = new Station(gson.fromJson(parsedBody.get("entity"), Station.class));
                status = chilloutStoreService.createEntity(station);
            } else if (type.equals("Tank")) {
                Tank tank = new Tank(gson.fromJson(parsedBody.get("entity"), Tank.class));
                status = chilloutStoreService.createEntity(tank);
            } else if (type.equals("Transfer")) {
                Transfer transfer = new Transfer(gson.fromJson(parsedBody.get("entity"), Transfer.class));
                status = chilloutStoreService.createEntity(transfer);
            } else if (type.equals("Trip")) {
                Trip trip = new Trip(gson.fromJson(parsedBody.get("entity"), Trip.class));
                status = chilloutStoreService.createEntity(trip);
            } else if (type.equals("User")) {
                User user = gson.fromJson(parsedBody.get("entity"), User.class);
                status = chilloutStoreService.createEntity(user);
            } else if (type.equals("Vehicle")) {
                Vehicle vehicle = gson.fromJson(parsedBody.get("entity"), Vehicle.class);
                status = chilloutStoreService.createEntity(vehicle);
            } else if (type.equals("Warehouse")) {
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
    @Path("/updateAgent")
    @Consumes("application/json")
    public Response updateAgent(Agent agent) {
        try {
            chilloutStoreService.updateEntity(agent);
            return Response.ok(new BaseResponse(false, "Agent updated successfully")).build();
        } catch (Exception e) {
            return Response.ok(new BaseResponse(true, "Agent failed to update")).build();
        }
    }

    @POST
    @Path("/updateCompany")
    @Consumes("application/json")
    public Response updateCompany(Company company) {
        try {
            chilloutStoreService.updateEntity(company);
            return Response.ok(new BaseResponse(false, "Company updated successfully")).build();
        } catch (Exception e) {
            return Response.ok(new BaseResponse(true, "Company failed to update")).build();
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
            return Response.ok(new BaseResponse(true, "Warehouse failed to update")).build();
        }
    }
    //endregion
}
//Keep doing like  update sector ... gson can't parse the relations, but jackson core can deserialize like it serialized the relations :S (Not the generic way)
