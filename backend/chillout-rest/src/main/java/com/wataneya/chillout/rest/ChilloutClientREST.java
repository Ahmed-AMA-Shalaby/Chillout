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
    @Path("/createUser")
    @Consumes("application/json")
    public Response createUser(User user){
        try {
            return chilloutStoreService.createUser(user) ?
                    Response.ok(new BaseResponse(false, "User created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Phone already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Phone already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createProduct")
    @Consumes("application/json")
    public Response createProduct(Product product){
        try {
            return chilloutStoreService.createProduct(product) ?
                    Response.ok(new BaseResponse(false, "Product created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Product already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Product already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createSector")
    @Consumes("application/json")
    public Response createSector(Sector sector){
        try {
            return chilloutStoreService.createSector(sector) ?
                    Response.ok(new BaseResponse(false, "Sector created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Sector already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Sector already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createTank")
    @Consumes("application/json")
    public Response createTank(Tank tank){
        try {
            return chilloutStoreService.createTank(tank) ?
                    Response.ok(new BaseResponse(false, "Tank created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Tank already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Tank already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createCompany")
    @Consumes("application/json")
    public Response createCompany(Company company){
        try {
            return chilloutStoreService.createCompany(company) ?
                    Response.ok(new BaseResponse(false, "Company created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Company already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Company already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createAgent")
    @Consumes("application/json")
    public Response createAgent(Agent agent){
        try {
            return chilloutStoreService.createAgent(agent) ?
                    Response.ok(new BaseResponse(false, "Agent created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Agent already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Agent already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createDriver")
    @Consumes("application/json")
    public Response createDriver(Driver driver){
        try {
            return chilloutStoreService.createDriver(driver) ?
                    Response.ok(new BaseResponse(false, "Driver created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Driver already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Driver already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createStation")
    @Consumes("application/json")
    public Response createStation(Station station){
        try {
            return chilloutStoreService.createStation(station) ?
                    Response.ok(new BaseResponse(false, "Station created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Station already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Station already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createWarehouse")
    @Consumes("application/json")
    public Response createWarehouse(String body){
        Gson gson = new Gson();
        JsonObject parsedBody = gson.fromJson(body, JsonObject.class);
        Warehouse warehouse = gson.fromJson(parsedBody.get("warehouseData"), Warehouse.class);
        String companyName = parsedBody.get("companyName").getAsString();
        try {
            return chilloutStoreService.createWarehouse(warehouse, companyName) ?
                    Response.ok(new BaseResponse(false, "Warehouse created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Warehouse already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Warehouse already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createDistance")
    @Consumes("application/json")
    public Response createDistance(Distance distance){
        try {
            return chilloutStoreService.createDistance(distance) ?
                    Response.ok(new BaseResponse(false, "Distance created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Distance already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Distance already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createImportation")
    @Consumes("application/json")
    public Response createImportation(Importation importation){
        try {
            return chilloutStoreService.createImportation(importation) ?
                    Response.ok(new BaseResponse(false, "Importation created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Importation already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Importation already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createExisting")
    @Consumes("application/json")
    public Response createExisting(Existing existing){
        try {
            return chilloutStoreService.createExisting(existing) ?
                    Response.ok(new BaseResponse(false, "Existing created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Existing already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Existing already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createWithdrawal")
    @Consumes("application/json")
    public Response createWithdrawal(Withdrawal withdrawal){
        try {
            return chilloutStoreService.createWithdrawal(withdrawal) ?
                    Response.ok(new BaseResponse(false, "Withdrawal created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Withdrawal already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Withdrawal already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }

    @POST
    @Path("/createSale")
    @Consumes("application/json")
    public Response createSale(Sale sale){
        try {
            return chilloutStoreService.createSale(sale) ?
                    Response.ok(new BaseResponse(false, "Sale created successfully")).build() :
                    Response.ok(new BaseResponse(true, "Sale already exists")).build();
        } catch (Exception e) {
            if (e.getCause().getMessage().equals("ARJUNA016053: Could not commit transaction.")) {
                return Response.ok(new BaseResponse(true, "Sale already exists")).build();
            }
            return Response.ok(new BaseResponse(true, "Error")).build();
        }
    }
    //endregion

    /*****************************************************GET***********************************************************/

    //region GET
    @GET
    @Path("/retrieveUsers")
    @Produces("application/json")
    public Response retrieveUsers() {
        return Response.ok(chilloutQueryService.retrieveUsers()).build();
    }

    @GET
    @Path("/retrieveProducts")
    @Produces("application/json")
    public Response retrieveProducts() {
        return Response.ok(chilloutQueryService.retrieveProducts()).build();
    }

    @GET
    @Path("/retrieveSectors")
    @Produces("application/json")
    public Response retrieveSectors() {
        return Response.ok(chilloutQueryService.retrieveSectors()).build();
    }

    @GET
    @Path("/retrieveTanks")
    @Produces("application/json")
    public Response retrieveTanks() {
        return Response.ok(chilloutQueryService.retrieveTanks()).build();
    }

    @GET
    @Path("/retrieveCompanies")
    @Produces("application/json")
    public Response retrieveCompanies() {
        return Response.ok(chilloutQueryService.retrieveCompanies()).build();
    }

    @GET
    @Path("/retrieveAgents")
    @Produces("application/json")
    public Response retrieveAgents() {
        return Response.ok(chilloutQueryService.retrieveAgents()).build();
    }

    @GET
    @Path("/retrieveDrivers")
    @Produces("application/json")
    public Response retrieveDrivers() {
        return Response.ok(chilloutQueryService.retrieveDrivers()).build();
    }

    @GET
    @Path("/retrieveStations")
    @Produces("application/json")
    public Response retrieveStations() {
        return Response.ok(chilloutQueryService.retrieveStations()).build();
    }

    @GET
    @Path("/retrieveWarehouses")
    @Produces("application/json")
    public Response retrieveWarehouses() {
        return Response.ok(chilloutQueryService.retrieveWarehouses()).build();
    }

    @GET
    @Path("/retrieveDistances")
    @Produces("application/json")
    public Response retrieveDistances() {
        return Response.ok(chilloutQueryService.retrieveDistances()).build();
    }

    @GET
    @Path("/retrieveImportations")
    @Produces("application/json")
    public Response retrieveImportations() {
        return Response.ok(chilloutQueryService.retrieveImportations()).build();
    }

    @GET
    @Path("/retrieveExistings")
    @Produces("application/json")
    public Response retrieveExistings() {
        return Response.ok(chilloutQueryService.retrieveExistings()).build();
    }

    @GET
    @Path("/retrieveWithdrawals")
    @Produces("application/json")
    public Response retrieveWithdrawals() {
        return Response.ok(chilloutQueryService.retrieveWithdrawals()).build();
    }

    @GET
    @Path("/retrieveSales")
    @Produces("application/json")
    public Response retrieveSales() {
        return Response.ok(chilloutQueryService.retrieveSales()).build();
    }
    //endregion

    /*****************************************************PUT***********************************************************/

    //region PUT
    @PUT
    @Path("/updateUser")
    @Consumes("application/json")
    public Response updateUser(User user) {
        return chilloutStoreService.updateUser(user) ? Response.ok(true).build() : Response.ok(false).build();
    }
    //endregion
}
