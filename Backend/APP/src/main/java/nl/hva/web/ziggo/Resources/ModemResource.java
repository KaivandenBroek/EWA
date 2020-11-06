package nl.hva.web.ziggo.Resources;

import models.ClientError;
import models.ModemEntity;
import service.ModemService;
import service.UserService;
import service.impl.ModemServiceImpl;
import service.impl.UserServiceImpl;

import javax.persistence.RollbackException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.Response.Status.CONFLICT;
import static javax.ws.rs.core.Response.Status.OK;

@Path("modem")
public class ModemResource {
    //values to be used in method to create user
    private ModemEntity modemEntity = new ModemEntity();
    //initialize UserService as service
    private UserService userService;
    //initialize Modem Service as service
    private ModemService modemService;

    /**
     * give correct instance to service
     */
    public ModemResource() {
        userService = UserServiceImpl.getInstance();
        modemService = ModemServiceImpl.getInstance();
    }

    /**
     * method to get all modems
     *
     * @return all modems
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ModemEntity> getEmployeeScore() {
        return modemService.getAllModems();
    }

    /**
     * add modem to user
     *
     * @param username received from post call
     * @param modemId  received from post call
     * @return register a modem
     */
    @POST
    @Path("/addModemToUser")
    public Response addModemToUser(@FormParam("username") String username,
                                   @FormParam("modemId") int modemId) {
        // set modem ID and get the modemEntity
        modemEntity.setIdModem(modemId);
        // register a modem and return response from method
        return registerModem(username, modemEntity);
    }

    /**
     * method to get modem for user
     *
     * @param username received from post call
     * @return Modem name for specific user
     */
    @GET
    @Path("/getModemForUser/{username}")
    public Response getModemForUser(@PathParam("username") String username) {
        // create modemName object by getting the specific ModemEntity for the requested username
        ModemEntity modemName = modemService.getModemFromUser(username);
        // if modemname is null return not found else return ok + modemname
        if (modemName == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for modemName " + username)).build();
        } else {
            return Response.status(OK).entity(modemName).build();
        }
    }

    /**
     * method to check if user is in database
     *
     * @param username received from method
     * @return boolean
     */
    private boolean checkIfUserInDatabase(String username) {
        //if method to check if username is already inside the database if username is found return false
        if (userService.getUserByUsername(username) != null) {
            return true;
        }
        return false;
    }

    /**
     * method to register a modem
     *
     * @param username    received from method
     * @param modemEntity received from method
     * @return response ok or Response Conflict
     */
    private Response registerModem(String username, ModemEntity modemEntity) {
        // if user is in database continue method and finally return OK else return conflict
        if (checkIfUserInDatabase(username)) {
            // try to add modem to user catch rollbackException
            try {
                modemService.addModemToUser(username, modemEntity);

            } catch (RollbackException e) {
                e.getMessage();
            }
        } else {
            return Response.status(CONFLICT).build();
        }
        return Response.ok(OK).build();
    }


}
