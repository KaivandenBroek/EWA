package nl.hva.web.ziggo.Resources;

import models.ClientError;
import models.UserEntity;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.NoSuchElementException;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.OK;


@Path("users")
public class UserResource extends HttpServlet {
    private UserService userService;

    /**
     * get instance of UserServiceImpl
     */
    public UserResource() {
        userService = UserServiceImpl.getInstance();
    }

    /**
     * method to receive a list of all users.
     *
     * @return List of all users
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * method to receive all employees
     *
     * @return a list of all employees
     */
    @GET
    @Path("/getallemployees")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllEmployees() {
        return userService.getAllEmployees();
    }

    /**
     * method to receive a list of of all clients
     *
     * @return a list of all clients
     */
    @GET
    @Path("/clients")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllClients() {
        return userService.getAllClients(3);
    }

    /**
     * method to receive all the active users
     *
     * @return a list of all active users
     */
    @GET
    @Path("/allActiveUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllActiveUsers() {
        return userService.getAllActiveUsers();
    }

    /**
     * method to receive all active clients
     *
     * @return a list of all active clients
     */
    @GET
    @Path("/allActiveClients")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllActiveClients() {
        return userService.getAllActiveClients();
    }

    /**
     * method to receive all active employees
     *
     * @return a list of all active employees
     */
    @GET
    @Path("/allActiveEmployees")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getAllActiveEmployees() {
        return userService.getAllActiveEmployees();
    }

    /**
     * method to receive a user by specified id
     *
     * @param id to receive user objecct from
     * @return list user by the given id
     */
    @GET
    @Path("/getUserById/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("userID") int id) {
        List<UserEntity> user = userService.getUserById(id);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id " + id)).build();
        } else {
            return Response.status(Response.Status.OK).entity(user).build();
        }
    }

    /**
     * method to receive user for editing
     *
     * @param userID to get the user we want to edit
     * @return user
     */
    @GET
    @Path("/getUserForAdjustment/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserForAdjustment(@PathParam("userID") int userID) {
        List<UserEntity> user = userService.getUserForAdjustment(userID);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("resource not found for id" + userID)).build();
        } else {
            return Response.status(Response.Status.OK).entity(user.iterator().next()).build();
        }
    }

    /**
     * method to get a user by username
     *
     * @param username to get user object from
     * @return user object from the given username
     */
    @GET
    @Path("/getUserByUsername/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByUsername(@PathParam("username") String username) {
        UserEntity user = userService.getUserByUsername(username);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id" + username)).build();
        } else {
            return Response.status(Response.Status.OK).entity(user).build();
        }
    }

    /**
     * method to edit a existing user
     *
     * @param userId    user object id
     * @param username  user object username
     * @param firstName user object firstname
     * @param lastName  user object lastname
     * @param email     user object email
     * @return post new values into user object
     */
    @POST
    @Path("/editClient")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response editClient(@FormParam("userId") int userId,
                               @FormParam("username") String username,
                               @FormParam("firstName") String firstName,
                               @FormParam("lastName") String lastName,
                               @FormParam("email") String email) {

        Boolean clientEdit = userService.editClient(userId, username, firstName, lastName, email);

        if (!clientEdit) {
            return Response.status(Response.Status.CONFLICT).entity(new ClientError("something went wrong")).build();

        } else {
            return Response.ok(OK).build();
        }
    }

    /**
     * method to delete e user from the database
     *
     * @param id to get the user object we are looking for
     * @return delete the user
     */
    @DELETE
    @Path("/{userID}")
    public void deleteUserFromDatabase(@PathParam("userID") int id) {
        try {
            userService.deleteUserFromDatabase(id);
        } catch (NoSuchElementException e) {
            e.getMessage();
        }
    }

}
