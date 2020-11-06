package nl.hva.web.ziggo.Resources;

import models.RoleEntity;
import models.UserEntity;
import nl.hva.web.ziggo.hash.PasswordUtils;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.CONFLICT;
import static javax.ws.rs.core.Response.Status.OK;

@Path("register")
public class RegisterResource {
    //values to be used in method to create user
    private RoleEntity role = new RoleEntity();
    //initialize UserService as service
    private UserService service;

    /**
     * constructor
     */
    public RegisterResource() {
        service = UserServiceImpl.getInstance();
    }

    /**
     * method to create client
     *
     * @param username
     * @param password
     * @param firstName
     * @param lastName
     * @param uri
     * @return
     */
    @POST
    @Path("/client")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response createUser(@FormParam("username") String username,
                               @FormParam("password") String password,
                               @FormParam("firstname") String firstName,
                               @FormParam("lastname") String lastName,
                               @FormParam("email") String email,
                               @Context UriInfo uri) {
        //role id
        final int CLIENT_ROLE_ID = 3;
        role.setRoleId(CLIENT_ROLE_ID);

        // after values are received pass values to register method
        return register(username, role, password, firstName, lastName, email);

    }

    /**
     * method to create employee
     *
     * @param username
     * @param password
     * @param firstName
     * @param lastName
     * @param uri
     * @return
     */
    @POST
    @Path("/employee")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response createEmployee(@FormParam("username") String username,
                                   @FormParam("password") String password,
                                   @FormParam("firstname") String firstName,
                                   @FormParam("lastname") String lastName,
                                   @FormParam("email") String email,
                                   @Context UriInfo uri) {
        // role id
        final int EMPLOYEE_ROLE_ID = 2;
        role.setRoleId(EMPLOYEE_ROLE_ID);

        // after values are received pass values to register method
        return register(username, role, password, firstName, lastName, email);


    }

    /**
     * pass all user values to the user object and return object user
     *
     * @param username
     * @param roleId
     * @param password
     * @param firstName
     * @param lastName
     * @return
     */
    private UserEntity usersEntity(String username, RoleEntity roleId, String password, String firstName, String lastName, String email) {
        //Hash the password
        String salt = PasswordUtils.getSalt(30);
        //Generate secured password
        String mySecurePassword = PasswordUtils.generateSecurePassword(password, salt);
        //Call the UserEntity object
        UserEntity user = new UserEntity();
        //set username
        user.setUsername(username);
        //set email
        user.setEmail(email);
        //set email
        user.setSalt(salt);
        //set roleId
        user.setRoleByRoleId(roleId);
        //set Password
        user.setHash(mySecurePassword);
        //set FirstName
        user.setFirstName(firstName);
        //set LastName
        user.setLastName(lastName);

        return user;
    }

    /**
     * check if username is already in database
     *
     * @param username
     * @return
     */
    private boolean checkIfUserInDatabase(String username) {
        //if method to check if username is already inside the database if username is found return false
        if (service.getUserByUsername(username) == null) {
            return true;
        }

        return false;
    }

    /**
     * method that handles the Response if a user is added to the database Response is OK if not Response is Conflict
     *
     * @param username
     * @param roleId
     * @param password
     * @param firstName
     * @param lastName
     * @return
     */
    private Response register(String username, RoleEntity roleId, String password, String firstName, String lastName, String email) {
        //passes username to method to check if the user is already inside the database
        if (checkIfUserInDatabase(username)) {
            //try to add user inside the database
            try {
                service.addUserToDatabase(usersEntity(username, roleId, password, firstName, lastName, email));
                //catch illegalStateException
            } catch (IllegalStateException e) {
                e.getMessage();
            }
            //if user is already defined inside the database response is conflict
        } else {
            return Response.status(CONFLICT).build();
        }
        //if all is good return Response Ok
        return Response.ok(OK).build();
    }
}
